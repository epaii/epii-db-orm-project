import { BaseMap, BaseType, PlainObject } from "../InterfaceTypes";


export class FieldData {
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

    put(keyOrData: string | PlainObject | BaseMap, value: BaseType | null = null): FieldData {
        if (value === null) {
            this.initData(keyOrData as PlainObject | BaseMap);
        } else {
            this.mapData.set(keyOrData as string, value);
        }
        return this;
    }

    putInc(field: string, step: number = 1): FieldData {
        this.expData.push(field + " = " + field + "+" + step);
        return this;
    }

    putDec(field: string, step: number = 1): FieldData {
        this.expData.push(field + " = " + field + "-" + step);
        return this;
    }

    putExp(  field:string,   exp:string):FieldData {
        this.expData.push(field + " = " + exp);
        return this;
    }


    static make(keyOrData: string | PlainObject | BaseMap|null =null, value: BaseType | null = null):FieldData{
        let out =  new FieldData();
        if(keyOrData!=null){
            out.put(keyOrData,value);
        }
        return out;
    }
}

 