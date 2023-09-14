export type SqlDataParamsType = Array<any>;

export class SqlData {
    params: SqlDataParamsType = [];
    sql: string = "";
    constructor(sql: string, params: SqlDataParamsType) {
        this.sql = sql;
        this.params = params;
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