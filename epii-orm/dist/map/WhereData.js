"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhereData = void 0;
class WhereData {
    initData(initData) {
        if (initData instanceof Map) {
            this.mapData = initData;
        }
        else if (typeof initData === "object") {
            for (const key in initData) {
                if (Object.prototype.hasOwnProperty.call(initData, key)) {
                    this.mapData.set(key, initData[key]);
                }
            }
        }
    }
    constructor(initData = null) {
        this.mapData = new Map();
        this.expData = [];
        if (initData === null)
            return;
        this.initData(initData);
    }
    putExp(field, exp) {
        this.expData.push(field + " = " + exp);
        return this;
    }
    putLike(field, value) {
        this.expData.push(field + " like '" + value + "'");
        return this;
    }
    // 包含 id in (1,2,3)
    putIn(field, value) {
        let condition_sql = "";
        if (typeof value[0] == "string") {
            for (let index = 0; index < value.length; index++) {
                condition_sql += "'" + value[index] + "'" + ",";
            }
        }
        else {
            for (let index = 0; index < value.length; index++) {
                condition_sql += value[index].toString() + ",";
            }
        }
        condition_sql = condition_sql.slice(0, condition_sql.length - 1);
        this.expData.push(field + " in " + "(" + condition_sql + ")");
        return this;
    }
    //不包含  id not in (1,2,3)
    putNotIn(field, value) {
        let condition_sql = "";
        if (typeof value[0] == "string") {
            for (let index = 0; index < value.length; index++) {
                condition_sql += "'" + value[index] + "'" + ",";
            }
        }
        else {
            for (let index = 0; index < value.length; index++) {
                condition_sql += value[index].toString() + ",";
            }
        }
        condition_sql = condition_sql.slice(0, condition_sql.length - 1);
        this.expData.push(field + " not in " + "(" + condition_sql + ")");
        return this;
    }
    // 有符号的
    putSymbol(field, type, value) {
        this.expData.push(field + type + value);
        return this;
    }
    // 在范围之内
    putBetween(field, sValue, eValue) {
        let condition_sql = field + " between " + sValue + " and " + eValue;
        this.expData.push(condition_sql);
        return this;
    }
    // 不在范围之内
    putNotBetween(field, sValue, eValue) {
        let condition_sql = field + " not between " + sValue + " and " + eValue;
        this.expData.push(condition_sql);
        return this;
    }
    static make(keyOrData = null, value) {
        let out = new WhereData();
        if (keyOrData != null) {
            out.putExp(keyOrData, value);
        }
        return out;
    }
}
exports.WhereData = WhereData;
