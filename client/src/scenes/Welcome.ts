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

  easyGameButton = () => {
    this.scene.start("game", { difficulty: "EASY" });
  };

  mediumGameButton() {
    this.scene.start("game", { difficulty: "MEDIUM" });
  }

  hardGameButton() {
    this.scene.start("game", { difficulty: "HARD" });
  }

  // client = new Client("ws://localhost:2567");

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
    const EasyButton = this.add
      .text(1000 * 0.5, 400, "Play Easy Game", {
        fontFamily: "MarioKart",
        backgroundColor: "#e3d081",
        color: "#b33951",
        fontSize: "30px",
        padding: { x: 20, y: 20 },
      })
      .setOrigin(0.5);

    const MediumButton = this.add
      .text(1000 * 0.5, 500, "Play Medium Game", {
        fontFamily: "MarioKart",
        backgroundColor: "#e3d081",
        color: "#b33951",
        fontSize: "30px",
        padding: { x: 20, y: 20 },
      })
      .setOrigin(0.5);

    const hardButton = this.add
      .text(1000 * 0.5, 600, "Play Hard Game", {
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

    EasyButton.setInteractive({ useHandCursor: true });
    EasyButton.on("pointerdown", () => this.easyGameButton());

    MediumButton.setInteractive({ useHandCursor: true });
    MediumButton.on("pointerdown", () => this.mediumGameButton());

    hardButton.setInteractive({ useHandCursor: true });
    hardButton.on("pointerdown", () => this.hardGameButton());

    // const backgroundMuisc = this.sound.add("backgroundMusic", { loop: true });
    // backgroundMuisc.play();
  }
}
