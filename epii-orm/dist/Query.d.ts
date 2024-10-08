import { IDBHandler } from "./Db";
import { StringOrNull, QueryOptionsKeys, QueryJoinType, RowData, QueryOptions, QueryWhereItem, PlainObject, QueryOrderValue, ArrayMapFunction, QueryMapFunction, WhereSymbol, BaseMap } from "./InterfaceTypes";
import { FieldData } from "./map/FieldData";
import { WhereData } from "./map/WhereData";
declare class Query {
    options: QueryOptions;
    db: IDBHandler;
    rowMapFunction: ArrayMapFunction<any, any> | null;
    constructor(db: IDBHandler, name: string, tablePre?: string);
    map<T>(fun: ArrayMapFunction<RowData, T>): Query;
    setOption(key: QueryOptionsKeys, value: string): Query;
    alias(rename: string): Query;
    field(fieldString: string): Query;
    group(grouptring: string): Query;
    having(havingString: string): Query;
    join(name: string, condition: string, type: QueryJoinType): Query;
    leftJoin(name: string, condition: string): Query;
    rightJoin(name: string, condition: string): Query;
    innerJoin(name: string, condition: string): Query;
    limit(startOrLength: number, length?: number | null): Query;
    order(fieldOrder: string, order: QueryOrderValue | null): Query;
    private mkWhere;
    private mkWhereByCommon;
    where(fieldOrConditionOrWhereData: string | QueryWhereItem | WhereData | BaseMap, value?: StringOrNull | number): Query;
    whereIn(field: string, value: Array<string | Number>): Query;
    whereId(id: number): Query;
    whereOp(field: string, op: WhereSymbol, condition: string): Query;
    whereOr(fieldOrConditionOrWhereData: string | QueryWhereItem, value?: StringOrNull): Query;
    whereLike(field: string, value: string): Query;
    whereBetween(field: string, start: Number, end: number): Query;
    select<T = RowData>(conditionOrWhereDataOrQueryMapFunction?: string | QueryWhereItem | QueryMapFunction | null): Promise<Array<T>>;
    selectForMap<T extends Record<string, any> = RowData>(key?: string, field?: string | null): Promise<Map<string | number, T | string>>;
    find<T extends Record<string, any> = RowData>(conditionOrWhereData?: string | QueryWhereItem | number | null): Promise<T | null>;
    value(field: string, dvalue?: StringOrNull): Promise<StringOrNull>;
    data(data: PlainObject | FieldData): Query;
    update(data?: PlainObject | FieldData | null): Promise<Number>;
    insert(data?: PlainObject | FieldData | null): Promise<number>;
    insertAll(list: Array<PlainObject | FieldData>): Promise<number>;
    delete(id?: number | null): Promise<number>;
    count(): Promise<number>;
    column(field: string): Promise<string[]>;
}
export { Query };
