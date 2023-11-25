"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonRecyclable = exports.PlasticCan = exports.GlassCan = exports.PaperCan = exports.TrashCan = void 0;
const schema_1 = require("@colyseus/schema");
const globalConstants_1 = require("../globalConstants");
class TrashCan extends schema_1.Schema {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
}
__decorate([
    (0, schema_1.type)("number")
], TrashCan.prototype, "x", void 0);
__decorate([
    (0, schema_1.type)("number")
], TrashCan.prototype, "y", void 0);
__decorate([
    (0, schema_1.type)("string")
], TrashCan.prototype, "type", void 0);
__decorate([
    (0, schema_1.type)("string")
], TrashCan.prototype, "imgUrl", void 0);
exports.TrashCan = TrashCan;
class PaperCan extends TrashCan {
    constructor() {
        super(...arguments);
        this.type = "paper";
        this.imgUrl = globalConstants_1.PAPER_IMG_URL;
    }
}
exports.PaperCan = PaperCan;
class GlassCan extends TrashCan {
    constructor() {
        super(...arguments);
        this.type = "glass";
        this.imgUrl = globalConstants_1.GLASS_IMG_URL;
    }
}
exports.GlassCan = GlassCan;
class PlasticCan extends TrashCan {
    constructor() {
        super(...arguments);
        this.type = "plastic";
        this.imgUrl = globalConstants_1.PLASTIC_IMG_URL;
    }
}
exports.PlasticCan = PlasticCan;
class NonRecyclable extends TrashCan {
    constructor() {
        super(...arguments);
        this.type = "non-recyclable";
        this.imgUrl = globalConstants_1.NON_RECYCLABLE_IMG_URL;
    }
}
exports.NonRecyclable = NonRecyclable;
