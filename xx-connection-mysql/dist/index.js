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
    constructor(optionsOrConnection, optionType = "PoolOptions") {
        this.connectionHandler = null;
        this.optionType = "PoolOptions";
        this.options = null;
        this.then = (r, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.connectionHandler == null) {
                    this.connectionHandler = yield this.connection();
                }
                this.then = null;
                r(this);
            }
            catch (e) {
                reject(e);
            }
        });
        this.optionType = optionType;
        if (["ConnectionOptions", "PoolOptions"].indexOf(optionType) > -1) {
            this.options = optionsOrConnection;
        }
        else if (optionType === "PoolConnection") {
            this.connectionHandler = optionsOrConnection;
        }
        else if (optionType === "Connection") {
            this.connectionHandler = optionsOrConnection;
        }
    }
    query(sql_1) {
        return __awaiter(this, arguments, void 0, function* (sql, params = []) {
            var _a;
            return yield ((_a = this.connectionHandler) === null || _a === void 0 ? void 0 : _a.query(sql, params));
        });
    }
    execute(sql_1) {
        return __awaiter(this, arguments, void 0, function* (sql, params = []) {
            var _a;
            return yield ((_a = this.connectionHandler) === null || _a === void 0 ? void 0 : _a.execute(sql, params));
        });
    }
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.optionType === "PoolOptions") {
                return yield new XXConnectionMysql(yield this.connectionHandler.getConnection(), "PoolConnection");
            }
            else if ((this.optionType === "Connection") || (this.optionType === "ConnectionOptions")) {
                return this;
            }
            else if (this.optionType === "PoolConnection") {
                return this;
            }
            throw new Error("error");
        });
    }
    connection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connectionHandler == null) {
                if (this.optionType === "PoolOptions")
                    this.connectionHandler = promise_1.default.createPool(this.options);
                else if (this.optionType === "ConnectionOptions") {
                    this.connectionHandler = yield promise_1.default.createConnection(this.options);
                }
            }
            return this.connectionHandler;
        });
    }
    insert(sqlData) {
        return __awaiter(this, void 0, void 0, function* () {
            let resut = this.changeResult(yield this.execute(sqlData.getSql(), sqlData.getParams()));
            return resut.insertId - 0;
        });
    }
    update(sqlData) {
        return __awaiter(this, void 0, void 0, function* () {
            let resut = this.changeResult(yield this.execute(sqlData.getSql(), sqlData.getParams()));
            return resut.changedRows - 0;
        });
    }
    insertAll(sqlData) {
        return __awaiter(this, void 0, void 0, function* () {
            let resut = this.changeResult(yield this.execute(sqlData.getSql(), sqlData.getParams()));
            return resut.affectedRows - 0;
        });
    }
    delete(sqlData) {
        return __awaiter(this, void 0, void 0, function* () {
            let resut = this.changeResult(yield this.execute(sqlData.getSql(), sqlData.getParams()));
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
    release() {
        if (this.optionType === "PoolConnection") {
            this.connectionHandler.release();
        }
    }
    select(sqlData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.changeResult(yield this.query(sqlData.getSql(), sqlData.getParams()));
        });
    }
    beginTransaction() {
        if ((this.optionType === "ConnectionOptions") || (this.optionType === "PoolConnection") || (this.optionType === "Connection")) {
            return this.connectionHandler.beginTransaction();
        }
        throw new Error("Pool is not enable transaction");
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            if ((this.optionType === "ConnectionOptions") || (this.optionType === "PoolConnection") || (this.optionType === "Connection")) {
                yield this.connectionHandler.commit();
                this.release();
                return;
            }
            throw new Error("Pool is not enable transaction");
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            if ((this.optionType === "ConnectionOptions") || (this.optionType === "PoolConnection") || (this.optionType === "Connection")) {
                yield this.connectionHandler.rollback();
                this.release();
                return;
            }
            throw new Error("Pool is not enable transaction");
        });
    }
}
exports.XXConnectionMysql = XXConnectionMysql;
