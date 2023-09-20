import { BaseMap, PlainObject, WhereSymbol } from "../InterfaceTypes";
export declare class WhereData {
    mapData: BaseMap;
    expData: Array<string>;
    private initData;
    constructor(initData?: PlainObject | BaseMap | null);
    put(field: string, value: string): WhereData;
    putExp(field: string, exp: string): WhereData;
    putLike(field: string, value: string): WhereData;
    putIn(field: string, value: Array<string | Number>): WhereData;
    putNotIn(field: string, value: Array<string | Number>): WhereData;
    putSymbol(field: string, type: WhereSymbol, value: string): WhereData;
    putBetween(field: string, sValue: string, eValue: string): WhereData;
    putNotBetween(field: string, sValue: string, eValue: string): WhereData;
    static make(keyOrData: string | null | undefined, value: string): WhereData;
}
