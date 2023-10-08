"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlBuilder = void 0;
const SqlData_1 = require("./SqlData");
const StringBuilder_1 = require("./libs/StringBuilder");
exports.SqlBuilder = {
    getDeleteSql(options) {
        let sqlBuilder = new StringBuilder_1.StringBuilder();
        let params = [];
        sqlBuilder.append("delete ");
        let table_name = options.table;
        sqlBuilder.append(table_name);
        sqlBuilder.append(" from ");
        this.buidlerTable(options, sqlBuilder);
        this.buidlerWhere(options, sqlBuilder, params);
        this.buidlerLimit(options, sqlBuilder);
        return new SqlData_1.SqlData(sqlBuilder.toString(), params);
    },
    getUpdateSql(options) {
        var _a, _b;
        let sqlBuilder = new StringBuilder_1.StringBuilder();
        let params = [];
        sqlBuilder.append("update ");
        this.buidlerTable(options, sqlBuilder);
        sqlBuilder.append(" set ");
        let mapData = (_a = options.fieldData) === null || _a === void 0 ? void 0 : _a.mapData;
        if (mapData) {
            if (mapData.size > 0) {
                for (let [key] of mapData) {
                    sqlBuilder.append(key);
                    sqlBuilder.append("=?");
                    params.push(mapData.get(key).toString());
                    sqlBuilder.append(", ");
                }
                sqlBuilder.pop();
            }
        }
        let expData = (_b = options.fieldData) === null || _b === void 0 ? void 0 : _b.expData;
        if (expData && expData.length > 0) {
            if (mapData && mapData.size == 0) {
                sqlBuilder.append("  ");
            }
            else {
                sqlBuilder.append(", ");
            }
            expData.forEach(item => {
                sqlBuilder.append(item.toString());
                sqlBuilder.append(", ");
            });
            sqlBuilder.pop();
        }
        this.buidlerWhere(options, sqlBuilder, params);
        return new SqlData_1.SqlData(sqlBuilder.toString(), params);
    },
    getSelectSql(options) {
        let sqlBuilder = new StringBuilder_1.StringBuilder();
        let params = [];
        sqlBuilder.append("select ");
        sqlBuilder.append(options.fields.toString());
        sqlBuilder.append(" from ");
        this.buidlerTable(options, sqlBuilder);
        this.buidlerWhere(options, sqlBuilder, params);
        if (options.hasOwnProperty("group")) {
            sqlBuilder.append(" group by ");
            sqlBuilder.append(options.group.toString());
            if (options.hasOwnProperty("having")) {
                sqlBuilder.append(" having (");
                sqlBuilder.append(options.having.toString());
                sqlBuilder.append(" ) ");
            }
        }
        if (options.hasOwnProperty("order")) {
            sqlBuilder.append(" order by ");
            sqlBuilder.append(options.order.join(","));
        }
        this.buidlerLimit(options, sqlBuilder);
        return new SqlData_1.SqlData(sqlBuilder.toString(), params);
    },
    getInsertAllSql(options) {
        let fieldDataList = options.fieldDataList;
        if (!fieldDataList || fieldDataList.length == 0)
            throw new Error("insert list data");
        let mapData = fieldDataList[0].mapData;
        let sqlBuilder = new StringBuilder_1.StringBuilder();
        let params = [];
        sqlBuilder.append("insert into ");
        sqlBuilder.append(options.table.toString());
        sqlBuilder.append(" (");
        for (let [key] of mapData) {
            sqlBuilder.append(key);
            sqlBuilder.append(",");
        }
        sqlBuilder.pop();
        sqlBuilder.append(" ) VALUES ");
        fieldDataList === null || fieldDataList === void 0 ? void 0 : fieldDataList.forEach(fieldData => {
            let mapData = fieldData.mapData;
            sqlBuilder.append("(");
            for (let [key] of mapData) {
                sqlBuilder.append("?");
                params.push(mapData.get(key).toString());
                sqlBuilder.append(",");
            }
            sqlBuilder.pop();
            sqlBuilder.append(")");
            sqlBuilder.append(",");
        });
        sqlBuilder.pop();
        return new SqlData_1.SqlData(sqlBuilder.toString(), params);
    },
    getInsertSql(options) {
        // console.log(options);
        var _a;
        let mapData = (_a = options.fieldData) === null || _a === void 0 ? void 0 : _a.mapData;
        if (mapData) {
            let sqlBuilder = new StringBuilder_1.StringBuilder();
            let params = [];
            sqlBuilder.append("insert into ");
            sqlBuilder.append(options.table.toString());
            sqlBuilder.append(" (");
            for (let [key] of mapData) {
                sqlBuilder.append(key);
                sqlBuilder.append(",");
            }
            sqlBuilder.pop();
            sqlBuilder.append(" ) VALUES (");
            for (let [key] of mapData) {
                sqlBuilder.append("?");
                params.push(mapData.get(key).toString());
                sqlBuilder.append(",");
            }
            sqlBuilder.pop();
            sqlBuilder.append(")");
            return new SqlData_1.SqlData(sqlBuilder.toString(), params);
        }
        else {
            throw new Error("please set insert Data");
        }
    },
    buidlerTable(options, sqlBuilder) {
        let table_name = options.table.toString();
        sqlBuilder.append(table_name);
        if (options.alias && options.alias.has(table_name)) {
            sqlBuilder.append(" as ");
            sqlBuilder.append(options.alias.get(table_name));
        }
        sqlBuilder.append(" ");
        if (options.join) {
            for (let i = 0; i < options.join.length; i++) {
                sqlBuilder.append(" ");
                let item = options.join[i];
                sqlBuilder.append(item.type);
                sqlBuilder.append(" join ");
                sqlBuilder.append(options.tablePre + item.name);
                sqlBuilder.append(" on ( ");
                sqlBuilder.append(item.condition);
                sqlBuilder.append(" ) ");
            }
        }
    },
    buidlerLimit(options, sqlBuilder) {
        if (options.limit && options.limit.length > 0) {
            sqlBuilder.append(" ");
            sqlBuilder.append(options.limit.toString());
        }
    },
    buidlerWhereWithLogic(logic, list, sqlBuilder, params) {
        if (list.length > 0) {
            list.forEach(item => {
                sqlBuilder.append(logic).append(" ");
                if (typeof item === "string")
                    sqlBuilder.append(item);
                else {
                    sqlBuilder.append(item.field);
                    sqlBuilder.append(item.op);
                    sqlBuilder.append("? ");
                    params.push(item.condition);
                    sqlBuilder.append(" ");
                }
            });
        }
    },
    buidlerWhere(options, sqlBuilder, params) {
        if (options.where.and.length > 0 || options.where.or.length > 0) {
            sqlBuilder.append(" where 1=1  ");
            this.buidlerWhereWithLogic("and", options.where.and, sqlBuilder, params);
            this.buidlerWhereWithLogic("or", options.where.or, sqlBuilder, params);
        }
    }
};
