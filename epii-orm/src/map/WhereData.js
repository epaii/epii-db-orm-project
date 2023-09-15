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
    WhereData.prototype.putIn = function (field, value, type) {
        this.expData.push(field + " " + type + value);
        return this;
    };
    WhereData.prototype.make = function () {
        var out = new WhereData();
    };
    return WhereData;
}());
exports.WhereData = WhereData;
console.log(new WhereData().putLike("name", '%亚%'));
