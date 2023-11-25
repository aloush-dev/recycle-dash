import Phaser from "phaser";

export default class PreLoader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.spritesheet(
      "playerSheet",
      "https://i.ibb.co/rbjPCCj/Characters-V3-Colour-3.png",
      { frameWidth: 80, frameHeight: 80 }
    );
  }
  create() {
    this.anims.create({
      key: "down-idle-0",
      frames: [{ key: "playerSheet", frame: 156 }],
    });
    this.anims.create({
      key: "up-idle-0",
      frames: [{ key: "playerSheet", frame: 157 }],
    });

    this.anims.create({
      key: "left-idle-0",
      frames: [{ key: "playerSheet", frame: 159 }],
    });

    this.anims.create({
      key: "right-idle-0",
      frames: [{ key: "playerSheet", frame: 158 }],
    });

    this.anims.create({
      key: "down-walk-0",
      frames: this.anims.generateFrameNumbers("playerSheet", {
        start: 160,
        end: 161,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "up-walk-0",
      frames: this.anims.generateFrameNumbers("playerSheet", {
        start: 162,
        end: 163,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "left-walk-0",
      frames: this.anims.generateFrameNumbers("playerSheet", {
        start: 166,
        end: 167,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "right-walk-0",
      frames: this.anims.generateFrameNumbers("playerSheet", {
        start: 164,
        end: 165,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.scene.start("game");
  }
}
