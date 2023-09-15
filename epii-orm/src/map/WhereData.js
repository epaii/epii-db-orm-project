"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhereData = void 0;
var WhereData = /** @class */ (function () {
    function WhereData(initData) {
        if (initData === void 0) { initData = null; }
        this.mapData = new Map();
        this.expData = [];
        if (initData === null)
            return;
        this.initData(initData);
    }
    WhereData.prototype.initData = function (initData) {
        if (initData instanceof Map) {
            this.mapData = initData;
        }
        else if (typeof initData === "object") {
            for (var key in initData) {
                if (Object.prototype.hasOwnProperty.call(initData, key)) {
                    this.mapData.set(key, initData[key]);
                }
            }
        }
    };
    WhereData.prototype.putExp = function (field, exp) {
        this.expData.push(field + " = " + exp);
        return this;
    };
    WhereData.prototype.putLike = function (field, value) {
        this.expData.push(field + " like '" + value + "'");
        return this;
    };
    // 包含 id in (1,2,3)
    WhereData.prototype.putIn = function (field, value) {
        var condition_sql = "";
        condition_sql = "(" + value.toString() + ")";
        this.expData.push(field + " in " + condition_sql);
        return this;
    };
    //不包含  id not in (1,2,3)
    WhereData.prototype.putNotIn = function (field, value) {
        var condition_sql = "";
        condition_sql = "(" + value.toString() + ")";
        this.expData.push(field + " not in " + condition_sql);
        return this;
    };
    // 有符号的 
    WhereData.prototype.putSymbol = function (field, type, value) {
        this.expData.push(field + type + value);
        return this;
    };
    // 在范围之内
    WhereData.prototype.putBetween = function (field, sValue, eValue) {
        var condition_sql = field + ' between ' + sValue + ' and ' + eValue;
        this.expData.push(condition_sql);
        return this;
    };
    // 不在范围之内
    WhereData.prototype.putNotBetween = function (field, sValue, eValue) {
        var condition_sql = field + ' not between ' + sValue + ' and ' + eValue;
        this.expData.push(condition_sql);
        return this;
    };
    WhereData.prototype.make = function () {
        var out = new WhereData();
        return out;
    };
    return WhereData;
}());
exports.WhereData = WhereData;
var Where = new WhereData();
console.log(Where);
console.log(Where.make());
// console.log( new WhereData().putIn("id",'1,2,3'))
console.log(new WhereData().putNotBetween("id", '2', '5'));
