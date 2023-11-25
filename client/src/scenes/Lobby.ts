import { Room } from "colyseus";
import { Client } from "colyseus.js";

type Player = {
  x: number;
  y: number;
  inputQueue: any;
  onChange: any; //MUST fix this cannot put an any type in front of Johnny and Haz
};

export default class Lobby extends Phaser.Scene {
  constructor() {
    super("lobby");
  }

  preload() {
    this.load.image(
      "lobbyBackground",
      "https://i.ibb.co/9gpw605/recycle-game-lobby-background.png"
    );
  }

  client = new Client("ws://localhost:2567");
  room!: Room;

  currentPlayer!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  remoteRef!: Phaser.GameObjects.Rectangle;

  playerEntities: { [sessionId: string]: any } = {};

  dataToPass: {
    roomId: string;
    sessionId: string | number;
  } = {
    roomId: "",
    sessionId: "",
  };

  startGame = () => {
    this.scene.start("game", this.dataToPass);
  };

  playerStartingPos = {
    x: 200,
    y: 700,
  };

  async create() {
    const bg = this.add.sprite(0, 0, "lobbyBackground");
    bg.setOrigin(0, 0);
    bg.setScale(
      this.cameras.main.width / 1500,
      this.cameras.main.height / 1300
    );

    const playerOne = this.add.rectangle(200, 700, 148, 148, 0xf1f7ed);
    const playerTwo = this.add.rectangle(400, 700, 148, 148, 0xf1f7ed);
    const playerThree = this.add.rectangle(600, 700, 148, 148, 0xf1f7ed);
    const playerFour = this.add.rectangle(800, 700, 148, 148, 0xf1f7ed);

    playerOne.setStrokeStyle(4, 0x54494b);
    playerTwo.setStrokeStyle(4, 0x54494b);
    playerThree.setStrokeStyle(4, 0x54494b);
    playerFour.setStrokeStyle(4, 0x54494b);

    const StartGameButton = this.add.text(415, 100, "Start Game", {
      fontFamily: "MarioKart",
      backgroundColor: "#e3d081",
      color: "#b33951",
      fontSize: "30px",
      padding: { x: 12, y: 12 },
      align: "center",
    });

    StartGameButton.setInteractive({ useHandCursor: true });
    StartGameButton.on("pointerdown", () => this.startGame());

    try {
      this.room = await this.client.joinOrCreate("my_room");
      this.dataToPass.roomId = this.room.roomId;

      this.room.state.players.onAdd(
        (player: Player, sessionId: string | number) => {
          this.dataToPass.sessionId = sessionId;
          console.log(
            "A player has joined! Their unique session id is",
            sessionId,
            "and the room ID is",
            this.room.roomId,
            "LOBBY SCENE"
          );
          const playerNum = Object.keys(this.playerEntities).length;
          const sprites = [0, 12, 24, 36];

          switch (playerNum) {
            case 1:
              this.playerStartingPos.x = 400;
              break;
            case 2:
              this.playerStartingPos.x = 600;
              break;
            case 3:
              this.playerStartingPos.x = 800;
              break;
            default:
              this.tweens.add({
                targets: [playerTwo, playerThree, playerFour],
                scaleX: 0.25,
                scaleY: 0.5,
                yoyo: true,
                repeat: -1,
                ease: "Sine.easeInOut",
              });
              break;
          }

          const entity = this.add.sprite(
            this.playerStartingPos.x,
            this.playerStartingPos.y,
            "playerSheet",
            sprites[playerNum]
          );

          this.playerEntities[sessionId] = entity;
          this.playerEntities[sessionId].playerNumber = playerNum;
        }
      );
    } catch (error) {}
  }
}
