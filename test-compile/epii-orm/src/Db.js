"use strict";
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
}
exports.DbOrm = DbOrm;
exports.Db = new DbOrm();
