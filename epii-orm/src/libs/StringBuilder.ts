export class StringBuilder{
    strs:Array<string>=[];
    constructor(str:string=""){
        if(str.length>0)
        this.strs.push(str);
    }
    append(str:string){
        this.strs.push(str);
        return this;
    }
    toString(){
        return this.strs.join(" ");
    }
}