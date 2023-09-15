import { Db, DbOrm } from "./Db";

export type SqlDataParamsType = Array<any>;

export class SqlData {
    params: SqlDataParamsType = [];
    sql: string = "";
    constructor(sql: string, params: SqlDataParamsType) {
        this.sql = sql;
        this.params = params;
        if (Db.config.onSql) {
            Db.config.onSql(sql, params);
        }

    }
    getSql(): string {
        return this.sql;
    }

    getParams(): SqlDataParamsType {
        return this.params;
    }
    setParams(params: SqlDataParamsType) {
        this.params = params;
    }
}