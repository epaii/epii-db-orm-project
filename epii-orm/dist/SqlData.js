"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlData = void 0;
const Db_1 = require("./Db");
class SqlData {
    constructor(sql, params) {
        this.params = [];
        this.sql = "";
        this.sql = sql;
        this.params = params;
        if (Db_1.Db.config.onSql) {
            Db_1.Db.config.onSql(sql, params);
        }
    }
    getSql() {
        return this.sql;
    }
    getParams() {
        return this.params;
    }
    setParams(params) {
        this.params = params;
    }
}
exports.SqlData = SqlData;
