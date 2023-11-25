import Phaser from 'phaser';
import Game from './scenes/Game';
import PreLoader from './scenes/Preloader';
import Welcome from './scenes/Welcome';

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 800,
  height: 600,

  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: [PreLoader, Welcome, Game],
};

export default new Phaser.Game(config);
