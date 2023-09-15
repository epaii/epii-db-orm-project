"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlData = void 0;
var SqlData = /** @class */ (function () {
    function SqlData(sql, params) {
        this.params = [];
        this.sql = "";
        this.sql = sql;
        this.params = params;
    }
    SqlData.prototype.getSql = function () {
        return this.sql;
    };
    SqlData.prototype.getParams = function () {
        return this.params;
    };
    SqlData.prototype.setParams = function (params) {
        this.params = params;
    };
    return SqlData;
}());
exports.SqlData = SqlData;
