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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XXConnectionMysql = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
class XXConnectionMysql {
    constructor(options) {
        this.connectionHandler = null;
        this.then = (r, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.connectionHandler == null) {
                    this.connectionHandler = this.connection();
                }
                this.then = null;
                r(this);
            }
            catch (e) {
                reject(e);
            }
        });
        this.options = options;
    }
    query(sql, params = []) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.connectionHandler) === null || _a === void 0 ? void 0 : _a.query(sql, params));
        });
    }
    execute(sql, params = []) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.connectionHandler) === null || _a === void 0 ? void 0 : _a.execute(sql, params));
        });
    }
    getConnection() {
        return this.connectionHandler;
    }
    connection() {
        if (this.connectionHandler == null) {
            this.connectionHandler = promise_1.default.createPool(this.options);
        }
        return this.connectionHandler;
    }
    insert(sqlData) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let resut = this.changeResult(yield ((_a = this.connectionHandler) === null || _a === void 0 ? void 0 : _a.execute(sqlData.getSql(), sqlData.getParams())));
            return resut.insertId - 0;
        });
    }
    update(sqlData) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let resut = this.changeResult(yield ((_a = this.connectionHandler) === null || _a === void 0 ? void 0 : _a.execute(sqlData.getSql(), sqlData.getParams())));
            return resut.changedRows - 0;
        });
    }
    insertAll(sqlData) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let resut = this.changeResult(yield ((_a = this.connectionHandler) === null || _a === void 0 ? void 0 : _a.execute(sqlData.getSql(), sqlData.getParams())));
            return resut.affectedRows - 0;
        });
    }
    delete(sqlData) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let resut = this.changeResult(yield ((_a = this.connectionHandler) === null || _a === void 0 ? void 0 : _a.execute(sqlData.getSql(), sqlData.getParams())));
            return resut.affectedRows - 0;
        });
    }
    changeResult(result) {
        return result[0];
    }
    find(sqlData) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = yield this.select(sqlData);
            if (list.length === 0)
                return null;
            else
                return list[0];
        });
    }
    select(sqlData) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return this.changeResult(yield ((_a = this.connectionHandler) === null || _a === void 0 ? void 0 : _a.query(sqlData.getSql(), sqlData.getParams())));
        });
    }
}
exports.XXConnectionMysql = XXConnectionMysql;
