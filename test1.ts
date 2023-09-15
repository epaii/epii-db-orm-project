class AA {
    age:number = 0;
    constructor(age:number) {
        this.age = age;
    }
    getAage() {
        console.log(this.pname());
        return this.age;
    }
    static getname() {
        return "zhagnsan";
    }

     pname():string|undefined{
        return "p";
    }

}

class BB extends AA{

}

const vara:AA = new AA(11);
console.log(vara.pname()!.toString());

const varb:BB = new BB(11);
console.log(varb!.pname());


