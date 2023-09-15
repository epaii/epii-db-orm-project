package epii.server.db.map;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import epii.server.db.tools.Tools;
public class FieldData extends MapData<FieldData> {

    public FieldData() {
          this.thisObj = this;
    }

    public static FieldData fromMap(Map<String, Object> data) {
        FieldData fieldData = new FieldData();
        for (Map.Entry<String, Object> entry : data.entrySet()) {
            fieldData.put(entry.getKey(), entry.getValue());
        }
        return fieldData;
    }

    public static FieldData fromObject(Object data) {
        FieldData fieldData = new FieldData();
        for (Map.Entry<String, Object> entry : Tools.objectToMap(data).entrySet()) {
            fieldData.put(entry.getKey(), entry.getValue());
        }
        return fieldData;
    }

    public static FieldData make(String field, Object value) {
        FieldData data = new FieldData();
        data.put(field, value);
        return data;
    }

    public static FieldData make() {
        FieldData data = new FieldData();
        
        return data;
    }

    protected List<String> expData = new ArrayList<>();

    public void putInc(String field) {
        putInc(field, 1);
    }

    public void putInc(String field, int step) {
        expData.add(field + " = " + field + "+" + step);
    }

    public void putDec(String field) {
        putDec(field, 1);
    }

    public void putDec(String field, int step) {
        expData.add(field + " = " + field + "-" + step);
    }

    public void putExp(String field, String exp) {
        expData.add(field + " = " + exp);
    }

    public List<String> getExpData() {
        return expData;
    }
}
