
import { DbOrmConfig } from "./InterfaceTypes";
import { Query } from "./Query";

export class DbOrm {
    config: DbOrmConfig = {
        tablePrefix: "",
        connection: null
    }
    name(name: string): Query {
        return new Query(this, name, this.config.tablePrefix);
    }
    table(name: string): Query {
        return new Query(this, name, "");
    }
    constructor(config: DbOrmConfig | null = null) {
        if (config != null)
            this.config = config;
    }

}

export const Db = new DbOrm();

