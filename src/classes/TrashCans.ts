import { Schema } from "@colyseus/schema";

export abstract class TrashCan extends Schema {
  x: number;
  y: number;
  abstract type: string;
  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
}

export class PaperCan extends TrashCan {
  type = "paper";
}
export class GlassCan extends TrashCan {
  type = "glass";
}
export class PlasticCan extends TrashCan {
  type = "plastic";
}
export class NonRecyclable extends TrashCan {
  type = "non-recyclable";
}
