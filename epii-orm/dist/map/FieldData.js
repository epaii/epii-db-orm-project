"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldData = void 0;
class FieldData {
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
    put(keyOrData, value = null) {
        if (value === null) {
            this.initData(keyOrData);
        }
        else {
            this.mapData.set(keyOrData, value);
        }
        return this;
    }
    putInc(field, step = 1) {
        this.expData.push(field + " = " + field + "+" + step);
        return this;
    }
    putDec(field, step = 1) {
        this.expData.push(field + " = " + field + "-" + step);
        return this;
    }
    putExp(field, exp) {
        this.expData.push(field + " = " + exp);
        return this;
    }
    static make(keyOrData = null, value = null) {
        let out = new FieldData();
        if (keyOrData != null) {
            out.put(keyOrData, value);
        }
        return out;
    }
}
exports.FieldData = FieldData;
console.log(new FieldData);
