import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";
import {
  GlassCan,
  NonRecyclable,
  PaperCan,
  PlasticCan,
} from "../Trash/TrashCans";
import { HEIGHT, TRASH_FOR_DIFFICULTY, WIDTH } from "../globalConstants";
import TrashGenerator from "../Trash/TrashGenorator";

const LETTERS = "ABCDEFGHIJKLLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
type GameState = "LOBBY" | "EASY" | "MEDIUM" | "HARD" | "COMPLETE";
export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;
  update: any; // NOT GOOD PLS FIX
  LOBBY_CHANNEL = "$mylobby";
  set gameState(gameInProgress: GameState) {
    this.state.gameInProgress = gameInProgress;
  }
  get gameState() {
    return this.state.gameInProgress as GameState;
  }
  generateRoomIdSingle(): string {
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
    }
    return result;
  }

  async generateRoomId(): Promise<string> {
    const currentIds = await this.presence.smembers(this.LOBBY_CHANNEL);
    let id;
    do {
      id = this.generateRoomIdSingle();
    } while (currentIds.includes(id));

    await this.presence.sadd(this.LOBBY_CHANNEL, id);
    return id;
  }
  private clockInterval: any;
  async onCreate(options: any) {
    this.roomId = await this.generateRoomId();
    this.setState(new MyRoomState());
    this.setUpCans();
    this.setUpTrash();
    this.clockInterval = setInterval(() => {
      this.incrementClock();
    }, 1000);
    this.onMessage("updatePlayer", (client, input) => {
      const player = this.state.players.get(client.sessionId);
      const velocity = 2;

      player.animation = input.animation;
      if (input.left) {
        player.x -= velocity;
      } else if (input.right) {
        player.x += velocity;
      }
      if (input.up) {
        player.y -= velocity;
      } else if (input.down) {
        player.y += velocity;
      }
    });

    this.onMessage("updateTrash", (client, input) => {
      const { left, right, up, down, trashItem } = input;
      const item = this.state.trash.filter(trash => {
        return trash.uniqueId === trashItem;
      })[0];

      const velocity = 2;
      if (item && left) {
        item.x -= velocity;
      }
      if (item && right) {
        item.x += velocity;
      }
      if (item && up) {
        item.y -= velocity;
      }
      if (item && down) {
        item.y += velocity;
      }
    });
    this.onMessage("deleteTrash", (client, input) => {
      console.log(input, "delete me");
      // const indexToRemove = this.state.trash.findIndex(item => {
      //   item.uniqueId === input;
      // });
      // if (indexToRemove !== -1) {
      //   this.state.trash.splice(indexToRemove, 1);
      // }
    });

    this.onMessage("setDifficulty", (client, difficulty) => {
      if (this.gameState !== "LOBBY") return;
      this.gameState = difficulty as GameState;
      this.setUpTrash();
      console.log(this.state.trash.length);
    });
    1;
  }
  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    const mapWidth = WIDTH;
    const mapHeight = HEIGHT;

    const player = new Player();
    player.x = 200;
    player.y = 150;
    this.state.players.set(client.sessionId, player);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    clearInterval(this.clockInterval);
    console.log("room", this.roomId, "disposing...");
  }

  private setUpCans() {
    const locations: { x: number; y: number }[] = [];
    for (let i = 4; i > 0; i--) {
      const x = (i * WIDTH) / 5;
      const y = (HEIGHT * 3) / 5;
      locations.push({ x, y });
    }
    locations.sort(() => Math.random() - 0.5);
    this.state.trashCans.set("0", new PaperCan(locations[0].x, locations[0].y));
    this.state.trashCans.set(
      "1",
      new PlasticCan(locations[1].x, locations[1].y)
    );
    this.state.trashCans.set("2", new GlassCan(locations[2].x, locations[2].y));
    this.state.trashCans.set(
      "3",
      new NonRecyclable(locations[3].x, locations[3].y)
    );
  }
  private setUpTrash() {
    const difficulties = ["EASY", "MEDIUM", "HARD"];
    if (!difficulties.includes(this.gameState)) return;
    this.state.trash.clear();
    const key = this.gameState as keyof typeof TRASH_FOR_DIFFICULTY;
    const numberOfTrashToSpawn = TRASH_FOR_DIFFICULTY[key];
    for (let i = 0; i < numberOfTrashToSpawn; i++) {
      const trash = TrashGenerator.random();
      this.state.trash.push(trash);
    }
  }
  private incrementClock() {
    if (this.gameState === "LOBBY" || this.gameState === "COMPLETE") return;
    ++this.state.clock;
    this.broadcast("clock", this.state.clock);
  }
}
