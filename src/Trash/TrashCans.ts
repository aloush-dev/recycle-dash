import { Schema, type } from "@colyseus/schema";
import {
  GLASS_IMG_URL,
  NON_RECYCLABLE_IMG_URL,
  PAPER_IMG_URL,
  PLASTIC_IMG_URL,
} from "../globalConstants";
import { Trash } from "./Trash";

export abstract class TrashCan extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type("string") type: string;
  @type("string") imgUrl: string;
  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
  public validate(trash: Trash) {
    return trash.type === this.type;
  }
}

export class PaperCan extends TrashCan {
  type = "paper";
  imgUrl = PAPER_IMG_URL;
}
export class GlassCan extends TrashCan {
  type = "glass";
  imgUrl = GLASS_IMG_URL;
}
export class PlasticCan extends TrashCan {
  type = "plastic";
  imgUrl = PLASTIC_IMG_URL;
}
export class NonRecyclable extends TrashCan {
  type = "non-recyclable";
  imgUrl = NON_RECYCLABLE_IMG_URL;
}
