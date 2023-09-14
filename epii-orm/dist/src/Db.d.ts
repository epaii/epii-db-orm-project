import { ConfigType } from "./libs/Config";
import { Query } from "./Query";
declare const Db: {
    config: ConfigType;
    name(name: string): Query;
    table(name: string): Query;
    setConfig(config: ConfigType): void;
};
export { Db };
