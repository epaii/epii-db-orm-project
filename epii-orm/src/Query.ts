import { DbOrm } from "./Db";
import { StringOrNull, QueryOptionsKeys, QueryJoinType, QueryJoinItem, RowData, QueryOptions, QueryWhereLogic, QueryWhereItem, PlainObject, QueryOrderValue, BaseType, ArrayMapFunction, QueryMapFunction, WhereSymbol, BaseMap } from "./InterfaceTypes";
import { SqlBuilder } from "./SqlBuilder";
import { FieldData } from "./map/FieldData";
import { WhereData } from "./map/WhereData";




class Query {

    options: QueryOptions = {
        tablePre: "",
        name: "",
        table: "",
        alias: new Map(),
        fields: "*",
        join: [],
        where: {
            and: [],
            or: []
        }
    }

    db: DbOrm;
    rowMapFunction: ArrayMapFunction<any, any> | null = null;

    constructor(db: DbOrm, name: string, tablePre: string = "") {
        this.db = db;
        this.options.name = name;
        this.options.tablePre = tablePre;
        this.options.table = tablePre + name;

    }


    map<T>(fun: ArrayMapFunction<RowData, T>): Query {
        this.rowMapFunction = fun;
        return this;
    }

    setOption(key: QueryOptionsKeys, value: string): Query {
        this.options[key] = value;
        return this;
    }


    alias(rename: string): Query {
        this.options.alias?.set(this.options.table, rename);
        return this;
    }
    field(fieldString: string): Query {
        return this.setOption("fields", fieldString);
    }
    group(grouptring: string): Query {
        return this.setOption("group", grouptring);
    }
    having(havingString: string): Query {
        return this.setOption("having", havingString);
    }
    join(name: string, condition: string, type: QueryJoinType): Query {
        this.options.join?.push({ name, condition, type });
        return this;
    }
    leftJoin(name: string, condition: string): Query {
        return this.join(name, condition, "left");
    }

    rightJoin(name: string, condition: string): Query {
        return this.join(name, condition, "right");
    }

    innerJoin(name: string, condition: string): Query {
        return this.join(name, condition, "inner");
    }
    limit(startOrLength: number, length: number | null = null): Query {
        if (length == null) {
            length = startOrLength;
            startOrLength = 0;
        }
        this.options.limit = " limit " + startOrLength + "," + length;
        return this;
    }

    order(fieldOrder: string, order: QueryOrderValue | null): Query {
        if (order == null) {
            this.options.order?.push(fieldOrder);
        } else {
            this.options.order?.push(fieldOrder + " " + order);
        }
        return this;
    }

    private mkWhere(logic: QueryWhereLogic, field: StringOrNull, op: string, condition: string): Query {

        if (field == null) {
            this.options.where[logic].push(condition);
        } else {
            this.options.where[logic].push({ field, op, condition, typeIdentify: "QueryWhereItem" });
        }
        return this;
    }


    private mkWhereByCommon(logic: QueryWhereLogic, fieldOrConditionOrWhereData: string | QueryWhereItem | WhereData | BaseMap, value: StringOrNull = null): Query {
        if (value === null) {
            if (typeof fieldOrConditionOrWhereData === "string") {
                return this.mkWhere(logic, null, "", fieldOrConditionOrWhereData);
            } else {
                if (fieldOrConditionOrWhereData instanceof WhereData) {
                    if (fieldOrConditionOrWhereData.expData.length > 0) {
                        fieldOrConditionOrWhereData.expData.forEach(item => {
                            this.options.where[logic].push(item.toString());

                        })
                    }
                    if (fieldOrConditionOrWhereData.mapData.size > 0) {
                        for (let [key, item] of fieldOrConditionOrWhereData.mapData) {
                            this.mkWhereByCommon(logic, key, item.toString());
                        }
                    }
                } else {
                    if ((fieldOrConditionOrWhereData as QueryWhereItem).typeIdentify === "QueryWhereItem") {
                        this.options.where[logic].push(fieldOrConditionOrWhereData as QueryWhereItem);
                    } else {
                        this.where(new WhereData(fieldOrConditionOrWhereData as BaseMap));
                    }
                }

            }
        } else
            this.mkWhere(logic, fieldOrConditionOrWhereData.toString(), "=", value);
        return this;
    }
    where(fieldOrConditionOrWhereData: string | QueryWhereItem | WhereData | BaseMap, value: StringOrNull | number = null): Query {
        return this.mkWhereByCommon("and", fieldOrConditionOrWhereData, value ? (value + "") : null);
    }

    whereIn(field: string, value: Array<string | Number>) {
        return this.where(new WhereData().putIn(field, value));
    }

    whereId(id: number): Query {
        return this.where("id", id + "");
    }

    whereOp(field: string, op: WhereSymbol, condition: string): Query {
        return this.where({ field, op, condition, typeIdentify: "QueryWhereItem" });
    }

    whereOr(fieldOrConditionOrWhereData: string | QueryWhereItem, value: StringOrNull = null): Query {
        return this.mkWhereByCommon("or", fieldOrConditionOrWhereData, value);
    }


    whereLike(field: string, value: string): Query {
        return this.mkWhere("and", field, " like ", value);
    }
    whereBetween(field: string, start: Number, end: number): Query {
        return this.where(field + " between " + start + " and " + end);
    }

    async select<T = RowData>(conditionOrWhereDataOrQueryMapFunction: string | QueryWhereItem | QueryMapFunction | null = null): Promise<Array<T>> {
        if (conditionOrWhereDataOrQueryMapFunction != null) {
            if (typeof conditionOrWhereDataOrQueryMapFunction === "function") {
                this.rowMapFunction = conditionOrWhereDataOrQueryMapFunction;
            } else
                this.where(conditionOrWhereDataOrQueryMapFunction);
        }
        let list = await this.db.config.connection!.select(SqlBuilder.getSelectSql(this.options));
        if (this.rowMapFunction != null) {
            let outlist: Array<T> = [];
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                outlist.push(await this.rowMapFunction(element, index));
            }
            return outlist;
        } else {
            return list as T[];
        }

    }

    async selectForMap<T extends Record<string, any> = RowData>(key: string = "id", field: string | null = null): Promise<Map<string | number, T | string>> {
        let list = await this.select<T>();
        let outMap: Map<string | number, T | string> = new Map();
        list.forEach((item: T) => {
            outMap.set(key === "id" ? (parseInt(item[key])) : item[key].toString(), field == null ? item : item[field].toString());
        })
        return outMap;
    }


    async find<T extends Record<string, any> = RowData>(conditionOrWhereData: string | QueryWhereItem | number | null = null): Promise<T | null> {
        if (conditionOrWhereData != null) {
            if (typeof conditionOrWhereData === "number") {
                this.where("id", conditionOrWhereData + "")
            } else {
                this.where(conditionOrWhereData);
            }
        }
        this.limit(1);
        let list = await this.select<T>();
        if (list.length > 0) return list[0];
        return null;
    }

    async value(field: string, dvalue: StringOrNull = null): Promise<StringOrNull> {
        let info = await this.find();
        if (info == null) {
            return dvalue;
        }
        return info[field];
    }

    data(data: PlainObject | FieldData): Query {
        this.options.fieldData = data instanceof FieldData ? data : FieldData.make(data);
        return this;
    }
    update(data: PlainObject | FieldData | null = null): Promise<Number> {
        if (data != null) {
            this.data(data);
        }
        return this.db.config.connection!.update(SqlBuilder.getUpdateSql(this.options));

    }

    insert(data: PlainObject | FieldData | null = null): Promise<number> {
        if (data != null) {
            this.data(data);
        }
        return this.db.config.connection!.insert(SqlBuilder.getInsertSql(this.options));
    }

    insertAll(list: Array<PlainObject | FieldData>): Promise<number> {
        this.options.fieldDataList = list.map(item => {
            return item instanceof FieldData ? item : FieldData.make(item);
        });
        return this.db.config.connection!.insertAll(SqlBuilder.getInsertAllSql(this.options));
    }


    delete(id: number | null = null): Promise<number> {
        if (id != null)
            this.whereId(id);
        if ((this.options.where.and.length == 0) && (this.options.where.or.length == 0)) {
            throw new Error("删除必须设置where语句");
        }
        return this.db.config.connection!.delete(SqlBuilder.getDeleteSql(this.options));
    }
    async count(): Promise<number> {
        return parseInt((await this.field(" count(*) as _total_num ").value("_total_num")) as string) - 0;
    }

    async column(field: string):Promise<string[]> {
        return (await this.select()).map(item => item[field]);
    }

}

export { Query }