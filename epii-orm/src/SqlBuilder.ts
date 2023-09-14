package epii.server.db;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import epii.server.db.map.FieldData;
import epii.server.db.tools.Tools;
 

public class SqlBuilder {

  public static SqlData getDeleteSql(Query query) {
    StringBuilder sqlBuilder = new StringBuilder();
    List<Object> params = new ArrayList<>();
    sqlBuilder.append("delete ");
    String table_name = query.getConfig().get("table").toString();
    sqlBuilder.append(table_name);
    sqlBuilder.append(" from ");
    buidlerTable(query, sqlBuilder, params);
    buidlerWhere(query, sqlBuilder, params);
    buidlerLimit(query, sqlBuilder, params);
    return new SqlData(sqlBuilder.toString(), params.toArray());
  }

  public static SqlData getUpdateSql(Query query) {
    StringBuilder sqlBuilder = new StringBuilder();
    List<Object> params = new ArrayList<>();
    sqlBuilder.append("update ");
    buidlerTable(query, sqlBuilder, params);

    sqlBuilder.append(" set ");

    Map<String, String> fieldData = query.getFieldData().getData();

    int l = fieldData.size();
    int ii = 0;

    for (Map.Entry<String, String> entry : fieldData.entrySet()) {
      sqlBuilder.append(entry.getKey().toString());
      sqlBuilder.append("=?");
      params.add(entry.getValue());
      if (ii < l - 1) {
        sqlBuilder.append(", ");
      }
      ii++;
    }

    List<String> fielExpData = query.getFieldData().getExpData();
    int l1 = fielExpData.size();
    if (l1 > 0) {
      if (fieldData.isEmpty())
        sqlBuilder.append("  ");
      else
        sqlBuilder.append(", ");
    }
    for (int i = 0; i < l1; i++) {
 
      sqlBuilder.append(fielExpData.get(i));
      if (i < l1 - 1) {
         sqlBuilder.append(", ");
      }
    }
    buidlerWhere(query, sqlBuilder, params);

    return new SqlData(sqlBuilder.toString(), params.toArray());

  }

  public static SqlData getSelectSql(Query query) {
    StringBuilder sqlBuilder = new StringBuilder();
    List<Object> params = new ArrayList<>();
    Map<String, String> config = query.getConfig();
    sqlBuilder.append("select ");
    sqlBuilder.append(query.getConfig().get("fields").toString());
    sqlBuilder.append(" from ");

    buidlerTable(query, sqlBuilder, params);

    buidlerWhere(query, sqlBuilder, params);

    if (config.containsKey("group")) {
      sqlBuilder.append(" group by ");
      sqlBuilder.append(config.get("group").toString());
      if (config.containsKey("having")) {
        sqlBuilder.append(" having (");
        sqlBuilder.append(config.get("having").toString());
        sqlBuilder.append(" ) ");
      }
    }
    if (query.getOrder() != null) {
      sqlBuilder.append(" order by ");
      sqlBuilder.append(Tools.listToString(query.getOrder(), ","));
    }

    buidlerLimit(query, sqlBuilder, params);

    return new SqlData(sqlBuilder.toString(), params.toArray());
  }

  public static <T> SqlData getInsertAllSql(Query query, List<FieldData> list) {
    query.data(list.get(0));
    SqlData sqlData = getInsertSql(query);
    Object[] params = new Object[list.size()];

    for (int i = 0; i < list.size(); i++) {
      List<Object> params_temp = new ArrayList<>();
      for (Map.Entry<String, String> entry : list.get(i).getData().entrySet()) {
        params_temp.add(entry.getValue());
      }
      params[i] = params_temp.toArray();
    }
    sqlData.setParams(params);
    return sqlData;

  }

  public static SqlData getInsertSql(Query query) {
    StringBuilder sqlBuilder = new StringBuilder();
    List<Object> params = new ArrayList<>();
    sqlBuilder.append("insert into ");
    sqlBuilder.append(query.getConfig().get("table").toString());
    sqlBuilder.append(" (");
    Map<String, String> fieldData = query.getFieldData().getData();
    int l = fieldData.size();
    int ii = 0;
    for (Map.Entry<String, String> entry : fieldData.entrySet()) {

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

  private static void buidlerTable(Query query, StringBuilder sqlBuilder, List<Object> params) {
    String table_name = query.getConfig().get("table").toString();
    sqlBuilder.append(table_name);
    if (query.getAlias() != null && query.getAlias().containsKey(table_name)) {
      sqlBuilder.append(" as ");
      sqlBuilder.append(query.getAlias().get(table_name));

    }
    sqlBuilder.append(" ");
    if (query.getJoin() != null) {
      List<String[]> joins = query.getJoin();
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

  private static void buidlerLimit(Query query, StringBuilder sqlBuilder, List<Object> params) {
    Map<String, String> config = query.getConfig();
    if (config.containsKey("limit")) {
      sqlBuilder.append(" ");
      sqlBuilder.append(config.get("limit").toString());
    }
  }

  private static void buidlerWhere(Query query, StringBuilder sqlBuilder, List<Object> params) {

    if (query.getWhere() != null) {
      sqlBuilder.append(" where 1=1  ");
      Map<String, List<Object[]>> wheres = query.getWhere();
      for (Map.Entry<String, List<Object[]>> entry : wheres.entrySet()) {
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
