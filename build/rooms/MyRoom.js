"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
const core_1 = require("@colyseus/core");
const MyRoomState_1 = require("./schema/MyRoomState");
const TrashCans_1 = require("../Trash/TrashCans");
const globalConstants_1 = require("../globalConstants");
class MyRoom extends core_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 4;
    }
    onCreate(options) {
        this.setState(new MyRoomState_1.MyRoomState());
        const locations = [];
        for (let i = 4; i > 0; i--) {
            const x = globalConstants_1.WIDTH / 2;
            const y = i * 100;
            locations.push({ x, y });
        }
        locations.sort(() => Math.random() - 0.5);
        this.state.trashCans.set("0", new TrashCans_1.PaperCan(locations[0].x, locations[0].y));
        this.state.trashCans.set("1", new TrashCans_1.PlasticCan(locations[1].x, locations[1].y));
        this.state.trashCans.set("2", new TrashCans_1.GlassCan(locations[2].x, locations[2].y));
        this.state.trashCans.set("3", new TrashCans_1.NonRecyclable(locations[3].x, locations[3].y));
        this.onMessage(0, (client, input) => {
            const player = this.state.players.get(client.sessionId);
            const velocity = 2;
            player.inputQueue.push(input);
            if (input.left) {
                player.x -= velocity;
            }
            else if (input.right) {
                player.x += velocity;
            }
            if (input.up) {
                player.y -= velocity;
            }
            else if (input.down) {
                player.y += velocity;
            }
        });
        // this.setSimulationInterval((deltaTime) => {
        //   this.update(deltaTime);
        // });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        const mapWidth = globalConstants_1.WIDTH;
        const mapHeight = globalConstants_1.HEIGHT;
        const player = new MyRoomState_1.Player();
        player.x = 200;
        player.y = 150;
        this.state.players.set(client.sessionId, player);
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
        this.state.players.delete(client.sessionId);
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.MyRoom = MyRoom;
