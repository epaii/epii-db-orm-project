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
exports.Db = exports.DbOrm = exports.DbPool = void 0;
exports.DbTransaction = DbTransaction;
const Query_1 = require("./Query");
class DbPool {
    name(name) {
        return new Query_1.Query(this, name, this.config.tablePrefix);
    }
    table(name) {
        return new Query_1.Query(this, name, "");
    }
    constructor(config = null) {
        this.config = {
            tablePrefix: "",
            connection: null,
            connectionPool: null
        };
        if (config != null)
            this.config = config;
    }
    getConnection() {
        if (this.config.connectionPool) {
            return this.config.connectionPool;
        }
        if (this.config.connection) {
            return this.config.connection;
        }
        throw new Error("connection is null");
    }
    query(sql, params) {
        return this.getConnection().query(sql, params);
    }
    execute(sql, params) {
        return this.getConnection().execute(sql, params);
    }
    initialization(config) {
        this.config = Object.assign(this.config, config);
    }
    createConnection() {
        return this.config.connectionPool.createConnection();
    }
}
exports.DbPool = DbPool;
class DbOrm extends DbPool {
    beginTransaction() {
        return this.config.connection.beginTransaction();
    }
    commit() {
        return this.config.connection.commit();
    }
    rollback() {
        return this.config.connection.rollback();
    }
}
exports.DbOrm = DbOrm;
exports.Db = new DbPool();
function DbTransaction(func) {
    return __awaiter(this, void 0, void 0, function* () {
        const tmpDb = new DbOrm({
            tablePrefix: exports.Db.config.tablePrefix,
            onSql: exports.Db.config.onSql,
            connection: yield exports.Db.createConnection()
        });
        yield tmpDb.beginTransaction();
        try {
            let ret = yield func(tmpDb);
            yield tmpDb.commit();
            return ret;
        }
        catch (error) {
            yield tmpDb.rollback();
        }
    });
}
