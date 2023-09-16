

import { Db } from '../epii-orm';
import { XXConnectionMysql } from '../xx-connection-mysql';
import { DbInit } from './db.init';

async function start() {

    await DbInit();





    // let insertid = await Db.name("test_xlx").insert({name:"zhangsan",value:"ddddddd"});
    // console.log(insertid);

    //    let delId = await Db.name('test_xlx').delete(1) 
    //    console.log(delId);

    // let list = await  Db.name("test_xlx").select();
    // console.log(list);

    //   let list = await  Db.name("test_xlx").where("name","a").where("id","1").select();
    //   console.log(list);

    // let list = await Db.name("test_xlx").select()
    // let list = await Db.name("test_xlx").field('id,name').select()
    // let list = await Db.name("test_xlx").field('id,name').selectForMap("name")
    // let list = await Db.name("test_xlx").insertAll([{
    //     name:'ceshi1',value:'ceshi111'
    // },{
    //     name:'ceshi2',value:'ceshi222'
    // }])
    // let list = await Db.name("test_xlx").select(async function(item,index){??
    //     return item.name+'--';
    // })
    // let list = await Db.name("test_xlx").where('name','aaaa').update({name:"ceshi0"})
      // await Db.name("test_xlx").whereOp("id",">","1").update({value:"123465"})

      type TestXlx ={
         id:number,
         name:string,
         value:string;
      }

      let xlx:TestXlx|null = await Db.name("test_xlx").find<TestXlx>();
      console.log(xlx!.id);
      
    
    
    
    
    
    
    
    
    
    
    
    
    
       let list = await Db.name('test_xlx').select();
    console.log(list);
}


start();
