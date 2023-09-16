import { BaseMap, PlainObject, WhereSymbol } from "../InterfaceTypes";
export declare class WhereData {
    mapData: BaseMap;
    expData: Array<String>;
    private initData;
    constructor(initData?: PlainObject | BaseMap | null);
    putExp(field: String, exp: String): WhereData;
    putLike(field: String, value: String): WhereData;
    putIn(field: String, value: Array<String | Number>): WhereData;
    putNotIn(field: String, value: Array<String | Number>): WhereData;
    putSymbol(field: String, type: WhereSymbol, value: String): WhereData;
    putBetween(field: String, sValue: String, eValue: String): WhereData;
    putNotBetween(field: String, sValue: String, eValue: String): WhereData;
    static make(keyOrData: string | null | undefined, value: String): WhereData;
}
