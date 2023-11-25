"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalConstants_1 = require("../globalConstants");
const Trash_1 = require("./Trash");
class TrashGenerator {
    static { this.trash = [
        (x, y) => new Trash_1.WaterBottle(x, y),
        (x, y) => new Trash_1.MilkBottle(x, y),
        (x, y) => new Trash_1.DetergentBottle(x, y),
        (x, y) => new Trash_1.CardboardBox(x, y),
        (x, y) => new Trash_1.Newspaper(x, y),
        (x, y) => new Trash_1.PaperBag(x, y),
        (x, y) => new Trash_1.GlassBottle(x, y),
        (x, y) => new Trash_1.GlassJar(x, y),
        (x, y) => new Trash_1.BeerBottle(x, y),
        (x, y) => new Trash_1.PolystyreneCup(x, y),
        (x, y) => new Trash_1.CeramicMug(x, y),
        (x, y) => new Trash_1.SprayPaint(x, y),
    ]; }
    static random() {
        const x = Math.floor(Math.random() * globalConstants_1.TRASH_LOADING_WIDTH);
        const y = Math.floor(Math.random() * globalConstants_1.HEIGHT);
        const index = Math.floor(Math.random() * this.trash.length);
        const newTrash = this.trash[index];
        return newTrash(x, y);
    }
}
exports.default = TrashGenerator;
