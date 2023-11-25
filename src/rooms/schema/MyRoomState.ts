import { MapSchema, ArraySchema, Schema, type } from "@colyseus/schema";
import { Trash } from "../../Trash/Trash";
import { TrashCan } from "../../Trash/TrashCans";

export class Player extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  playerNumber: number;
  @type("string") animation: string | null;
}
export class MyRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type([Trash]) trash = new ArraySchema<Trash>();
  @type({ map: TrashCan }) trashCans = new MapSchema<TrashCan>();
}
