import { TrashCan } from "../classes/TrashCans";
import { Trash } from "./Trash";

export class TrashValidator {
  trashCan: TrashCan;
  constructor(trashCan: TrashCan) {
    this.trashCan = trashCan;
  }
  public validate(trash: Trash) {
    return trash.type === this.trashCan.type;
  }
}
