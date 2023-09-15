import { IConnection } from "../InterfaceTypes";
type ConfigType = {
    tablePrefix?: string;
    connection: IConnection | null;
};
declare let config: ConfigType;
export { config, ConfigType };
