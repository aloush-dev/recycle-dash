import { Schema } from "@colyseus/schema";
export abstract class Trash extends Schema {
  x: number;
  y: number;
  pickedUp: boolean;
  abstract type: string;
  abstract name: string;
  abstract points: number;
  abstract imgUrl: string;
  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    this.pickedUp = false;
  }
}

abstract class Paper extends Trash {
  type = "paper";
  points: 2;
}
abstract class Glass extends Trash {
  type = "glass";
  points: 3;
}
abstract class Plastic extends Trash {
  type = "plastic";
  points: 4;
}
abstract class NonRecyclable extends Trash {
  type = "non-recyclable";
  points: 1;
}
export class WaterBottle extends Plastic {
  name: "water-bottle";
  imgUrl: "https://i.ibb.co/y4tfVy3/plastic-bottle.png";
}
export class MilkBottle extends Plastic {
  name: "milk-bottle";
  imgUrl: "https://i.ibb.co/Dgrby43/plastic-jug.png";
}
export class DetergentBottle extends Plastic {
  name: "detergent-bottle";
  imgUrl: "https://i.ibb.co/QfZRZY9/plastic-red.png";
}
export class CardboardBox extends Paper {
  name: "cardboard-box";
  imgUrl: "https://i.ibb.co/PCj4ypP/paper-box.png";
}
export class Newspaper extends Paper {
  name: "newspaper";
  imgUrl: "https://i.ibb.co/vBvWCsW/paper-newspaper.png";
}
export class PaperBag extends Paper {
  name: "paper-bag";
  imgUrl: "https://i.ibb.co/KNTv3Fk/paper-bag.png";
}
export class GlassBottle extends Glass {
  name: "glass-bottle";
  imgUrl: "https://i.ibb.co/tqt2WxM/glass-soda-bottle.png";
}
export class GlassJar extends Glass {
  name: "glass-jar";
  imgUrl: "https://i.ibb.co/zrwR5z9/glass-jar.png";
}
export class BeerBottle extends Glass {
  name: "beer-bottle";
  imgUrl: "https://i.ibb.co/PDkCV1X/glass-beer-bottle.png";
}
export class PolystyreneCup extends NonRecyclable {
  name: "polystyrene-cup";
  imgUrl: "https://i.ibb.co/sJBz2hr/trash-cup.png";
}
export class CeramicMug extends NonRecyclable {
  name: "ceramic-mug";
  imgUrl: "https://i.ibb.co/Mc0TSp7/trash-mug.png";
}
export class SprayPaint extends NonRecyclable {
  name: "spray-paint";
  imgUrl: "https://i.ibb.co/F3cGXMz/trash-spray-can.png";
}
