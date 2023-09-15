import { BaseMap, BaseType, PlainObject,WhereSymbol } from "../InterfaceTypes";

export class WhereData{
    mapData: BaseMap = new Map();
    expData: Array<String> = [];
    private initData(initData: PlainObject | BaseMap) {
        if (initData instanceof Map) {
            this.mapData = initData;
        } else if (typeof initData === "object") {
            for (const key in initData) {
                if (Object.prototype.hasOwnProperty.call(initData, key)) {
                    this.mapData.set(key, initData[key]);
                }
            }
        }
    }
    constructor(initData: PlainObject | BaseMap | null = null) {
        if (initData === null) return;
        this.initData(initData);
    }
    putExp(field:String,exp:String):WhereData {
        this.expData.push(field + " = " + exp);
        return this;
    }
    putLike(field:String,value:String):WhereData{
        this.expData.push(field + " like '" + value + "'")
        return this
    }
    // 包含 id in (1,2,3)
    putIn(field:String,value:String):WhereData{
        let condition_sql = ""
        condition_sql = "(" + value.toString() + ")"
        this.expData.push(field + " in " + condition_sql)
        return this
    }
    //不包含  id not in (1,2,3)
    putNotIn(field:String,value:String):WhereData{
        let condition_sql = ""
        condition_sql = "(" + value.toString() + ")"
        this.expData.push(field + " not in " + condition_sql)
        return this
    }

    // 有符号的 
    putSymbol(field:String,type:WhereSymbol,value:String){
        this.expData.push(field + type + value)
        return this
    }

    // 在范围之内
    putBetween(field:String,sValue:String,eValue:String){
        let condition_sql = field + ' between ' + sValue + ' and ' + eValue
        this.expData.push(condition_sql)
        return this
    }

    // 不在范围之内
    putNotBetween(field:String,sValue:String,eValue:String){
        let condition_sql = field + ' not between ' + sValue + ' and ' + eValue
        this.expData.push(condition_sql)
        return this
    }

    make():WhereData{
        let out = new WhereData();
        return out
    }
}

const Where = new WhereData()
console.log(Where)
console.log(Where.make())

// console.log( new WhereData().putIn("id",'1,2,3'))
console.log( new WhereData().putNotBetween("id",'2','5'))



