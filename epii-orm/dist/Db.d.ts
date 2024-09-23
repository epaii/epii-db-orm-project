import { DbOrmConfig } from "./InterfaceTypes";
import { Query } from "./Query";
export declare class DbOrm {
    config: Partial<DbOrmConfig>;
    name(name: string): Query;
    table(name: string): Query;
    constructor(config?: Partial<DbOrmConfig> | null);
    query<T = any>(sql: string, params: Array<string | number>): Promise<T>;
    execute<T = any>(sql: string, params: Array<string | number>): Promise<T>;
    initialization(config: Partial<DbOrmConfig>): void;
    beginTransaction(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    transaction(func: () => Promise<any>): Promise<any>;
}
export declare const Db: DbOrm;
