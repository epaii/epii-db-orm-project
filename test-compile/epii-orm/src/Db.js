"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Db = void 0;
const Config_1 = require("./libs/Config");
const Query_1 = require("./Query");
const Db = {
    config: Config_1.config,
    name(name) {
        return new Query_1.Query(name, Config_1.config.tablePrefix);
    },
    table(name) {
        return new Query_1.Query(name, "");
    },
    setConfig(config) {
        this.config = config;
    }
};
exports.Db = Db;
