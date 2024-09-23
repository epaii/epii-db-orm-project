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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Db = exports.DbOrm = void 0;
const Query_1 = require("./Query");
class DbOrm {
    name(name) {
        return new Query_1.Query(this, name, this.config.tablePrefix);
    }
    table(name) {
        return new Query_1.Query(this, name, "");
    }
    constructor(config = null) {
        this.config = {
            tablePrefix: "",
            connection: null
        };
        if (config != null)
            this.config = config;
    }
    query(sql, params) {
        return this.config.connection.query(sql, params);
    }
    execute(sql, params) {
        return this.config.connection.execute(sql, params);
    }
    initialization(config) {
        this.config = Object.assign(this.config, config);
    }
    beginTransaction() {
        return this.config.connection.beginTransaction();
    }
    commit() {
        return this.config.connection.commit();
    }
    rollback() {
        return this.config.connection.rollback();
    }
    transaction(func) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.beginTransaction();
            try {
                let ret = yield func();
                yield this.commit();
                return ret;
            }
            catch (error) {
                yield this.rollback();
            }
        });
    }
}
exports.DbOrm = DbOrm;
exports.Db = new DbOrm();
