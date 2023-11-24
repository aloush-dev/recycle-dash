import Phaser from "phaser";
import { Client, Room } from "colyseus.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }
  client = new Client("ws://localhost:2567");
  room!: Room;

  async create() {
    console.log("Joining Room");
    try {
      this.room = await this.client.joinOrCreate("my_room");
      console.log("Joined successfully");
    } catch (e) {
      console.error(e);
    }
  }
}
