"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrashValidator = void 0;
class TrashValidator {
    constructor(trashCan) {
        this.trashCan = trashCan;
    }
    validate(trash) {
        return trash.type === this.trashCan.type;
    }
}
exports.TrashValidator = TrashValidator;
