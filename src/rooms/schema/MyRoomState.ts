import { MapSchema, Schema, Context, type } from "@colyseus/schema";
import { Trash } from "../../classes/Trash";
import { TrashCan } from "../../classes/TrashCans";

export class Player extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  inputQueue: any[] = [];
  playerNumber: number;
}
export class MyRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  trash = new MapSchema<Trash>();
  trashCans = new MapSchema<TrashCan>();
}
