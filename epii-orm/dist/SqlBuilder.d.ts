import { QueryOptions, QueryWhereItem, QueryWhereLogic } from "./InterfaceTypes";
import { SqlData } from "./SqlData";
import { StringBuilder } from "./libs/StringBuilder";
export declare const SqlBuilder: {
    getDeleteSql(options: QueryOptions): SqlData;
    getUpdateSql(options: QueryOptions): SqlData;
    getSelectSql(options: QueryOptions): SqlData;
    getInsertAllSql(options: QueryOptions): SqlData;
    getInsertSql(options: QueryOptions): SqlData;
    buidlerTable(options: QueryOptions, sqlBuilder: StringBuilder): void;
    buidlerLimit(options: QueryOptions, sqlBuilder: StringBuilder): void;
    buidlerWhereWithLogic(logic: QueryWhereLogic, list: Array<string | QueryWhereItem>, sqlBuilder: StringBuilder, params: Array<Object>): void;
    buidlerWhere(options: QueryOptions, sqlBuilder: StringBuilder, params: Array<Object>): void;
};
