abstract class TrashCan {
  x: number;
  y: number;
  abstract type: string;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class PaperCan extends TrashCan {
  type = 'paper';
}
export class GlassCan extends TrashCan {
  type = 'glass';
}
export class MetalCan extends TrashCan {
  type = 'metal';
}
export class PlasticCan extends TrashCan {
  type = 'plastic';
}
export class NonRecyclable extends TrashCan {
  type = 'non-recyclable';
}
