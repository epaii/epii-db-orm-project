export type StringOrNull = string | null;
export type QueryOptionsKeys = 'alias' | 'field' |'group' |'having';
export type QueryJoinType = 'left' |'right'|'inner';
export interface QueryJoinItem {
    name:string,
    condition:string,
    type:QueryJoinType
}
 