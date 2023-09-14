export class SqlData {
    private String sql;
    private Object[] params;

     public SqlData(String sql, Object[] params) {
         this.params = params;
         this.sql = sql;
         if(Db.config.dbListener!=null){
             Db.config.dbListener.onSql(this);
         }
     }

     public String getSql() {
         return sql;
     }

     public Object[] getParams() {
         return params;
     }
     public void setParams(Object[] params) {
         this.params = params;
     }

     public List<Object[]> getBatchParams() {
        List<Object[]> out = new ArrayList<>();

        for(int i=0;i<params.length;i++){
            out.add((Object[])params[i]);
        }

        return out;
    }
}