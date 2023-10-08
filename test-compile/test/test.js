"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const epii_orm_1 = require("../epii-orm");
const db_init_1 = require("./db.init");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_init_1.DbInit)();
        let xlx = yield epii_orm_1.Db.name("test_xlx").find();
        console.log(xlx.id);
    });
}
start();
