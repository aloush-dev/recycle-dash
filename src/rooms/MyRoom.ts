import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;
  update: any; // NOT GOOD PLS FIX
  LOBBY_CHANNEL = "$mylobby";

  generateRoomIdSingle(): string {
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
    }
    return result;
  }

  async generateRoomId(): Promise<string> {
    const currentIds = await this.presence.smembers(this.LOBBY_CHANNEL);
    let id;
    do {
      id = this.generateRoomIdSingle();
    } while (currentIds.includes(id));

    await this.presence.sadd(this.LOBBY_CHANNEL, id);
    return id;
  }

  async onCreate(options: any) {
    this.roomId = await this.generateRoomId();
    this.setState(new MyRoomState());

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
    const mapWidth = 800;
    const mapHeight = 600;

    const player = new Player();
    player.x = 200;
    player.y = 150;
    this.state.players.set(client.sessionId, player);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.state.players.delete(client.sessionId);
  }

  async onDispose() {
    this.presence.srem(this.LOBBY_CHANNEL, this.roomId);
    console.log("room", this.roomId, "disposing...");
  }
}
