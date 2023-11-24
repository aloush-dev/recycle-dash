import Phaser from "phaser";

export default class PreLoader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.image(
      "player_one",
      "https://cdn.glitch.global/3e033dcd-d5be-4db4-99e8-086ae90969ec/ship_0001.png"
    );
  }
  create() {
    this.scene.start("game");
  }
}
