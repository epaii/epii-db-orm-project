import { SqlData } from "./SqlData";
import { FieldData } from "./map/FieldData";
export type FunctionOrNull = Function | null;
export type StringOrNull = string | null;

export type QueryJoinType = 'left' | 'right' | 'inner';
export type BaseType = string | number | boolean;
export type WhereSymbol = '>' | '>=' | '<' | '<=' | '!=' | '<>' | '!>' | '!<'
export interface PlainObject {
    [key: string]: BaseType
}

export type BaseMap = Map<string, BaseType>;
export interface QueryJoinItem {
    name: string,
    condition: string,
    type: QueryJoinType
}



export type RowData = Record<string, string>;

export type QueryWhereLogic = 'and' | 'or';
export interface QueryWhereItem {
    field: string,
    op: string,
    condition: string
}

export type DbOrmConfig = {
    tablePrefix?: string,
    connection: IConnection | null,
    onSql?: Function | null
}

export interface QueryOptions {
    tablePre: string,
    name: string,
    table: string,
    alias?: Map<string, string>,
    fields?: StringOrNull,
    fieldData?: FieldData,
    fieldDataList?: Array<FieldData>,
    group?: StringOrNull,
    having?: StringOrNull,
    join?: Array<QueryJoinItem>,
    order?: Array<string>,
    limit?: StringOrNull,
    where: {
        and: Array<QueryWhereItem | string>,
        or: Array<QueryWhereItem | string>,
    }
}

export type QueryOptionsKeys = 'fields' | 'group' | 'having';

export interface IConnection {
    insert(sqlData: SqlData): Promise<number>,

    update(sqlData: SqlData): Promise<number>,

    find(sqlData: SqlData): Promise<RowData | null>

    select(sqlData: SqlData): Promise<Array<RowData>>;
    insertAll(sqlData: SqlData): Promise<number>;
    delete(deleteSql: SqlData): Promise<number>;
    query<T = any>(sql: string, params: Array<string | number>): Promise<T>;
    execute<T = any>(sql: string, params: Array<string | number>): Promise<T>;
}

export type QueryOrderValue = 'desc' | 'asc';

export interface ArrayMapFunction<S, T> {
    (item: S, index: number): Promise<T>
}

export type QueryMapFunction = ArrayMapFunction<RowData, RowData>;

