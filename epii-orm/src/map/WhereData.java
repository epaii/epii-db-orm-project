package epii.server.db.map;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import epii.server.db.Types;
import epii.server.db.tools.Tools;
 

public class WhereData extends MapData<WhereData> {
    protected List<String> expData = new ArrayList<>();
    public WhereData() {
        this.thisObj = this;
  }
    public WhereData putExp(String field, String exp) {
        expData.add(field + " = " + exp);
        return this;
    }

    public WhereData putLike(String field, String value) {
        expData.add(field + " like '" + value+"'");
        return this;
    }
    public WhereData putOp(String field,String op, String value) {
        expData.add(field + " "+op +" '" + value+"'");
        return this;
    }
    public WhereData putIn(String field, List condition, Types type){
        String condition_sql = "";
        if (type == Types.INT) {

            condition_sql = "(" + Tools.listToString(condition, ",") + ")";
        } else {

            condition_sql = "(\'" + Tools.listToString(condition, "\',\'") + "\')";
        }
        expData.add(field+" in "+condition_sql);

        return this;
    }
    public WhereData putNotIn(String field, List condition, Types type){
        String condition_sql = "";
        if (type == Types.INT) {

            condition_sql = "(" + Tools.listToString(condition, ",") + ")";
        } else {

            condition_sql = "(\'" + Tools.listToString(condition, "\',\'") + "\')";
        }
        expData.add(field+" not in  "+condition_sql);

        return this;
    }
    public WhereData putRaw(String rawWhere) {
        expData.add(rawWhere);
        return this;
    }

    public List<String> getExpData() {
        return expData;
    }

    public static WhereData fromMap(Map<String, Object> data) {
        WhereData fieldData = new WhereData();
        for (Map.Entry<String, Object> entry : data.entrySet()) {
            fieldData.put(entry.getKey(), entry.getValue());
        }
        return fieldData;
    }

    public static WhereData fromObject(Object data) {
        WhereData fieldData = new WhereData();
        for (Map.Entry<String, Object> entry : Tools.objectToMap(data).entrySet()) {
            fieldData.put(entry.getKey(), entry.getValue());
        }
        return fieldData;
    }

    public static WhereData make(String field, Object value) {
        WhereData data = new WhereData();
        data.put(field, value);
        return data;
    }

    public static WhereData make() {
        WhereData data = new WhereData();
        return data;
    }
}
