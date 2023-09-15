
import { PlainMap, QueryOptions, QueryWhereItem, QueryWhereLogic } from "./InterfaceTypes";
import { Query } from "./Query";
import { SqlData } from "./SqlData";
import { StringBuilder } from "./libs/StringBuilder";
import { FieldData } from "./map/FieldData";
import { WhereData } from "./map/WhereData";





export const SqlBuilder = {

  getDeleteSql(options: QueryOptions): SqlData {
    let sqlBuilder: StringBuilder = new StringBuilder();
    let params: Array<Object> = [];
    sqlBuilder.append("delete ");
    let table_name = options.table;
    sqlBuilder.append(table_name);
    sqlBuilder.append(" from ");
    this.buidlerTable(options, sqlBuilder);
    this.buidlerWhere(options, sqlBuilder, params);
    this.buidlerLimit(options, sqlBuilder);
    return new SqlData(sqlBuilder.toString(), params);
  },

  getUpdateSql(options: QueryOptions): SqlData {
    let sqlBuilder: StringBuilder = new StringBuilder();
    let params: Array<string> = [];
    sqlBuilder.append("update ");
    this.buidlerTable(options, sqlBuilder);
    sqlBuilder.append(" set ");
    let fieldData: Map<String, String> = new Map()//options.?
    if (fieldData.size > 0) {
      for (const key in fieldData) {
        sqlBuilder.append(key);
        sqlBuilder.append("=?");
        params.push(fieldData.get(key)!.toString());
        sqlBuilder.append(", ");
      }
      sqlBuilder.pop();
    }


    let fielExpData: string[] = [];//options?
    if (fielExpData.length > 0) {
      if (fieldData.size == 0) {
        sqlBuilder.append("  ");
      } else {
        sqlBuilder.append(", ");
      }
      fielExpData.forEach(item => {
        sqlBuilder.append(item);
      });
      sqlBuilder.pop();
    }
    this.buidlerWhere(options, sqlBuilder, params);
    return new SqlData(sqlBuilder.toString(), params);

  },

  getSelectSql(options: QueryOptions): SqlData {
    let sqlBuilder: StringBuilder = new StringBuilder();
    let params: Array<string> = [];
    sqlBuilder.append("select ");
    sqlBuilder.append(options.fields!.toString());
    sqlBuilder.append(" from ");

    this.buidlerTable(options, sqlBuilder);

    this.buidlerWhere(options, sqlBuilder, params);

    if (options.hasOwnProperty("group")) {
      sqlBuilder.append(" group by ");
      sqlBuilder.append(options.group!.toString());
      if (options.hasOwnProperty("having")) {
        sqlBuilder.append(" having (");
        sqlBuilder.append(options.having!.toString());
        sqlBuilder.append(" ) ");
      }
    }
    if (options.hasOwnProperty("order")) {
      sqlBuilder.append(" order by ");
      sqlBuilder.append(options.order!.join(","));
    }

    this.buidlerLimit(options, sqlBuilder);

    return new SqlData(sqlBuilder.toString(), params);
  },

  getInsertAllSql(options: QueryOptions, list: Array<FieldData>): SqlData {
    // query.data(list.get(0));
    let sqlData = this.getInsertSql(options);
    let params: Array<Object> = [];
    // Object[] params = new Object[list.size()];
    for (let index = 0; index < list.length; index++) {
      let params_temp: Array<Object> = []
      for (const key in list[index]) {
        params_temp.push(list[index][key])
      }
      params[index] = params_temp;
    }

    // for (int i = 0; i < list.size(); i++) {
    //   List < Object > params_temp = new ArrayList<>();
    //   for (Map.Entry < String, String > entry : list.get(i).getData().entrySet()) {
    //     params_temp.add(entry.getValue());
    //   }
    //   params[i] = params_temp.toArray();
    // }
    sqlData.setParams(params);
    return sqlData;

  },

  getInsertSql(options: QueryOptions): SqlData {
    let fieldData: Map<String, String> = new Map();
    if (fieldData.size > 0) {

    let sqlBuilder: StringBuilder = new StringBuilder();
    let params: Array<Object> = [];
    sqlBuilder.append("insert into ");
    sqlBuilder.append(options.table.toString());
    sqlBuilder.append(" (");
 
      for (const key in fieldData) {
        sqlBuilder.append(key);
        sqlBuilder.append(",");
      }
      sqlBuilder.pop();

      sqlBuilder.append(" ) VALUES (");
      for (const key in fieldData) {
        sqlBuilder.append("?");
        params.push(fieldData.get(key)!.toString());
        sqlBuilder.append(",");
      }
      sqlBuilder.pop();
    }

    sqlBuilder.append(")");
    return new SqlData(sqlBuilder.toString(), params);
  }

  },

  buidlerTable(options: QueryOptions, sqlBuilder: StringBuilder) {
    let table_name: string = options.table.toString();
    sqlBuilder.append(table_name);
    if (options.alias && options.alias.has(table_name)) {
      sqlBuilder.append(" as ");
      sqlBuilder.append(options.alias.get(table_name) as string);

    }
    sqlBuilder.append(" ");
    if (options.join) {
      for (let i = 0; i < options.join.length; i++) {
        sqlBuilder.append(" ");
        let item = options.join[i];
        sqlBuilder.append(item.type);
        sqlBuilder.append(" join ");
        sqlBuilder.append(options.tablePre + item.name);
        sqlBuilder.append(" on ( ");
        sqlBuilder.append(item.condition);
        sqlBuilder.append(" ) ");
      }
    }
  },

  buidlerLimit(options: QueryOptions, sqlBuilder: StringBuilder) {
    if (options.limit && options.limit.length > 0) {
      sqlBuilder.append(" ");
      sqlBuilder.append(options.limit.toString());
    }
  },

  buidlerWhereWithLogic(logic: QueryWhereLogic, list: Array<string | QueryWhereItem>, sqlBuilder: StringBuilder, params: Array<Object>) {
    if (list.length > 0) {
      list.forEach(item => {
        sqlBuilder.append(logic).append(" ");
        if (typeof item === "string") sqlBuilder.append(item);
        else {
          sqlBuilder.append(item.field);

          sqlBuilder.append(item.op);
          sqlBuilder.append("? ");
          params.push(item.condition);
          sqlBuilder.append(" ");
        }
      })
    }
  },

  buidlerWhere(options: QueryOptions, sqlBuilder: StringBuilder, params: Array<Object>) {

    if (options.where.and.length > 0 || options.where.or.length > 0) {
      sqlBuilder.append(" where 1=1  ");
      this.buidlerWhereWithLogic("and", options.where.and, sqlBuilder, params);
      this.buidlerWhereWithLogic("or", options.where.or, sqlBuilder, params);
    }
  }

}
