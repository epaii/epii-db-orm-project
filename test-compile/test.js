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
const xx_connection_mysql_1 = require("./xx-connection-mysql");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const xx = new xx_connection_mysql_1.XXConnectionMysql({
            host: "192.168.16.6",
            user: "inner_test_dbu",
            password: "oO8JJXJJvT2rNsnO",
            database: "inner_test",
        });
        yield xx.connection();
    });
}
start();
