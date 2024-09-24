import { FunctionOrNull, IConnection, RowData, SqlData } from "epii-orm";
import mysql from "mysql2/promise";
type OptionsType = "ConnectionOptions" | "PoolOptions" | "Connection" | "PoolConnection";
declare class XXConnectionMysql implements IConnection {
    connectionHandler: mysql.Pool | mysql.PoolConnection | mysql.Connection | null;
    optionType: OptionsType;
    options: mysql.ConnectionOptions | mysql.PoolOptions | null;
    constructor(optionsOrConnection: mysql.PoolOptions | mysql.ConnectionOptions | mysql.Connection, optionType?: OptionsType);
    query<T = any>(sql: string, params?: (string | number)[]): Promise<T>;
    execute<T = any>(sql: string, params?: (string | number)[]): Promise<T>;
    createConnection(): Promise<IConnection>;
    connection(): Promise<mysql.Pool | mysql.Connection | null>;
    then: FunctionOrNull;
    insert(sqlData: SqlData): Promise<number>;
    update(sqlData: SqlData): Promise<number>;
    insertAll(sqlData: SqlData): Promise<number>;
    delete(sqlData: SqlData): Promise<number>;
    changeResult(result: any[]): any;
    find(sqlData: SqlData): Promise<RowData | null>;
    release(): void;
    select(sqlData: SqlData): Promise<RowData[]>;
    beginTransaction(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
export { XXConnectionMysql };
