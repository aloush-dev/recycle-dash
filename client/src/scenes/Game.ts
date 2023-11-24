import Phaser from "phaser";
import { Client, Room } from "colyseus.js";

type Player = {
  x: number;
  y: number;
  onChange: any; //MUST fix this cannot put an any type in front of Johnny and Haz
};
export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

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
          const entity = this.physics.add.image(
            player.x,
            player.y,
            "player_one"
          );
          this.playerEntities[sessionId] = entity;

          player.onChange(() => {
            entity.x = player.x;
            entity.y = player.y;
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
  update(time: number, delta: number): void {
    // skip loop if not connected with room yet.
    if (!this.room) {
      return;
    }

    // send input to the server
    this.inputPayload.left = this.cursorKeys.left.isDown;
    this.inputPayload.right = this.cursorKeys.right.isDown;
    this.inputPayload.up = this.cursorKeys.up.isDown;
    this.inputPayload.down = this.cursorKeys.down.isDown;
    this.room.send(0, this.inputPayload);
  }
}
