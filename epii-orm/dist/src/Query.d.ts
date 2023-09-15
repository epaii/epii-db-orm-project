import { StringOrNull, QueryOptionsKeys, QueryJoinType, RowData, QueryOptions, QueryWhereItem } from "./InterfaceTypes";
declare class Query {
    options: QueryOptions;
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
    whereOp(field: string, op: string, condition: string): this | undefined;
    whereOr(fieldOrConditionOrWhereData: string | QueryWhereItem, value?: StringOrNull): this | undefined;
    whereLike(field: string, value: string): this;
    whereBetween(field: string, start: Number, end: number): this;
    select(conditionOrWhereData?: string | QueryWhereItem | null): Promise<Array<RowData>>;
}
export { Query };
