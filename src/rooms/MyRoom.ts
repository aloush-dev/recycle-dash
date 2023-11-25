import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";
import {
  GlassCan,
  NonRecyclable,
  PaperCan,
  PlasticCan,
  TrashCan,
} from "../Trash/TrashCans";
import {
  HEIGHT,
  INITIAL_TRASH,
  TRASH_LOADING_WIDTH,
  WIDTH,
} from "../globalConstants";
import TrashGenerator from "../Trash/TrashGenorator";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;
  update: any; // NOT GOOD PLS FIX

  onCreate(options: any) {
    this.setState(new MyRoomState());
    this.setUpCans();
    this.setUpTrash();
    this.onMessage(0, (client, input) => {
      const player = this.state.players.get(client.sessionId);
      const velocity = 2;
      player.inputQueue.push(input);
      if (input.left) {
        player.x -= velocity;
      } else if (input.right) {
        player.x += velocity;
      }
      if (input.up) {
        player.y -= velocity;
      } else if (input.down) {
        player.y += velocity;
      }
    });
    // this.setSimulationInterval((deltaTime) => {
    //   this.update(deltaTime);
    // });
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    const mapWidth = WIDTH;
    const mapHeight = HEIGHT;

    const player = new Player();
    player.x = 200;
    player.y = 150;
    this.state.players.set(client.sessionId, player);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
  private setUpCans() {
    const locations: { x: number; y: number }[] = [];
    for (let i = 4; i > 0; i--) {
      const x = WIDTH / 2;
      const y = i * 100;
      locations.push({ x, y });
    }
    locations.sort(() => Math.random() - 0.5);
    this.state.trashCans.set("0", new PaperCan(locations[0].x, locations[0].y));
    this.state.trashCans.set(
      "1",
      new PlasticCan(locations[1].x, locations[1].y)
    );
    this.state.trashCans.set("2", new GlassCan(locations[2].x, locations[2].y));
    this.state.trashCans.set(
      "3",
      new NonRecyclable(locations[3].x, locations[3].y)
    );
  }
  private setUpTrash() {
    for (let i = 0; i < INITIAL_TRASH; i++) {
      const trash = TrashGenerator.random();
      this.state.trash.push(trash);
    }
  }
}
