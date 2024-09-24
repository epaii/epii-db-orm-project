
import { DbOrmConfig, DbPoolConfig, IConnection, IPool } from "./InterfaceTypes";
import { Query } from "./Query";

export interface IDBHandler {
    getConnection(): IConnection | IPool ;
}


export class DbPool implements IDBHandler {
    config: Partial<DbPoolConfig> = {
        tablePrefix: "",
        connection: null,
        connectionPool: null
    }
    name(name: string): Query {
        return new Query(this, name, this.config.tablePrefix);
    }
    table(name: string): Query {
        return new Query(this, name, "");
    }
    constructor(config: Partial<DbPoolConfig> | null = null) {
        if (config != null)
            this.config = config;
    }

    getConnection(): IConnection | IPool {
        if (this.config.connectionPool) {
            return this.config.connectionPool;
        }
        if (this.config.connection) {
            return this.config.connection;
        }
        throw new Error("connection is null");

    }



    query<T = any>(sql: string, params: Array<string | number>): Promise<T> {
        return this.getConnection().query<T>(sql, params);
    }
    execute<T = any>(sql: string, params: Array<string | number>): Promise<T> {
        return this.getConnection().execute<T>(sql, params);
    }

    initialization(config: Partial<DbPoolConfig>) {
        this.config = Object.assign(this.config, config);
    }

    createConnection():Promise<IConnection>{
        return this.config.connectionPool!.createConnection()
    }
}



export class DbOrm extends DbPool {



    beginTransaction() {
        return this.config.connection!.beginTransaction();
    }
    commit() {
        return this.config.connection!.commit();
    }
    rollback() {
        return this.config.connection!.rollback();
    }
}



export const Db = new DbPool();

export async function DbTransaction(func: (Db:DbOrm) => Promise<any>){
    const tmpDb =   new DbOrm({
        tablePrefix:Db.config.tablePrefix,
        onSql:Db.config.onSql,
        connection:await Db.createConnection()
    });
    await tmpDb.beginTransaction();
    try {
        let ret = await func(tmpDb);
        await tmpDb.commit();
        return ret;
    } catch (error) {
        await tmpDb.rollback();
        throw error;
    } 
}

