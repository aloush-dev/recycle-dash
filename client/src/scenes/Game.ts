import Phaser from "phaser";
import { Client, Room } from "colyseus.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }
  client = new Client("ws://localhost:2567");
  room!: Room;

  playerEntities: { [sessionId: string]: any } = {};

  async create() {
    console.log("Joining Room");
    try {
      this.room = await this.client.joinOrCreate("my_room");

      this.room.state.players.onAdd(
        (player: { x: number; y: number }, sessionId: string | number) => {
          console.log(
            "A player has joined! Their unique session id is",
            sessionId
          );
          const entity = this.physics.add.image(
            player.x,
            player.y,
            "player_one"
          );
          this.playerEntities[sessionId] = entity;
        }
      );
      this.room.state.players.onRemove(
        (player: { x: number; y: number }, sessionId: string | number) => {
          const entity = this.playerEntities[sessionId];
          if (entity) {
            entity.destroy();
            delete this.playerEntities[sessionId];
          }
          console.log(`Player at session ${sessionId} has left the game`);
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
}
