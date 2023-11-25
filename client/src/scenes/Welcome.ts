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

    const welcomeText = this.add.text(200, 50, "Recycle Dash", {
      fontFamily: "MarioKart",
      fontSize: "90px",
      color: "#91c7b1",
      stroke: "#b33951",
      strokeThickness: 8,
      align: "center",
    });
    const HostGameButton = this.add.text(415, 300, "Host Game", {
      fontFamily: "MarioKart",
      backgroundColor: "#e3d081",
      color: "#b33951",
      fontSize: "30px",
      padding: { x: 12, y: 12 },
      align: "center",
    });
    const JoinGameButton = this.add.text(415, 400, "Join Game", {
      fontFamily: "MarioKart",
      backgroundColor: "#e3d081",
      color: "#b33951",
      fontSize: "30px",
      padding: { x: 12, y: 12 },
      align: "center",
    });

    // const inputBox = document.getElementById("inputBox");
    // inputBox?.addEventListener("change", event => {
    //   const gameCode = event.target?.value;
    // });
    HostGameButton.setInteractive({ useHandCursor: true });
    HostGameButton.on("pointerdown", () => this.hostGameButton());
    JoinGameButton.setInteractive({ useHandCursor: true });
    JoinGameButton.on("pointerdown", () => this.joinGameButton());

    // const backgroundMuisc = this.sound.add("backgroundMusic", { loop: true });
    // backgroundMuisc.play();
  }
}
