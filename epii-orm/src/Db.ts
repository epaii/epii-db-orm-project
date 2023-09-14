import { config, ConfigType } from "./libs/Config";
import { Query } from "./Query";

const Db = {
    config,
    name(name: string): Query {
        return new Query(name, config.tablePrefix);
    },
    table(name: string): Query {
        return new Query(name, "");
    },
    setConfig(config: ConfigType) {
        this.config = config;
    }
}

export { Db };