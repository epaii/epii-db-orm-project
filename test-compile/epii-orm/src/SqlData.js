"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlData = void 0;
class SqlData {
    constructor(sql, params) {
        this.params = [];
        this.sql = "";
        this.sql = sql;
        this.params = params;
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
