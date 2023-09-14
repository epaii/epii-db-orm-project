export type StringOrNull = string | null;
export type QueryOptionsKeys = 'alias' | 'field' | 'group' | 'having';
export type QueryJoinType = 'left' | 'right' | 'inner';
export interface QueryJoinItem {
    name: string,
    condition: string,
    type: QueryJoinType
}

export interface IConnection {
      insert(  sqlData:String):Int8Array;

    public int update(SqlData sqlData);

    public int insertGetId(SqlData sqlData);

    public <T> T find(SqlData sqlData, Class<T> type);

    public <T> List<T> select(SqlData sqlData, Class<T> type);

    public int[] insertAll(SqlData sqlData);

    public int delete(SqlData deleteSql);

    public <T> T queryForObject(SqlData sqlData, Class<T> type);
}
