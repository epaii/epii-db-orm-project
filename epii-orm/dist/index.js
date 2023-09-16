"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.DbOrm = exports.Db = void 0;
const Db_1 = require("./Db");
Object.defineProperty(exports, "Db", { enumerable: true, get: function () { return Db_1.Db; } });
Object.defineProperty(exports, "DbOrm", { enumerable: true, get: function () { return Db_1.DbOrm; } });
const Query_1 = require("./Query");
Object.defineProperty(exports, "Query", { enumerable: true, get: function () { return Query_1.Query; } });
__exportStar(require("./InterfaceTypes"), exports);
__exportStar(require("./SqlData"), exports);
