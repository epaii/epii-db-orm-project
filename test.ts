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

start();
