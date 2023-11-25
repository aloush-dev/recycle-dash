import Phaser from "phaser";
import { Client, Room } from "colyseus.js";

type Player = {
  x: number;
  y: number;
  animation: string | null;
  inputQueue: any;
  onChange: any; //MUST fix this cannot put an any type in front of Johnny and Haz
};
type TrashCan = {
  x: number;
  y: number;
  imgUrl: string;
  type: string;
};

type Trash = {
  x: number;
  y: number;
  imgUrl: string;
  type: string;
  points: number;
  pickedUp: boolean;
  name: string;


type InputPayloadType = {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  animation: string | null;
};
export default class Game extends Phaser.Scene {
  state: any;
  constructor() {
    super("game");
  }

  currentPlayer!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody & {
    playerNumber?: number;
  };
  remoteRef!: Phaser.GameObjects.Rectangle;

  inputPayload: InputPayloadType = {
    left: false,
    right: false,
    up: false,
    down: false,
    animation: "down-idle-0",
  };

  cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
  room!: Room;

  init() {
    this.cursorKeys = this.input.keyboard!.createCursorKeys();
  }

  client = new Client("ws://localhost:2567");
  playerEntities: { [sessionId: string]: any } = {};
  trashCanEntities: { [key: string]: any } = {};
  trashEntities: { [key: string]: any } = {};
  private createCan(trashCanItem: any, key: string) {
    const rectWidth = 32;
    const rectHeight = 32;

    const graphics = this.add.graphics({ fillStyle: { alpha: 0 } });
    const rect = new Phaser.Geom.Rectangle(
      trashCanItem.x,
      trashCanItem.y,
      rectWidth,
      rectHeight
    );
    graphics.fillRectShape(rect);

    const imageX = trashCanItem.x + rectWidth / 2;
    const imageY = trashCanItem.y + rectHeight / 2;

    const image = this.add.image(imageX, imageY, trashCanItem.type);

    this.trashCanEntities[key] = graphics;
  }
  private createTrash(trashItem: any, key: string) {
    console.log(trashItem);

    const rectWidth = 32;
    const rectHeight = 32;

    const graphics = this.add.graphics({ fillStyle: { alpha: 0 } });
    const rect = new Phaser.Geom.Rectangle(
      trashItem.x,
      trashItem.y,
      rectWidth,
      rectHeight
    );
    graphics.fillRectShape(rect);

    const imageX = trashItem.x + rectWidth / 2;
    const imageY = trashItem.y + rectHeight / 2;

    const image = this.add.image(imageX, imageY, trashItem.name);

    this.trashEntities[trashItem.name] = graphics;
  }

  async create() {
    console.log("Joining Room");
    try {
      this.room = await this.client.joinOrCreate("my_room");

      this.room.state.trashCans.onAdd((trashCan: TrashCan, key: string) => {
        this.createCan(trashCan, key);
      });
      this.room.state.trash.onAdd((trashItem: Trash, key: string) => {
        this.createTrash(trashItem, key);
      });

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
          const sprites = [24, 36, 48, 60];

          const entity = this.physics.add
            .sprite(player.x, player.y, "playerSheet", sprites[playerNum])
            .setOffset(player.x, player.y);
          this.playerEntities[sessionId] = entity;
          this.playerEntities[sessionId].playerNumber = playerNum;
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

            player.onChange(() => {
              entity.setData("serverX", player.x);
              entity.setData("serverY", player.y);
            });
          }

          player.onChange(() => {
            entity.setData("serverX", player.x);
            entity.setData("serverY", player.y);
            entity.setData("animation", player.animation);
          });
        }
      );

      this.room.state.players.onRemove((sessionId: string | number) => {
        const entity = this.playerEntities[sessionId];
        if (entity) {
          entity.destroy();
          delete this.playerEntities[sessionId];
        }
        console.log(`Player at session ${sessionId} has left the game`);
      });
    } catch (e) {
      console.error(e);
    }
  }

  update(time: number, delta: number): void {
    if (!this.currentPlayer) {
      return;
    }
    if (!this.room) {
      return;
    }
    const animNum: number = this.currentPlayer.playerNumber || 0;

    const velocity = 2;

    this.inputPayload.left = this.cursorKeys.left.isDown;
    this.inputPayload.right = this.cursorKeys.right.isDown;
    this.inputPayload.up = this.cursorKeys.up.isDown;
    this.inputPayload.down = this.cursorKeys.down.isDown;
    this.inputPayload.animation =
      this.currentPlayer.anims.currentAnim?.key || null;

    if (this.inputPayload.left) {
      this.currentPlayer.play(`left-walk-${animNum}`, true);
      this.currentPlayer.x -= velocity;
    } else if (this.inputPayload.right) {
      this.currentPlayer.play(`right-walk-${animNum}`, true);
      this.currentPlayer.x += velocity;
    }

    if (this.inputPayload.up) {
      this.currentPlayer.play(`up-walk-${animNum}`, true);
      this.currentPlayer.y -= velocity;
    } else if (this.inputPayload.down) {
      this.currentPlayer.play(`down-walk-${animNum}`, true);
      this.currentPlayer.y += velocity;
    } else {
      this.currentPlayer.setVelocity(0, 0);

      if (!this.inputPayload.left && !this.inputPayload.right) {
        const currentAnimKey = this.currentPlayer.anims.currentAnim?.key;

        // Check if the player is not already playing an idle animation
        if (currentAnimKey && !currentAnimKey.includes("idle")) {
          const parts = currentAnimKey.split("-");
          const direction = parts[0];
          this.currentPlayer.play(`${direction}-idle-${animNum}`);
        }
      }
    }
    this.room.send("updatePlayer", this.inputPayload);

    for (let sessionId in this.playerEntities) {
      if (sessionId === this.room.sessionId) {
        continue;
      }

      const entity = this.playerEntities[sessionId];

      if (entity) {
        const { serverX, serverY, animation } = entity.data.values;
        entity.x = Phaser.Math.Linear(entity.x, serverX, 0.4);
        entity.y = Phaser.Math.Linear(entity.y, serverY, 0.4);
        if (animation) {
          entity.play(animation, true);
        }
      }
    }
  }
}
