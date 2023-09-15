"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const Db_1 = require("./Db");
class Query {
    constructor(name, tablePre = "") {
        this.options = {
            tablePre: "",
            name: "",
            table: "",
            alias: null,
            fields: "*",
            join: [],
            where: {
                and: [],
                or: []
            }
        };
        this.options.name = name;
        this.options.tablePre = tablePre;
        this.options.table = tablePre + name;
    }
    setOption(key, value) {
        this.options[key] = value;
        return this;
    }
    alias(rename) {
        return this.setOption("alias", rename);
    }
    field(fieldString) {
        return this.setOption("field", fieldString);
    }
    group(grouptring) {
        return this.setOption("group", grouptring);
    }
    having(havingString) {
        return this.setOption("having", havingString);
    }
    join(name, condition, type) {
        var _a;
        (_a = this.options.join) === null || _a === void 0 ? void 0 : _a.push({ name, condition, type });
        return this;
    }
    leftJoin(name, condition) {
        return this.join(name, condition, "left");
    }
    rightJoin(name, condition) {
        return this.join(name, condition, "right");
    }
    innerJoin(name, condition) {
        return this.join(name, condition, "inner");
    }
    mkWhere(logic, field, op, condition) {
        if (field == null) {
            this.options.where[logic].push(condition);
        }
        else {
            this.options.where[logic].push({ field, op, condition });
        }
        return this;
    }
    mkWhereByCommon(logic, fieldOrConditionOrWhereData, value = null) {
        if (value === null) {
            if (typeof fieldOrConditionOrWhereData === "string") {
                return this.mkWhere(logic, null, "", fieldOrConditionOrWhereData);
            }
            else {
                this.options.where.and.push(fieldOrConditionOrWhereData);
            }
        }
        else
            return this.mkWhere(logic, fieldOrConditionOrWhereData.toString(), "=", value);
    }
    where(fieldOrConditionOrWhereData, value = null) {
        return this.mkWhereByCommon("and", fieldOrConditionOrWhereData, value);
    }
    whereOp(field, op, condition) {
        return this.where({ field, op, condition });
    }
    whereOr(fieldOrConditionOrWhereData, value = null) {
        return this.mkWhereByCommon("or", fieldOrConditionOrWhereData, value);
    }
    whereLike(field, value) {
        return this.mkWhere("and", field, " like ", value);
    }
    whereBetween(field, start, end) {
        return this.mkWhere("and", field, " between ", start + " and " + end);
    }
    select(conditionOrWhereData = null) {
        if (Db_1.Db.config.connection != null) {
            return Db_1.Db.config.connection.select(SqlData.getsle(this.options));
        }
    }
}
exports.Query = Query;
