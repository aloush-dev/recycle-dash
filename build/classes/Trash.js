"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SprayPaint = exports.CeramicMug = exports.PolystyreneCup = exports.BeerBottle = exports.GlassJar = exports.GlassBottle = exports.PaperBag = exports.Newspaper = exports.CardboardBox = exports.DetergentBottle = exports.MilkBottle = exports.WaterBottle = exports.Trash = void 0;
const schema_1 = require("@colyseus/schema");
class Trash extends schema_1.Schema {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.pickedUp = false;
    }
}
exports.Trash = Trash;
class Paper extends Trash {
    constructor() {
        super(...arguments);
        this.type = "paper";
    }
}
class Glass extends Trash {
    constructor() {
        super(...arguments);
        this.type = "glass";
    }
}
class Plastic extends Trash {
    constructor() {
        super(...arguments);
        this.type = "plastic";
    }
}
class NonRecyclable extends Trash {
    constructor() {
        super(...arguments);
        this.type = "non-recyclable";
    }
}
class WaterBottle extends Plastic {
}
exports.WaterBottle = WaterBottle;
class MilkBottle extends Plastic {
}
exports.MilkBottle = MilkBottle;
class DetergentBottle extends Plastic {
}
exports.DetergentBottle = DetergentBottle;
class CardboardBox extends Paper {
}
exports.CardboardBox = CardboardBox;
class Newspaper extends Paper {
}
exports.Newspaper = Newspaper;
class PaperBag extends Paper {
}
exports.PaperBag = PaperBag;
class GlassBottle extends Glass {
}
exports.GlassBottle = GlassBottle;
class GlassJar extends Glass {
}
exports.GlassJar = GlassJar;
class BeerBottle extends Glass {
}
exports.BeerBottle = BeerBottle;
class PolystyreneCup extends NonRecyclable {
}
exports.PolystyreneCup = PolystyreneCup;
class CeramicMug extends NonRecyclable {
}
exports.CeramicMug = CeramicMug;
class SprayPaint extends NonRecyclable {
}
exports.SprayPaint = SprayPaint;
