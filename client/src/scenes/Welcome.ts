import Phaser from 'phaser';
import { Client, Room } from 'colyseus.js';

export default class Welcome extends Phaser.Scene {
  constructor() {
    super('welcome');
  }

  preload() {
    this.load.image(
      'welcomeBackground',
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/81f33c0e-5612-4d9c-ba91-aeadf5ec0fef/dg1t7bu-4475b3f8-bd1b-4270-baf9-0f18974bbfaa.png/v1/fit/w_800,h_800,q_70,strp/pixel_forest_by_nrdrawing_dg1t7bu-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvODFmMzNjMGUtNTYxMi00ZDljLWJhOTEtYWVhZGY1ZWMwZmVmXC9kZzF0N2J1LTQ0NzViM2Y4LWJkMWItNDI3MC1iYWY5LTBmMTg5NzRiYmZhYS5wbmciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.XP81_z7yltlBlFA-W8vARB7C243r6Op0YQ42jU4ML2E'
    );
  }

  multiplayerButton() {
    this.scene.switch('game');
  }

  async create() {
    const bg = this.add.sprite(0, 0, 'welcomeBackground');
    bg.setOrigin(0, 0);

    const welcomeText = this.add.text(130, 100, 'Welcome to the game', {
      fontFamily: 'MarioKart',
      fontSize: '50px',
    });
    const multiplayerStartButton = this.add.text(300, 300, 'Multiplayer', {
      fontFamily: 'MarioKart',
      backgroundColor: '#efb236',
      fontSize: '30px',
      padding: { x: 8, y: 8 },
    });
    multiplayerStartButton.setInteractive({ useHandCursor: true });
    multiplayerStartButton.on('pointerdown', () => this.multiplayerButton());
  }
}
