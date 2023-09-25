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
exports.Query = void 0;
const SqlBuilder_1 = require("./SqlBuilder");
const FieldData_1 = require("./map/FieldData");
const WhereData_1 = require("./map/WhereData");
class Query {
    constructor(db, name, tablePre = "") {
        this.options = {
            tablePre: "",
            name: "",
            table: "",
            alias: new Map(),
            fields: "*",
            join: [],
            where: {
                and: [],
                or: []
            }
        };
        this.rowMapFunction = null;
        this.db = db;
        this.options.name = name;
        this.options.tablePre = tablePre;
        this.options.table = tablePre + name;
    }
    map(fun) {
        this.rowMapFunction = fun;
        return this;
    }
    setOption(key, value) {
        this.options[key] = value;
        return this;
    }
    alias(rename) {
        var _a;
        (_a = this.options.alias) === null || _a === void 0 ? void 0 : _a.set(this.options.table, rename);
        return this;
    }
    field(fieldString) {
        return this.setOption("fields", fieldString);
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
    limit(startOrLength, length = null) {
        if (length == null) {
            length = startOrLength;
            startOrLength = 0;
        }
        this.options.limit = " limit " + startOrLength + "," + length;
        return this;
    }
    order(fieldOrder, order) {
        var _a, _b;
        if (order == null) {
            (_a = this.options.order) === null || _a === void 0 ? void 0 : _a.push(fieldOrder);
        }
        else {
            (_b = this.options.order) === null || _b === void 0 ? void 0 : _b.push(fieldOrder + " " + order);
        }
        return this;
    }
    mkWhere(logic, field, op, condition) {
        if (field == null) {
            this.options.where[logic].push(condition);
        }
        else {
            this.options.where[logic].push({ field, op, condition, typeIdentify: "QueryWhereItem" });
        }
        return this;
    }
    mkWhereByCommon(logic, fieldOrConditionOrWhereData, value = null) {
        if (value === null) {
            if (typeof fieldOrConditionOrWhereData === "string") {
                return this.mkWhere(logic, null, "", fieldOrConditionOrWhereData);
            }
            else {
                if (fieldOrConditionOrWhereData instanceof WhereData_1.WhereData) {
                    if (fieldOrConditionOrWhereData.expData.length > 0) {
                        fieldOrConditionOrWhereData.expData.forEach(item => {
                            this.options.where[logic].push(item.toString());
                        });
                    }
                    if (fieldOrConditionOrWhereData.mapData.size > 0) {
                        for (let [key, item] of fieldOrConditionOrWhereData.mapData) {
                            this.mkWhereByCommon(logic, key, item.toString());
                        }
                    }
                }
                else {
                    if (fieldOrConditionOrWhereData.typeIdentify === "QueryWhereItem") {
                        this.options.where[logic].push(fieldOrConditionOrWhereData);
                    }
                    else {
                        this.where(new WhereData_1.WhereData(fieldOrConditionOrWhereData));
                    }
                }
            }
        }
        else
            this.mkWhere(logic, fieldOrConditionOrWhereData.toString(), "=", value);
        return this;
    }
    where(fieldOrConditionOrWhereData, value = null) {
        return this.mkWhereByCommon("and", fieldOrConditionOrWhereData, value ? (value + "") : null);
    }
    whereIn(field, value) {
        return this.where(new WhereData_1.WhereData().putIn(field, value));
    }
    whereId(id) {
        return this.where("id", id + "");
    }
    whereOp(field, op, condition) {
        return this.where({ field, op, condition, typeIdentify: "QueryWhereItem" });
    }
    whereOr(fieldOrConditionOrWhereData, value = null) {
        return this.mkWhereByCommon("or", fieldOrConditionOrWhereData, value);
    }
    whereLike(field, value) {
        return this.mkWhere("and", field, " like ", value);
    }
    whereBetween(field, start, end) {
        return this.where(field + " between " + start + " and " + end);
    }
    select(conditionOrWhereDataOrQueryMapFunction = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (conditionOrWhereDataOrQueryMapFunction != null) {
                if (typeof conditionOrWhereDataOrQueryMapFunction === "function") {
                    this.rowMapFunction = conditionOrWhereDataOrQueryMapFunction;
                }
                else
                    this.where(conditionOrWhereDataOrQueryMapFunction);
            }
            let list = yield this.db.config.connection.select(SqlBuilder_1.SqlBuilder.getSelectSql(this.options));
            if (this.rowMapFunction != null) {
                let outlist = [];
                for (let index = 0; index < list.length; index++) {
                    const element = list[index];
                    outlist.push(yield this.rowMapFunction(element, index));
                }
                return outlist;
            }
            else {
                return list;
            }
        });
    }
    selectForMap(key = "id", field = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = yield this.select();
            let outMap = new Map();
            list.forEach((item) => {
                outMap.set(key === "id" ? (parseInt(item[key])) : item[key].toString(), field == null ? item : item[field].toString());
            });
            return outMap;
        });
    }
    find(conditionOrWhereData = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (conditionOrWhereData != null) {
                if (typeof conditionOrWhereData === "number") {
                    this.where("id", conditionOrWhereData + "");
                }
                else {
                    this.where(conditionOrWhereData);
                }
            }
            this.limit(1);
            let list = yield this.select();
            if (list.length > 0)
                return list[0];
            return null;
        });
    }
    value(field, dvalue = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = yield this.find();
            if (info == null) {
                return dvalue;
            }
            return info[field];
        });
    }
    data(data) {
        this.options.fieldData = data instanceof FieldData_1.FieldData ? data : FieldData_1.FieldData.make(data);
        return this;
    }
    update(data = null) {
        if (data != null) {
            this.data(data);
        }
        return this.db.config.connection.update(SqlBuilder_1.SqlBuilder.getUpdateSql(this.options));
    }
    insert(data = null) {
        if (data != null) {
            this.data(data);
        }
        return this.db.config.connection.insert(SqlBuilder_1.SqlBuilder.getInsertSql(this.options));
    }
    insertAll(list) {
        this.options.fieldDataList = list.map(item => {
            return item instanceof FieldData_1.FieldData ? item : FieldData_1.FieldData.make(item);
        });
        return this.db.config.connection.insertAll(SqlBuilder_1.SqlBuilder.getInsertAllSql(this.options));
    }
    delete(id = null) {
        if (id != null)
            this.whereId(id);
        if ((this.options.where.and.length == 0) && (this.options.where.or.length == 0)) {
            throw new Error("删除必须设置where语句");
        }
        return this.db.config.connection.delete(SqlBuilder_1.SqlBuilder.getDeleteSql(this.options));
    }
}
exports.Query = Query;
