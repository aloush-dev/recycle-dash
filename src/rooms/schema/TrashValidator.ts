import { Trash } from "./Trash";
import { TrashCan } from "./TrashCans";

export class TrashValidator {
  trashCan: TrashCan;
  constructor(trashCan: TrashCan) {
    this.trashCan = trashCan;
  }
  public validate(trash: Trash) {
    return trash.type === this.trashCan.type;
  }
}
