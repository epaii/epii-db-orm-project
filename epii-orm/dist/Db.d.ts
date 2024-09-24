import { DbPoolConfig, IConnection, IPool } from "./InterfaceTypes";
import { Query } from "./Query";
export interface IDBHandler {
    getConnection(): IConnection | IPool;
}
export declare class DbPool implements IDBHandler {
    config: Partial<DbPoolConfig>;
    name(name: string): Query;
    table(name: string): Query;
    constructor(config?: Partial<DbPoolConfig> | null);
    getConnection(): IConnection | IPool;
    query<T = any>(sql: string, params: Array<string | number>): Promise<T>;
    execute<T = any>(sql: string, params: Array<string | number>): Promise<T>;
    initialization(config: Partial<DbPoolConfig>): void;
    createConnection(): Promise<IConnection>;
}
export declare class DbOrm extends DbPool {
    beginTransaction(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
export declare const Db: DbPool;
export declare function DbTransaction(func: (Db: DbOrm) => Promise<any>): Promise<any>;
