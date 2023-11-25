import { CardboardBox } from "../classes/Trash";
import { PaperCan, PlasticCan } from "../classes/TrashCans";
import { TrashValidator } from "../classes/TrashValidator";
import { expect } from "@jest/globals";

describe("Trash Validator", () => {
  it("should return true when trash type matches trashCan type", () => {
    const box = new CardboardBox(2, 2);
    const paperCan = new PaperCan(10, 10);
    const validator = new TrashValidator(paperCan);
    expect(validator.validate(box)).toBe(true);
  });
  it("should return false when trash type does not match trashCan type", () => {
    const box = new CardboardBox(2, 2);
    const plasticCan = new PlasticCan(10, 10);
    const validator = new TrashValidator(plasticCan);
    expect(validator.validate(box)).toBe(false);
  });
});
