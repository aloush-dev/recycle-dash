"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Trash_1 = require("../classes/Trash");
const TrashCans_1 = require("../classes/TrashCans");
const TrashValidator_1 = require("../classes/TrashValidator");
const globals_1 = require("@jest/globals");
describe("Trash Validator", () => {
    it("should return true when trash type matches trashCan type", () => {
        const box = new Trash_1.CardboardBox(2, 2);
        const paperCan = new TrashCans_1.PaperCan(10, 10);
        const validator = new TrashValidator_1.TrashValidator(paperCan);
        (0, globals_1.expect)(validator.validate(box)).toBe(true);
    });
    it("should return false when trash type does not match trashCan type", () => {
        const box = new Trash_1.CardboardBox(2, 2);
        const plasticCan = new TrashCans_1.PlasticCan(10, 10);
        const validator = new TrashValidator_1.TrashValidator(plasticCan);
        (0, globals_1.expect)(validator.validate(box)).toBe(false);
    });
});
