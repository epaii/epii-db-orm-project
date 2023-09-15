"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = exports.query = exports.SqlBuilder = void 0;
const Query_1 = require("./Query");
const SqlData_1 = require("./SqlData");
const StringBuilder_1 = require("./libs/StringBuilder");
exports.SqlBuilder = {
    getDeleteSql(options) {
        let sqlBuilder = new StringBuilder_1.StringBuilder();
        let params = [];
        sqlBuilder.append("delete ");
        let table_name = options.table;
        sqlBuilder.append(table_name);
        sqlBuilder.append(" from ");
        buidlerTable(options, sqlBuilder, params);
        buidlerWhere(options, sqlBuilder, params);
        buidlerLimit(options, sqlBuilder, params);
        return new SqlData_1.SqlData(sqlBuilder.toString(), params);
    },
    getUpdateSql(options) {
        let sqlBuilder = new StringBuilder_1.StringBuilder();
        let params = [];
        sqlBuilder.append("update ");
        buidlerTable(options, sqlBuilder, params);
        sqlBuilder.append(" set ");
        let fieldData = new Map(); //options.?
        if (fieldData.size > 0) {
            for (const key in fieldData) {
                sqlBuilder.append(key);
                sqlBuilder.append("=?");
                params.push(fieldData.get(key).toString());
                sqlBuilder.append(", ");
            }
            sqlBuilder.pop();
        }
        let fielExpData = []; //options?
        if (fielExpData.length > 0) {
            if (fieldData.size == 0) {
                sqlBuilder.append("  ");
            }
            else {
                sqlBuilder.append(", ");
            }
            fielExpData.forEach(item => {
                sqlBuilder.append(item);
            });
            sqlBuilder.pop();
        }
        buidlerWhere(exports.query, sqlBuilder, params);
        return new SqlData_1.SqlData(sqlBuilder.toString(), params);
    },
    getSelectSql(options) {
        let sqlBuilder = new StringBuilder_1.StringBuilder();
        let params = [];
        sqlBuilder.append("select ");
        sqlBuilder.append(options.fields.toString());
        sqlBuilder.append(" from ");
        buidlerTable(options, sqlBuilder, params);
        buidlerWhere(options, sqlBuilder, params);
        if (options.hasOwnProperty("group")) {
            sqlBuilder.append(" group by ");
            sqlBuilder.append(options.group.toString());
            if (options.hasOwnProperty("having")) {
                sqlBuilder.append(" having (");
                sqlBuilder.append(options.having.toString());
                sqlBuilder.append(" ) ");
            }
        }
        if (options.hasOwnProperty("order")) {
            sqlBuilder.append(" order by ");
            sqlBuilder.append(options.order.join(","));
        }
        buidlerLimit(options, sqlBuilder, params);
        return new SqlData_1.SqlData(sqlBuilder.toString(), params);
    },
    SqlData: SqlData_1.SqlData, getInsertAllSql(Query, query, List, , FieldData) { }
} > list;
(list.get(0));
SqlData_1.SqlData;
sqlData = getInsertSql(exports.query);
Object[];
params = new Object[list.size()];
for (int; i = 0; i < list.size())
    ;
i++;
{
    List < Object > params_temp;
    new ArrayList();
    for (Map.Entry < String, String > entry; ; )
        : list.get(i).getData().entrySet();
    {
        params_temp.add(entry.getValue());
    }
    params[i] = params_temp.toArray();
}
sqlData.setParams(params);
return sqlData;
SqlData_1.SqlData;
getInsertSql(Query_1.Query, exports.query);
{
    StringBuilder_1.StringBuilder;
    sqlBuilder = new StringBuilder_1.StringBuilder();
    List < Object > params;
    new ArrayList();
    sqlBuilder.append("insert into ");
    sqlBuilder.append(exports.query.getConfig().get("table").toString());
    sqlBuilder.append(" (");
    Map < String, String > fieldData;
    exports.query.getFieldData().getData();
    int;
    l = fieldData.size();
    int;
    ii = 0;
    for (Map.Entry < String, String > entry; ; )
        : fieldData.entrySet();
    {
        sqlBuilder.append(entry.getKey());
        if (ii < l - 1) {
            sqlBuilder.append(",");
        }
        params.add(entry.getValue());
        ii++;
    }
    sqlBuilder.append(" ) VALUES (");
    for (int; i = 0; i < l)
        ;
    i++;
    {
        sqlBuilder.append("?");
        if (i < l - 1) {
            sqlBuilder.append(",");
        }
    }
    sqlBuilder.append(")");
    return new SqlData_1.SqlData(sqlBuilder.toString(), params.toArray());
}
void buidlerTable(Query_1.Query, exports.query, StringBuilder_1.StringBuilder, sqlBuilder, List < Object > params);
{
    String;
    table_name = exports.query.getConfig().get("table").toString();
    sqlBuilder.append(table_name);
    if (exports.query.getAlias() != null && exports.query.getAlias().containsKey(table_name)) {
        sqlBuilder.append(" as ");
        sqlBuilder.append(exports.query.getAlias().get(table_name));
    }
    sqlBuilder.append(" ");
    if (exports.query.getJoin() != null) {
        List < String[] > joins;
        exports.query.getJoin();
        for (int; i = 0; i < joins.size())
            ;
        i++;
        {
            sqlBuilder.append(" ");
            String[];
            join_item = joins.get(i);
            sqlBuilder.append(join_item[2]);
            sqlBuilder.append(" join ");
            sqlBuilder.append(join_item[0]);
            sqlBuilder.append(" on ( ");
            sqlBuilder.append(join_item[1]);
            sqlBuilder.append(" ) ");
        }
    }
}
void buidlerLimit(Query_1.Query, exports.query, StringBuilder_1.StringBuilder, sqlBuilder, List < Object > params);
{
    Map < String, String > config;
    exports.query.getConfig();
    if (config.containsKey("limit")) {
        sqlBuilder.append(" ");
        sqlBuilder.append(config.get("limit").toString());
    }
}
void buidlerWhere(Query_1.Query, exports.query, StringBuilder_1.StringBuilder, sqlBuilder, List < Object > params);
{
    if (exports.query.getWhere() != null) {
        sqlBuilder.append(" where 1=1  ");
        Map < String, List < Object[] >> wheres;
        exports.query.getWhere();
        for (Map.Entry < String, List < Object[] >> entry; ; )
            : wheres.entrySet();
        {
            for (int; i = 0; i < entry.getValue().size())
                ;
            i++;
            {
                sqlBuilder.append(entry.getKey().toString());
                sqlBuilder.append(" ");
                // sqlBuilder.append(entry.getKey().toString());
                if (entry.getValue().get(i).length == 1) {
                    sqlBuilder.append(entry.getValue().get(i)[0].toString());
                }
                else if (entry.getValue().get(i).length == 3) {
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
