import { FunctionOrNull, IConnection, RowData } from "../epii-orm/src/InterfaceTypes";
import { SqlData } from "../epii-orm/src/SqlData";
import mysql from "mysql2/promise";



class XXConnectionMysql implements IConnection {
    connectionHandler: mysql.Connection | null = null;
    options: mysql.ConnectionOptions;
    constructor(options: mysql.ConnectionOptions) {
        this.options = options;
    }
    async query<T = any>(sql: string, params: (string | number)[] = []): Promise<T> {
        return await this.connectionHandler?.query(sql, params)
    }
    async execute<T = any>(sql: string, params: (string | number)[] = []): Promise<T> {
        return await this.connectionHandler?.execute(sql, params)
    }
    getConnection(): mysql.Connection | null {
        return this.connectionHandler;
    }
    async connection(): Promise<mysql.Connection | null> {
        if (this.connectionHandler == null) {
            this.connectionHandler = await mysql.createConnection(this.options);
        }
        return this.connectionHandler;
    }
    then: FunctionOrNull = async (r: Function, reject: Function) => {
        try {
            if (this.connectionHandler == null) {
                this.connectionHandler = await mysql.createConnection(this.options);
            }
            this.then = null;
            r(this)
        } catch (e) {
            reject(e)
        }

    }
    async insert(sqlData: SqlData): Promise<number> {
        let resut = this.changeResult(await this.connectionHandler?.execute(sqlData.getSql(), sqlData.getParams()));
        return resut.insertId - 0;
    }
    async update(sqlData: SqlData): Promise<number> {
        let resut = this.changeResult(await this.connectionHandler?.execute(sqlData.getSql(), sqlData.getParams()));
        return resut.changedRows - 0;
    }
    async insertAll(sqlData: SqlData): Promise<number> {
        let resut = this.changeResult(await this.connectionHandler?.execute(sqlData.getSql(), sqlData.getParams()));
        return resut.affectedRows - 0;
    }
    async delete(sqlData: SqlData): Promise<number> {
        let resut = this.changeResult(await this.connectionHandler?.execute(sqlData.getSql(), sqlData.getParams()));
        return resut.affectedRows - 0;
    }

    changeResult(result: any[]): any {
        return result[0];
    }

    async find(sqlData: SqlData): Promise<RowData | null> {
        let list = await this.select(sqlData);
        if (list.length === 0) return null;
        else return list[0];
    }
    async select(sqlData: SqlData): Promise<RowData[]> {
        return this.changeResult(await this.connectionHandler?.query(sqlData.getSql(), sqlData.getParams()));
    }




}

export { XXConnectionMysql }