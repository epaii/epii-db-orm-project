var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AA = /** @class */ (function () {
    function AA(age) {
        this.age = 0;
        this.age = age;
    }
    AA.prototype.getAage = function () {
        console.log(this.pname());
        return this.age;
    };
    AA.getname = function () {
        return "zhagnsan";
    };
    AA.prototype.pname = function () {
        return "p";
    };
    return AA;
}());
var BB = /** @class */ (function (_super) {
    __extends(BB, _super);
    function BB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BB;
}(AA));
var vara = new AA(11);
console.log(vara.pname());
var varb = new BB(11);
console.log(varb.pname());
