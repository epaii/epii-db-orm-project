import { Db } from "../epii-orm";
import { XXConnectionMysql } from "../xx-connection-mysql";

export async function DbInit() {
    const connectionMysql = await new XXConnectionMysql({
        host: "192.168.16.6",
        user: "inner_test_dbu",
        password: "oO8JJXJJvT2rNsnO",
        database: "inner_test",
    });
    Db.initialization({
        tablePrefix: "wsl_",
        connection: connectionMysql,
        onSql: function (sql: string, params: Array<Object>) {
            console.log(sql);
            console.log(params);
        }
    })

}