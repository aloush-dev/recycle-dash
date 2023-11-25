import Phaser from "phaser";
import { TRASH_CAN_URLS } from "../constants";

export default class PreLoader extends Phaser.Scene {
  constructor() {
    super("preloader");
    super("preloader");
  }
  preload() {
    for (const img in TRASH_CAN_URLS) {
      this.load.image(img, TRASH_CAN_URLS[img as keyof typeof TRASH_CAN_URLS]);
    }
    this.load.spritesheet(
      "playerSheet",
      "https://i.ibb.co/rbjPCCj/Characters-V3-Colour-3.png",
      { frameWidth: 80, frameHeight: 80 }
    );
    this.load.on("complete", () => {
      console.log("All assets are loaded");
    });
  }
  create() {
    const startPositions = {
      downIdle: 24,
      upIdle: 25,
      leftIdle: 27,
      rightIdle: 26,
      downWalkStart: 28,
      downWalkEnd: 29,
      upWalkStart: 30,
      upWalkEnd: 31,
      leftWalkStart: 34,
      leftWalkEnd: 35,
      rightWalkStart: 32,
      rightWalkEnd: 33,
    };
    for (let i = 0; i < 4; i++) {
      this.anims.create({
        key: `down-idle-${i}`,
        frames: [{ key: `playerSheet`, frame: startPositions.downIdle }],
      });
      this.anims.create({
        key: `up-idle-${i}`,
        frames: [{ key: `playerSheet`, frame: startPositions.upIdle }],
      });

      this.anims.create({
        key: `left-idle-${i}`,
        frames: [{ key: `playerSheet`, frame: startPositions.leftIdle }],
      });

      this.anims.create({
        key: `right-idle-${i}`,
        frames: [{ key: `playerSheet`, frame: startPositions.rightIdle }],
      });

      this.anims.create({
        key: `down-walk-${i}`,
        frames: this.anims.generateFrameNumbers(`playerSheet`, {
          start: startPositions.downWalkStart,
          end: startPositions.downWalkEnd,
        }),
        frameRate: 8,
        repeat: -1,
      });

      this.anims.create({
        key: `up-walk-${i}`,
        frames: this.anims.generateFrameNumbers(`playerSheet`, {
          start: startPositions.upWalkStart,
          end: startPositions.upWalkEnd,
        }),
        frameRate: 8,
        repeat: -1,
      });

      this.anims.create({
        key: `left-walk-${i}`,
        frames: this.anims.generateFrameNumbers(`playerSheet`, {
          start: startPositions.leftWalkStart,
          end: startPositions.leftWalkEnd,
        }),
        frameRate: 8,
        repeat: -1,
      });

      this.anims.create({
        key: `right-walk-${i}`,
        frames: this.anims.generateFrameNumbers(`playerSheet`, {
          start: startPositions.rightWalkStart,
          end: startPositions.rightWalkEnd,
        }),
        frameRate: 8,
        repeat: -1,
      });

      startPositions.downIdle += 12;
      startPositions.upIdle += 12;
      startPositions.leftIdle += 12;
      startPositions.rightIdle += 12;

      startPositions.downWalkStart += 12;
      startPositions.downWalkEnd += 12;
      startPositions.upWalkStart += 12;
      startPositions.upWalkEnd += 12;
      startPositions.leftWalkStart += 12;
      startPositions.leftWalkEnd += 12;
      startPositions.rightWalkStart += 12;
      startPositions.rightWalkEnd += 12;
    }

    this.scene.start("welcome");
  }
}
