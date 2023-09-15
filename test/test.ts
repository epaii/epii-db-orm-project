

import { Db } from '../epii-orm';
import { XXConnectionMysql } from '../xx-connection-mysql';

async function start() {
    const  connectionMysql = await new XXConnectionMysql({
        host: "192.168.16.6",
        user: "inner_test_dbu",
        password: "oO8JJXJJvT2rNsnO",
        database: "inner_test",
    });
    Db.config.tablePrefix = "wsl_";
    Db.config.connection = connectionMysql;
    Db.config.onSql = function(sql:string,params:Array<Object>){
        console.log(sql);
        console.log(params);
    }





//   let list = await  Db.name("test").where("name","a").where("id","1").select();
//   console.log(list);
  
// let insertid = await Db.name("test").insert({name:"zhangsan",value:"ddddddd"});
// console.log(insertid);

   let delId = await Db.name('test').delete(1) 
   console.log(delId);

  let list = await  Db.name("test").select();
  console.log(list);
  

    
}

 
start();
