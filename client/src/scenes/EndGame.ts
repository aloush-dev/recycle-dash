import { Client } from "colyseus.js";
import Phaser from "phaser";

export default class EndGame extends Phaser.Scene {
  timeTaken: string | null;
  constructor() {
    super("endgame");
    this.timeTaken = null;
  }

  preload() {
    this.load.image(
      "endgameBackground",
      "https://i.ibb.co/p0pTBjw/endgame.jpg"
    );
  }
  init({ timeTaken }: { timeTaken: string | null }) {
    if (timeTaken) {
      this.timeTaken = timeTaken;
    }
  }

  client = new Client(process.env.SERVER_URL || "ws://localhost:2567");

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  restartGame() {
    this.registry.destroy();
    this.scene.start("preloader");
  }

  async create(data: { timer: string; numOfPlayers: number }) {
    const { timer, numOfPlayers } = data;
    const bg = this.add.sprite(0, 0, "endgameBackground");
    bg.setOrigin(0, 0);
    bg.setScale(1000 / 2034, 800 / 1792);

    const endText = this.add
      .text(1000 * 0.5, 100, "Thanks For Playing!", {
        fontFamily: "MarioKart",
        fontSize: "90px",
        color: "#e3d081",
        stroke: "#b33951",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: endText,
      x: endText.x + 20,
      y: endText.y + 20,
      duration: 400,
      yoyo: true,
      repeat: -1,
    });

    const finishingBox = this.add
      .rectangle(1000 * 0.5, 500, 400, 400, 0xe3d081)
      .setStrokeStyle(4, 0x54494b)
      .setOrigin(0.5);

    const finishingText = this.add
      .text(1000 * 0.5, 350, "You sorted all the rubbish in", {
        fontFamily: "MarioKart",
        backgroundColor: "#e3d081",
        color: "#b33951",
        fontSize: "25px",
        padding: { x: 20, y: 20 },
      })
      .setOrigin(0.5);

    // const finishingTime = this.add
    //   .text(1000 * 0.5, 390, this.formatTime(+timer), {
    //     fontFamily: "MarioKart",
    //     backgroundColor: "#e3d081",
    //     color: "#b33951",
    //     fontSize: "30px",
    //     padding: { x: 20 },
    //   })
    //   .setOrigin(0.5);

    // const playAgain = this.add
    //   .text(1000 * 0.5, 500, "Play Again", {
    //     fontFamily: "MarioKart",
    //     backgroundColor: "#e3d081",
    //     color: "#b33951",
    //     fontSize: "30px",
    //     padding: { x: 20, y: 20 },
    //   })
    //   .setOrigin(0.5);

    // playAgain.setInteractive({ useHandCursor: true });
    // playAgain.on("pointerdown", () => this.restartGame());

    let defaultPos = 350;
    let chars = 24;

    for (let i = 0; i < numOfPlayers; i++) {
      // this.add.rectangle(defaultPos, 600, 85, 85).setStrokeStyle(4, 0x54494b);
      this.add.image(defaultPos, 600, "playerSheet", chars);
      defaultPos += 100;
      chars += 12;
    }
  }
}
