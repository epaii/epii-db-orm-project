import { StringOrNull, QueryOptionsKeys, QueryJoinType, QueryJoinItem } from "./InterfaceTypes";
interface QueryWhereItem {
    field: string;
    op: string;
    condition: string;
}
interface Options {
    alias?: StringOrNull;
    field?: StringOrNull;
    group?: StringOrNull;
    having?: StringOrNull;
    join?: Array<QueryJoinItem>;
    where: {
        and: Array<QueryWhereItem | string>;
        or: Array<QueryWhereItem | string>;
    };
}
declare class Query {
    options: Options;
    constructor(name: string, tablePre?: string);
    setOption(key: QueryOptionsKeys, value: string): Query;
    alias(rename: string): Query;
    field(fieldString: string): Query;
    group(grouptring: string): Query;
    having(havingString: string): Query;
    join(name: string, condition: string, type: QueryJoinType): this;
    leftJoin(name: string, condition: string): this;
    rightJoin(name: string, condition: string): this;
    innerJoin(name: string, condition: string): this;
    private mkWhere;
    private mkWhereByCommon;
    where(fieldOrConditionOrWhereData: string | QueryWhereItem, value?: StringOrNull): this | undefined;
    whereOr(fieldOrConditionOrWhereData: string | QueryWhereItem, value?: StringOrNull): this | undefined;
}
export { Query };
