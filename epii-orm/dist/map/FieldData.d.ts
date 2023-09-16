import { BaseMap, BaseType, PlainObject } from "../InterfaceTypes";
export declare class FieldData {
    mapData: BaseMap;
    expData: Array<String>;
    private initData;
    constructor(initData?: PlainObject | BaseMap | null);
    put(keyOrData: string | PlainObject | BaseMap, value?: BaseType | null): FieldData;
    putInc(field: string, step?: number): FieldData;
    putDec(field: string, step?: number): FieldData;
    putExp(field: string, exp: string): FieldData;
    static make(keyOrData?: string | PlainObject | BaseMap | null, value?: BaseType | null): FieldData;
}
