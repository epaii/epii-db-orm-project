package epii.server.db.map;

import java.util.HashMap;
import java.util.Map;

public class MapData<T> {
    protected T thisObj;
    protected Map<String,String> data = new HashMap<>();
    public T put(String field,Object value) {
        this.data.put(field, value.toString());
        return thisObj;
    }
    public T put(String field,String value) {
        this.data.put(field, value);
        return thisObj;
    }
    public T put(String field,Integer value) {
        this.data.put(field, value.toString());
        return thisObj;
    }
    public Map<String, String> getData() {
        return data;
    }
 
}
