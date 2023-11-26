import { Schema, type } from "@colyseus/schema";
const LETTERS = "ABCDEFGHIJKLLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function generateTrashId(): string {
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
  }
  return result;
}
export abstract class Trash extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type("boolean") pickedUp: boolean;
  @type("string") abstract type: string;
  @type("string") abstract name: string;
  @type("number") abstract points: number;
  @type("string") abstract imgUrl: string;
  @type("string") uniqueId: string;
  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    this.pickedUp = false;
    this.uniqueId = generateTrashId();
  }
}

abstract class Paper extends Trash {
  @type("string") type = "paper";
  @type("number") points = 2;
}
abstract class Glass extends Trash {
  @type("string") type = "glass";
  @type("number") points = 3;
}
abstract class Plastic extends Trash {
  @type("string") type = "plastic";
  @type("number") points = 4;
}
abstract class NonRecyclable extends Trash {
  @type("string") type = "non-recyclable";
  @type("number") points = 1;
}
export class WaterBottle extends Plastic {
  @type("string") name = "water-bottle";
  @type("string") imgUrl = "https://i.ibb.co/y4tfVy3/plastic-bottle.png";
}
export class MilkBottle extends Plastic {
  @type("string") name = "milk-bottle";
  @type("string") imgUrl = "https://i.ibb.co/Dgrby43/plastic-jug.png";
}
export class DetergentBottle extends Plastic {
  @type("string") name = "detergent-bottle";
  @type("string") imgUrl = "https://i.ibb.co/QfZRZY9/plastic-red.png";
}
export class CardboardBox extends Paper {
  @type("string") name = "cardboard-box";
  @type("string") imgUrl = "https://i.ibb.co/PCj4ypP/paper-box.png";
}
export class Newspaper extends Paper {
  @type("string") name = "newspaper";
  @type("string") imgUrl = "https://i.ibb.co/vBvWCsW/paper-newspaper.png";
}
export class PaperBag extends Paper {
  @type("string") name = "paper-bag";
  @type("string") imgUrl = "https://i.ibb.co/KNTv3Fk/paper-bag.png";
}
export class GlassBottle extends Glass {
  @type("string") name = "glass-bottle";
  @type("string") imgUrl = "https://i.ibb.co/tqt2WxM/glass-soda-bottle.png";
}
export class GlassJar extends Glass {
  @type("string") name = "glass-jar";
  @type("string") imgUrl = "https://i.ibb.co/zrwR5z9/glass-jar.png";
}
export class BeerBottle extends Glass {
  @type("string") name = "beer-bottle";
  @type("string") imgUrl = "https://i.ibb.co/PDkCV1X/glass-beer-bottle.png";
}
export class PolystyreneCup extends NonRecyclable {
  @type("string") name = "polystyrene-cup";
  @type("string") imgUrl = "https://i.ibb.co/sJBz2hr/trash-cup.png";
}
export class CeramicMug extends NonRecyclable {
  @type("string") name = "ceramic-mug";
  @type("string") imgUrl = "https://i.ibb.co/Mc0TSp7/trash-mug.png";
}
export class SprayPaint extends NonRecyclable {
  @type("string") name = "spray-paint";
  @type("string") imgUrl = "https://i.ibb.co/F3cGXMz/trash-spray-can.png";
}
