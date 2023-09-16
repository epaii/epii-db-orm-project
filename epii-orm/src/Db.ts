
import { DbOrmConfig } from "./InterfaceTypes";
import { Query } from "./Query";

export class DbOrm {
    config:Partial<DbOrmConfig> = {
        tablePrefix: "",
        connection: null
    }
    name(name: string): Query {
        return new Query(this, name, this.config.tablePrefix);
    }
    table(name: string): Query {
        return new Query(this, name, "");
    }
    constructor(config: Partial< DbOrmConfig> | null = null) {
        if (config != null)
            this.config = config;
    }
    query<T = any>(sql: string, params: Array<string | number>): Promise<T> {
        return this.config.connection!.query<T>(sql, params);
    }
    execute<T = any>(sql: string, params: Array<string | number>): Promise<T> {
        return this.config.connection!.execute<T>(sql, params);
    }

    initialization(config:Partial< DbOrmConfig>){
        this.config = Object.assign(this.config,config);
    }
}

export const Db = new DbOrm();

