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
exports.DbInit = void 0;
const epii_orm_1 = require("../epii-orm");
const src_1 = require("../xx-connection-mysql/src");
function DbInit() {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionMysql = yield new src_1.XXConnectionMysql({
            host: "192.168.16.6",
            user: "inner_test_dbu",
            password: "oO8JJXJJvT2rNsnO",
            database: "inner_test",
            connectionLimit: 5
        });
        epii_orm_1.Db.initialization({
            tablePrefix: "wsl_",
            connection: connectionMysql,
            onSql: function (sql, params) {
                console.log(sql);
                console.log(params);
            }
        });
    });
}
exports.DbInit = DbInit;
