import Phaser from "phaser";
import EndGame from "./scenes/EndGame";
import Game from "./scenes/Game";
import PreLoader from "./scenes/Preloader";
import Welcome from "./scenes/Welcome";

let scenesToLoad = [PreLoader, Welcome, Game, EndGame];

const urlParams = new URLSearchParams(window.location.search);
const debugParam = urlParams.get("debug");

if (debugParam === "endgame") {
  scenesToLoad = [EndGame];
}
if (debugParam === "game") {
  scenesToLoad = [Game];
}

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: 1000,
  height: 800,

  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: scenesToLoad,
};

export default new Phaser.Game(config);
