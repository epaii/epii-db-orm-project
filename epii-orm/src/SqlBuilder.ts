
import { PlainMap, QueryOptions } from "./InterfaceTypes";
import { Query } from "./Query";
import { SqlData } from "./SqlData";
import { StringBuilder } from "./libs/StringBuilder";





export const SqlBuilder = {

  getDeleteSql(options: QueryOptions): SqlData {
    let sqlBuilder: StringBuilder = new StringBuilder();
    let params: Array<Object> = [];
    sqlBuilder.append("delete ");
    let table_name = options.table;
    sqlBuilder.append(table_name);
    sqlBuilder.append(" from ");
    buidlerTable(options, sqlBuilder, params);
    buidlerWhere(options, sqlBuilder, params);
    buidlerLimit(options, sqlBuilder, params);
    return new SqlData(sqlBuilder.toString(), params);
  },

   getUpdateSql(options: QueryOptions): SqlData {
    let sqlBuilder: StringBuilder = new StringBuilder();
    let params: Array<string> = [];
    sqlBuilder.append("update ");
    buidlerTable(options, sqlBuilder, params);
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
    buidlerWhere(query, sqlBuilder, params);
    return new SqlData(sqlBuilder.toString(), params);

  },

   getSelectSql( options: QueryOptions):SqlData {
    let sqlBuilder: StringBuilder = new StringBuilder();
    let params: Array<string> = [];
    sqlBuilder.append("select ");
    sqlBuilder.append(options.fields!.toString());
    sqlBuilder.append(" from ");

    buidlerTable(options, sqlBuilder, params);

    buidlerWhere(options, sqlBuilder, params);

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

    buidlerLimit(options, sqlBuilder, params);

    return new SqlData(sqlBuilder.toString(), params);
  },

 getInsertAllSql(options: QueryOptions,list:Array<FieldData>):SqlData {
    // query.data(list.get(0));
    SqlData sqlData = getInsertSql(query);
Object[] params = new Object[list.size()];

for (int i = 0; i < list.size(); i++) {
  List < Object > params_temp = new ArrayList<>();
  for (Map.Entry < String, String > entry : list.get(i).getData().entrySet()) {
    params_temp.add(entry.getValue());
  }
  params[i] = params_temp.toArray();
}
sqlData.setParams(params);
return sqlData;

  }

  public static SqlData getInsertSql(Query query) {
    StringBuilder sqlBuilder = new StringBuilder();
  List < Object > params = new ArrayList<>();
  sqlBuilder.append("insert into ");
  sqlBuilder.append(query.getConfig().get("table").toString());
  sqlBuilder.append(" (");
  Map < String, String > fieldData = query.getFieldData().getData();
    int l = fieldData.size();
    int ii = 0;
  for (Map.Entry < String, String > entry : fieldData.entrySet()) {

    sqlBuilder.append(entry.getKey());
    if (ii < l - 1) {
      sqlBuilder.append(",");
    }
    params.add(entry.getValue());
    ii++;
  }
  sqlBuilder.append(" ) VALUES (");

  for (int i = 0; i < l; i++) {
    sqlBuilder.append("?");
    if (i < l - 1) {
      sqlBuilder.append(",");
    }
  }
  sqlBuilder.append(")");
  return new SqlData(sqlBuilder.toString(), params.toArray());

}

  private static void buidlerTable(Query query, StringBuilder sqlBuilder, List < Object > params) {
    String table_name = query.getConfig().get("table").toString();
  sqlBuilder.append(table_name);
  if (query.getAlias() != null && query.getAlias().containsKey(table_name)) {
    sqlBuilder.append(" as ");
    sqlBuilder.append(query.getAlias().get(table_name));

  }
  sqlBuilder.append(" ");
  if (query.getJoin() != null) {
    List < String[] > joins = query.getJoin();
    for (int i = 0; i < joins.size(); i++) {
      sqlBuilder.append(" ");
      String[] join_item = joins.get(i);
      sqlBuilder.append(join_item[2]);
      sqlBuilder.append(" join ");
      sqlBuilder.append(join_item[0]);
      sqlBuilder.append(" on ( ");
      sqlBuilder.append(join_item[1]);
      sqlBuilder.append(" ) ");
    }
  }
}

  private static void buidlerLimit(Query query, StringBuilder sqlBuilder, List < Object > params) {
  Map < String, String > config = query.getConfig();
  if (config.containsKey("limit")) {
    sqlBuilder.append(" ");
    sqlBuilder.append(config.get("limit").toString());
  }
}

  private static void buidlerWhere(Query query, StringBuilder sqlBuilder, List < Object > params) {

  if (query.getWhere() != null) {
    sqlBuilder.append(" where 1=1  ");
    Map < String, List < Object[] >> wheres = query.getWhere();
    for (Map.Entry < String, List < Object[] >> entry : wheres.entrySet()) {
      for (int i = 0; i < entry.getValue().size(); i++) {
        sqlBuilder.append(entry.getKey().toString());
        sqlBuilder.append(" ");
        // sqlBuilder.append(entry.getKey().toString());
        if (entry.getValue().get(i).length == 1) {
          sqlBuilder.append(entry.getValue().get(i)[0].toString());
        } else if (entry.getValue().get(i).length == 3) {
          sqlBuilder.append(entry.getValue().get(i)[0].toString());

          sqlBuilder.append(entry.getValue().get(i)[1].toString());
          sqlBuilder.append("? ");
          params.add(entry.getValue().get(i)[2].toString());
        }
        sqlBuilder.append(" ");

      }
    }
  }
}

}
