import { FunctionOrNull, IConnection, RowData, SqlData } from "epii-orm";
import mysql from "mysql2/promise";
declare class XXConnectionMysql implements IConnection {
    connectionHandler: mysql.Connection | null;
    options: mysql.ConnectionOptions;
    constructor(options: mysql.ConnectionOptions);
    query<T = any>(sql: string, params?: (string | number)[]): Promise<T>;
    execute<T = any>(sql: string, params?: (string | number)[]): Promise<T>;
    getConnection(): mysql.Connection | null;
    connection(): Promise<mysql.Connection | null>;
    then: FunctionOrNull;
    insert(sqlData: SqlData): Promise<number>;
    update(sqlData: SqlData): Promise<number>;
    insertAll(sqlData: SqlData): Promise<number>;
    delete(sqlData: SqlData): Promise<number>;
    changeResult(result: any[]): any;
    find(sqlData: SqlData): Promise<RowData | null>;
    select(sqlData: SqlData): Promise<RowData[]>;
}
export { XXConnectionMysql };
