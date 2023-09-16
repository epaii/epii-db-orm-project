export type SqlDataParamsType = Array<any>;
export declare class SqlData {
    params: SqlDataParamsType;
    sql: string;
    constructor(sql: string, params: SqlDataParamsType);
    getSql(): string;
    getParams(): SqlDataParamsType;
    setParams(params: SqlDataParamsType): void;
}
