"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonRecyclable = exports.PlasticCan = exports.GlassCan = exports.PaperCan = exports.TrashCan = void 0;
const schema_1 = require("@colyseus/schema");
class TrashCan extends schema_1.Schema {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
}
exports.TrashCan = TrashCan;
class PaperCan extends TrashCan {
    constructor() {
        super(...arguments);
        this.type = "paper";
    }
}
exports.PaperCan = PaperCan;
class GlassCan extends TrashCan {
    constructor() {
        super(...arguments);
        this.type = "glass";
    }
}
exports.GlassCan = GlassCan;
class PlasticCan extends TrashCan {
    constructor() {
        super(...arguments);
        this.type = "plastic";
    }
}
exports.PlasticCan = PlasticCan;
class NonRecyclable extends TrashCan {
    constructor() {
        super(...arguments);
        this.type = "non-recyclable";
    }
}
exports.NonRecyclable = NonRecyclable;
