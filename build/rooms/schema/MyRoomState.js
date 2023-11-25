"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoomState = exports.Player = void 0;
const schema_1 = require("@colyseus/schema");
const Trash_1 = require("../../Trash/Trash");
const TrashCans_1 = require("../../Trash/TrashCans");
class Player extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.inputQueue = [];
    }
}
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "x", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "y", void 0);
exports.Player = Player;
class MyRoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.players = new schema_1.MapSchema();
        this.trash = new schema_1.MapSchema();
        this.trashCans = new schema_1.MapSchema();
    }
}
__decorate([
    (0, schema_1.type)({ map: Player })
], MyRoomState.prototype, "players", void 0);
__decorate([
    (0, schema_1.type)({ map: Trash_1.Trash })
], MyRoomState.prototype, "trash", void 0);
__decorate([
    (0, schema_1.type)({ map: TrashCans_1.TrashCan })
], MyRoomState.prototype, "trashCans", void 0);
exports.MyRoomState = MyRoomState;
