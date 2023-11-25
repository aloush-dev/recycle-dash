import Phaser from "phaser";
import { Client, Room } from "colyseus.js";

type Player = {
  x: number;
  y: number;
  inputQueue: any;
  onChange: any; //MUST fix this cannot put an any type in front of Johnny and Haz
};
export default class Game extends Phaser.Scene {
  state: any;
  constructor() {
    super("game");
  }

  currentPlayer!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  remoteRef!: Phaser.GameObjects.Rectangle;

  inputPayload = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;

  init() {
    this.cursorKeys = this.input.keyboard!.createCursorKeys();
  }
  client = new Client("ws://localhost:2567");
  room!: Room;

  playerEntities: { [sessionId: string]: any } = {};

  async create() {
    console.log("Joining Room");
    try {
      this.room = await this.client.joinOrCreate("my_room");
      this.room.state.players.onAdd(
        (player: Player, sessionId: string | number) => {
          console.log(
            "A player has joined! Their unique session id is",
            sessionId
          );
          console.log(
            "Players connected: ",
            Object.keys(this.playerEntities).length + 1
          );
          const playerNum = Object.keys(this.playerEntities).length;
          const sprites = [156, 24, 48, 96];
          const { width, height } = this.scale;

          const entity = this.physics.add
            .sprite(player.x, player.y, "playerSheet", sprites[playerNum])
            .setOffset(player.x, player.y);
          this.playerEntities[sessionId] = entity;

          if (sessionId === this.room.sessionId) {
            this.currentPlayer = entity;

            this.remoteRef = this.add.rectangle(
              0,
              0,
              entity.width,
              entity.height
            );
            this.remoteRef.setStrokeStyle(1, 0xff0000);

            player.onChange(() => {
              this.remoteRef.x = player.x;
              this.remoteRef.y = player.y;
            });
          } else {
            // all remote players are here!
            // (same as before, we are going to interpolate remote players)
            player.onChange(() => {
              entity.setData("serverX", player.x);
              entity.setData("serverY", player.y);
            });
          }

          player.onChange(() => {
            entity.setData("serverX", player.x);
            entity.setData("serverY", player.y);
          });
        }
      );
      this.room.state.players.onRemove(
        (player: { x: number; y: number }, sessionId: string | number) => {
          const entity = this.playerEntities[sessionId];
          if (entity) {
            entity.destroy();
            delete this.playerEntities[sessionId];
          }
          console.log(`Player at session ${sessionId} has left the game`);
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
  updatePlayer() {}

  update(time: number, delta: number): void {
    if (!this.currentPlayer) {
      return;
    }
    console.log(this.currentPlayer.data);

    const velocity = 2;

    this.inputPayload.left = this.cursorKeys.left.isDown;
    this.inputPayload.right = this.cursorKeys.right.isDown;
    this.inputPayload.up = this.cursorKeys.up.isDown;
    this.inputPayload.down = this.cursorKeys.down.isDown;
    this.room.send(0, this.inputPayload);

    if (this.inputPayload.left) {
      this.currentPlayer.x -= velocity;
      this.currentPlayer.play("left-walk-0", true);
    } else if (this.inputPayload.right) {
      this.currentPlayer.x += velocity;
      this.currentPlayer.play("right-walk-0", true);
    }

    if (this.inputPayload.up) {
      this.currentPlayer.y -= velocity;
      this.currentPlayer.play("up-walk-0");
    } else if (this.inputPayload.down) {
      this.currentPlayer.y += velocity;
    } else {
      this.currentPlayer.setVelocity(0, 0);
      // const key = this.currentPlayer.anims.currentAnim!.key;
      // const parts = key!.split("-");
      // const direction = parts[0];
      // this.currentPlayer.play(`${direction}-idle-0`);
    }

    if (!this.room) {
      return;
    }

    for (let sessionId in this.playerEntities) {
      if (sessionId === this.room.sessionId) {
        continue;
      }

      const entity = this.playerEntities[sessionId];

      const { serverX, serverY } = entity.data.values;

      entity.x = Phaser.Math.Linear(entity.x, serverX, 0.4);
      entity.y = Phaser.Math.Linear(entity.y, serverY, 0.4);
    }
  }
}
