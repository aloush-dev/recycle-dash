import Phaser from "phaser";
import Game from "./scenes/Game";
import PreLoader from "./scenes/Preloader";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: 800,
  height: 600,

  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: [PreLoader, Game],
};

export default new Phaser.Game(config);
