import { Client } from "colyseus.js";
import Phaser from "phaser";

export default class Welcome extends Phaser.Scene {
  constructor() {
    super("welcome");
  }

  preload() {
    // this.load.audio(
    //   "backgroundMusic",
    //   "http://localhost:2567/audio/welcome_screen"
    // );
    this.load.image(
      "welcomeBackground",
      "https://i.ibb.co/vQKgfJp/recycle-dash-background.png"
    );
  }

  hostGameButton() {
    this.scene.switch("game");
  }

  joinGameButton() {
    this.scene.switch("game");
  }

  client = new Client("ws://localhost:2567");

  async create() {
    const bg = this.add.sprite(0, 0, "welcomeBackground");
    bg.setOrigin(0, 0);

    const welcomeText = this.add
      .text(1000 * 0.5, 100, "Recycle Dash", {
        fontFamily: "MarioKart",
        fontSize: "90px",
        color: "#91c7b1",
        stroke: "#b33951",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);
    const PlayButton = this.add
      .text(1000 * 0.5, 400, "Play Game", {
        fontFamily: "MarioKart",
        backgroundColor: "#e3d081",
        color: "#b33951",
        fontSize: "30px",
        padding: { x: 20, y: 20 },
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: welcomeText,
      x: welcomeText.x - 10,
      y: welcomeText.y - 10,
      duration: 400,
      yoyo: true,
      repeat: -1,
    });

    PlayButton.setInteractive({ useHandCursor: true });
    PlayButton.on("pointerdown", () => this.hostGameButton());

    // const backgroundMuisc = this.sound.add("backgroundMusic", { loop: true });
    // backgroundMuisc.play();
  }
}
