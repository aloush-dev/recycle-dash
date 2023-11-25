import { HEIGHT, TRASH_LOADING_WIDTH } from "../globalConstants";
import {
  BeerBottle,
  CardboardBox,
  CeramicMug,
  DetergentBottle,
  GlassBottle,
  GlassJar,
  MilkBottle,
  Newspaper,
  PaperBag,
  PolystyreneCup,
  SprayPaint,
  Trash,
  WaterBottle,
} from "./Trash";
type TrashCreator = (x: number, y: number) => Trash;

export default class TrashGenerator {
  static trash: TrashCreator[] = [
    (x, y) => new WaterBottle(x, y),
    (x, y) => new MilkBottle(x, y),
    (x, y) => new DetergentBottle(x, y),
    (x, y) => new CardboardBox(x, y),
    (x, y) => new Newspaper(x, y),
    (x, y) => new PaperBag(x, y),
    (x, y) => new GlassBottle(x, y),
    (x, y) => new GlassJar(x, y),
    (x, y) => new BeerBottle(x, y),
    (x, y) => new PolystyreneCup(x, y),
    (x, y) => new CeramicMug(x, y),
    (x, y) => new SprayPaint(x, y),
  ];

  static random() {
    const x = Math.floor(Math.random() * TRASH_LOADING_WIDTH);
    const y = Math.floor(Math.random() * HEIGHT);
    const index = Math.floor(Math.random() * this.trash.length);
    const newTrash = this.trash[index];
    return newTrash(x, y);
  }
}
