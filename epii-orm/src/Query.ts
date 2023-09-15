import { Db } from "./Db";
import { StringOrNull, QueryOptionsKeys, QueryJoinType, QueryJoinItem, RowData, QueryOptions, QueryWhereLogic, QueryWhereItem } from "./InterfaceTypes";




class Query {

    options: QueryOptions = {
        tablePre:"",
        name:"",
        table:"",
        alias: null,
        fields: "*",
        join: [],
        where: {
            and: [],
            or: []
        }
    }

    constructor(name: string, tablePre: string = "") {
        this.options.name = name;
        this.options.tablePre = tablePre;
        this.options.table = tablePre+name;
    }

    setOption(key: QueryOptionsKeys, value: string): Query {
        this.options[key] = value;
        return this;
    }


    alias(rename: string): Query {
        return this.setOption("alias", rename);
    }
    field(fieldString: string): Query {
        return this.setOption("field", fieldString);
    }
    group(grouptring: string): Query {
        return this.setOption("group", grouptring);
    }
    having(havingString: string): Query {
        return this.setOption("having", havingString);
    }
    join(name: string, condition: string, type: QueryJoinType) {
        this.options.join?.push({ name, condition, type });
        return this;
    }
    leftJoin(name: string, condition: string) {
        return this.join(name, condition, "left");
    }

    rightJoin(name: string, condition: string) {
        return this.join(name, condition, "right");
    }

    innerJoin(name: string, condition: string) {
        return this.join(name, condition, "inner");
    }

    private mkWhere(logic: QueryWhereLogic, field: StringOrNull, op: string, condition: string) {

        if (field == null) {
            this.options.where[logic].push(condition);
        } else {
            this.options.where[logic].push({ field, op, condition });
        }
        return this;
    }


    private mkWhereByCommon(logic: QueryWhereLogic, fieldOrConditionOrWhereData: string | QueryWhereItem, value: StringOrNull = null) {
        if (value === null) {
            if (typeof fieldOrConditionOrWhereData === "string") {
                return this.mkWhere(logic, null, "", fieldOrConditionOrWhereData);
            } else {
                this.options.where.and.push(fieldOrConditionOrWhereData);
            }
        } else
            return this.mkWhere(logic, fieldOrConditionOrWhereData.toString(), "=", value);
    }
    where(fieldOrConditionOrWhereData: string | QueryWhereItem, value: StringOrNull = null) {
        return this.mkWhereByCommon("and", fieldOrConditionOrWhereData, value);
    }

    whereOp(field:string,op:string,condition:string){
        return this.where({field,op,condition});
    }

    whereOr(fieldOrConditionOrWhereData: string | QueryWhereItem, value: StringOrNull = null) {
        return this.mkWhereByCommon("or", fieldOrConditionOrWhereData, value);
    }


    whereLike(field: string, value: string) {
        return this.mkWhere("and", field, " like ", value);
    }
    whereBetween(field: string, start: Number, end: number) {
        return this.mkWhere("and", field, " between ", start + " and " + end);
    }

    select(conditionOrWhereData: string | QueryWhereItem | null = null): Promise<Array<RowData>> {
        if(Db.config.connection !=null){
            return Db.config.connection.select(SqlData.getsle(this.options));
        }
        
    }




}

export { Query }