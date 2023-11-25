import Phaser from "phaser";
import { Client, Room } from "colyseus.js";

export default class Welcome extends Phaser.Scene {
  constructor() {
    super("welcome");
  }
}
