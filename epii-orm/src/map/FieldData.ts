

const FieldData = {
    fromMap(fieldName:String,value:String){
        let field = new Map();
        field.set(fieldName,value)
        return field
    },
    fromObject(data:Object){
        let field = new Map();
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                // field.set(key:String,data[key])
            }
        }

    }
}

console.log(FieldData.fromMap("name","zhangsan"))