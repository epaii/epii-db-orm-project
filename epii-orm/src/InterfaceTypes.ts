import { SqlData } from "./SqlData";
export type FunctionOrNull = Function | null;
export type StringOrNull = string | null;
export type QueryOptionsKeys = 'alias' | 'field' | 'group' | 'having';
export type QueryJoinType = 'left' | 'right' | 'inner';
export interface QueryJoinItem {
    name: string,
    condition: string,
    type: QueryJoinType
}

export interface RowData {
    [key: string]:string
}

export interface IConnection {
    insert(sqlData: SqlData): Promise< Number>,

    update(sqlData: SqlData):Promise< Number>,

    find(sqlData: SqlData):Promise< RowData|null>

    select(sqlData: SqlData):Promise< Array<RowData>>;
    insertAll(sqlData: SqlData):Promise< Number>;
    delete(deleteSql: SqlData):Promise< Number>
}
