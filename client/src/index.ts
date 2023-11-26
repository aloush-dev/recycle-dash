import Phaser from "phaser";
import EndGame from "./scenes/EndGame";
import Game from "./scenes/Game";
import PreLoader from "./scenes/Preloader";
import Welcome from "./scenes/Welcome";
import Lobby from "./scenes/Lobby";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: 1000,
  height: 800,

  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  scene: [PreLoader, Welcome, Game, EndGame],
};

export default new Phaser.Game(config);
