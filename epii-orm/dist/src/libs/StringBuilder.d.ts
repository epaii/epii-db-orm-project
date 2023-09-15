export declare class StringBuilder {
    strs: Array<string>;
    constructor(str?: string);
    append(str: string): this;
    pop(): string | undefined;
    toString(): string;
}
