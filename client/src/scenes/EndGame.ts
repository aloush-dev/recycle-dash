import { Client } from "colyseus.js";
import Phaser from "phaser";

export default class EndGame extends Phaser.Scene {
  constructor() {
    super("endgame");
  }

  preload() {
    this.load.image(
      "endgameBackground",
      "https://i.ibb.co/p0pTBjw/endgame.jpg"
    );
  }

  client = new Client("ws://localhost:2567");

  async create(data: any) {
    const { endGameStats } = data;
    console.log(data);
    const bg = this.add.sprite(0, 0, "endgameBackground");
    bg.setOrigin(0, 0);
    bg.setScale(1000 / 2034, 800 / 1792);

    let defaultPos = 200;

    for (let i = 0; i < endGameStats.length; i++) {
      this.add.rectangle(defaultPos, 700, 148, 148).setStrokeStyle(4, 0x54494b);
      defaultPos += 200;
    }
  }
}
