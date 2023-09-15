import { DbOrm } from "./Db";
import { StringOrNull, QueryOptionsKeys, QueryJoinType, QueryJoinItem, RowData, QueryOptions, QueryWhereLogic, QueryWhereItem, PlainObject, QueryOrderValue, BaseType, ArrayMapFunction, QueryMapFunction } from "./InterfaceTypes";
import { SqlBuilder } from "./SqlBuilder";
import { FieldData } from "./map/FieldData";




class Query {

    options: QueryOptions = {
        tablePre: "",
        name: "",
        table: "",
        alias: null,
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


    map<T>(fun: ArrayMapFunction<RowData, T>):Query {
        this.rowMapFunction = fun;
        return this;
    }

    setOption(key: QueryOptionsKeys, value: string): Query {
        this.options[key] = value;
        return this;
    }


    alias(rename: string): Query {
        return this.setOption("alias", rename);
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
            startOrLength = 0;
            length = startOrLength;
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

    private mkWhere(logic: QueryWhereLogic, field: StringOrNull, op: string, condition: string):Query {

        if (field == null) {
            this.options.where[logic].push(condition);
        } else {
            this.options.where[logic].push({ field, op, condition });
        }
        return this;
    }


    private mkWhereByCommon(logic: QueryWhereLogic, fieldOrConditionOrWhereData: string | QueryWhereItem, value: StringOrNull = null): Query {
        if (value === null) {
            if (typeof fieldOrConditionOrWhereData === "string") {
                return this.mkWhere(logic, null, "", fieldOrConditionOrWhereData);
            } else {
                this.options.where.and.push(fieldOrConditionOrWhereData);
            }
        } else
            this.mkWhere(logic, fieldOrConditionOrWhereData.toString(), "=", value);
        return this;
    }
    where(fieldOrConditionOrWhereData: string | QueryWhereItem, value: StringOrNull = null): Query {
        return this.mkWhereByCommon("and", fieldOrConditionOrWhereData, value);
    }

    whereId(id: number): Query {
        return this.where("id", id + "");
    }

    whereOp(field: string, op: string, condition: string): Query {
        return this.where({ field, op, condition });
    }

    whereOr(fieldOrConditionOrWhereData: string | QueryWhereItem, value: StringOrNull = null): Query {
        return this.mkWhereByCommon("or", fieldOrConditionOrWhereData, value);
    }


    whereLike(field: string, value: string): Query {
        return this.mkWhere("and", field, " like ", value);
    }
    whereBetween(field: string, start: Number, end: number): Query {
        return this.mkWhere("and", field, " between ", start + " and " + end);
    }

    async select(conditionOrWhereDataOrQueryMapFunction: string | QueryWhereItem | QueryMapFunction | null = null): Promise<Array<RowData>> {
        if (conditionOrWhereDataOrQueryMapFunction != null) {
            if (typeof conditionOrWhereDataOrQueryMapFunction === "function") {
                this.rowMapFunction = conditionOrWhereDataOrQueryMapFunction;
            } else
                this.where(conditionOrWhereDataOrQueryMapFunction);
        }
        let list = await this.db.config.connection!.select(SqlBuilder.getSelectSql(this.options));
        if (this.rowMapFunction != null) {
            let outlist: Array<RowData> = [];
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                outlist.push(await this.rowMapFunction(element, index));
            }
            return outlist;
        } else {
            return list;
        }

    }

    async selectForMap(key: string = "id", field: string | null = null): Promise<Map<string | number, RowData | string>> {
        let list = await this.select();
        let outMap: Map<string | number, RowData | string> = new Map();
        list.forEach(item => {
            outMap.set(key === "id" ? (parseInt(item[key])) : item[key].toString(), field == null ? item : item[field].toString());
        })
        return outMap;
    }


    async find(conditionOrWhereData: string | QueryWhereItem | number | null = null): Promise<RowData | null> {
        if (conditionOrWhereData != null) {
            if (typeof conditionOrWhereData === "number") {
                this.where("id", conditionOrWhereData + "")
            } else {
                this.where(conditionOrWhereData);
            }
        }
        this.limit(1);
        let list = await this.select();
        if (list.length > 0) return list[0];
        return null;
    }

    async value(field: string, dvalue: StringOrNull): Promise<StringOrNull> {
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


}

export { Query }