import { Db } from './epii-orm/index';

import { XXConnectionMysql } from './xx-connection-mysql';

async function start() {
    const xx = await new XXConnectionMysql({
        host: "192.168.16.6",
        user: "inner_test_dbu",
        password: "oO8JJXJJvT2rNsnO",
        database: "inner_test",
    });
   
    //    let result =  await connection.query("select * from  wsl_user where real_name='朱梦璐' limit 1 ");
    //    console.log(result);
    //    let result1 =  await connection.execute("update     wsl_user set phone='13400405097' where real_name='朱梦璐' limit 1 ");
    //    console.log(result1[0]);
    let rst1 = await xx.getConnection()?.query("insert into wsl_test (name,value) values ('a',1),('b',2)");
    console.log(rst1);
}



Db.config.tablePrefix = "wsl_"

Db.config.connection = new XXConnectionMysql();



let userinfo = await Db.name("test").where("name","张三")?.where({field:"age",op:">",condition:"5"})?.where( " age > 5 ")?.whereOp("age",">","5").find();
Db.name("user").innsertAll([{name:"a",value:1},{name:"a",value:1}]);

start();
