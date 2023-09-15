

import { Db } from '../epii-orm';
import { XXConnectionMysql } from '../xx-connection-mysql';
import { DbInit } from './db.init';

async function start() {
  
    await DbInit();




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
