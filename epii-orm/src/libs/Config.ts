import { IConnection } from "../InterfaceTypes";

type ConfigType = {
    tablePrefix?: string,
    connection: IConnection | null
}

let config: ConfigType = {
    tablePrefix: "",
    connection: null
}

export { config, ConfigType };