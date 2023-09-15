import { BaseMap, BaseType, PlainObject } from "../InterfaceTypes";

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
    putIn(field:String,value:String,type:String):WhereData{
        this.expData.push(field + " " + type + value)
        return this
    }
    make(){
        let out = new WhereData();
    }
}

console.log( new WhereData().putLike("name",'%亚%'))



