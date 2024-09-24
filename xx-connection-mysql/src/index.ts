import { FunctionOrNull, IConnection, RowData, SqlData } from "epii-orm";
 

import mysql from "mysql2/promise";

type OptionsType = "ConnectionOptions" | "PoolOptions" | "Connection" | "PoolConnection";

class XXConnectionMysql implements IConnection {
    connectionHandler: mysql.Pool | mysql.PoolConnection | mysql.Connection | null = null;
    optionType: OptionsType = "PoolOptions";
    options: mysql.ConnectionOptions | mysql.PoolOptions | null = null;
    constructor(optionsOrConnection: mysql.PoolOptions | mysql.ConnectionOptions | mysql.Connection, optionType: OptionsType = "PoolOptions") {
        this.optionType = optionType;
        if (["ConnectionOptions", "PoolOptions"].indexOf(optionType) > -1) {
            this.options = optionsOrConnection as mysql.PoolOptions | mysql.ConnectionOptions;
        } else if (optionType === "PoolConnection") {
            this.connectionHandler = optionsOrConnection as mysql.PoolConnection;
        } else if (optionType === "Connection") {
            this.connectionHandler = optionsOrConnection as mysql.Connection;
        }

    }

    async query<T = any>(sql: string, params: (string | number)[] = []): Promise<T> {

        return await (this.connectionHandler as any)?.query(sql, params)
    }
    async execute<T = any>(sql: string, params: (string | number)[] = []): Promise<T> {
        return await ( this.connectionHandler as any)?.execute(sql, params)
    }
    async createConnection(): Promise<IConnection> {
        if (this.optionType === "PoolOptions") {
            return await new XXConnectionMysql(await (this.connectionHandler as mysql.Pool).getConnection(), "PoolConnection");
        } else if( (this.optionType === "Connection") ||(this.optionType === "ConnectionOptions") ){
            return this;
        }else if(this.optionType === "PoolConnection"){
            return this;
        }
        throw new Error("error");
            
    }
    async connection(): Promise<mysql.Pool | mysql.Connection | null> {
        if (this.connectionHandler == null) {
            if (this.optionType === "PoolOptions")
                this.connectionHandler = mysql.createPool(this.options as mysql.Pool);
            else if (this.optionType === "ConnectionOptions") {
                this.connectionHandler = await mysql.createConnection(this.options as mysql.ConnectionOptions);
            }
        }
        return this.connectionHandler;
    }
    then: FunctionOrNull = async (r: Function, reject: Function) => {
        try {
            if (this.connectionHandler == null) {
                this.connectionHandler = await this.connection();
            }
            this.then = null;
            r(this)
        } catch (e) {
            reject(e)
        }

    }
    async insert(sqlData: SqlData): Promise<number> {
        let resut = this.changeResult(await  this.execute(sqlData.getSql(), sqlData.getParams()));
        return resut.insertId - 0;
    }
    async update(sqlData: SqlData): Promise<number> {
        let resut = this.changeResult(await this.execute(sqlData.getSql(), sqlData.getParams()));
        return resut.changedRows - 0;
    }
    async insertAll(sqlData: SqlData): Promise<number> {
        let resut = this.changeResult(await this.execute(sqlData.getSql(), sqlData.getParams()));
        return resut.affectedRows - 0;
    }
    async delete(sqlData: SqlData): Promise<number> {
        let resut = this.changeResult(await this.execute(sqlData.getSql(), sqlData.getParams()));
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

    release() {
        if (this.optionType === "PoolConnection") {
            (this.connectionHandler as mysql.PoolConnection).release();
        }
    }

    async select(sqlData: SqlData): Promise<RowData[]> {
        return this.changeResult(await this.query(sqlData.getSql(), sqlData.getParams()));
    }

    beginTransaction() {
        
        if ((this.optionType === "ConnectionOptions") || (this.optionType === "PoolConnection") || (this.optionType === "Connection") ) {
            return this.connectionHandler!.beginTransaction();
        }
        throw new Error("Pool is not enable transaction");

    }

    async commit() {
        if ((this.optionType === "ConnectionOptions") || (this.optionType === "PoolConnection") || (this.optionType === "Connection") ) {
            await this.connectionHandler!.commit();
              this.release();
            return;
             
        }
        throw new Error("Pool is not enable transaction");

    }
    async rollback() {
       
        if ((this.optionType === "ConnectionOptions") || (this.optionType === "PoolConnection") || (this.optionType === "Connection")) {
            await this.connectionHandler!.rollback();
            this.release();
            return;
        }
        throw new Error("Pool is not enable transaction");

    }




}

export { XXConnectionMysql }