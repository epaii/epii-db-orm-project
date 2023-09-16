"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringBuilder = void 0;
class StringBuilder {
    constructor(str = "") {
        this.strs = [];
        if (str.length > 0)
            this.strs.push(str);
    }
    append(str) {
        this.strs.push(str);
        return this;
    }
    pop() {
        return this.strs.pop();
    }
    toString() {
        return this.strs.join(" ");
    }
}
exports.StringBuilder = StringBuilder;
