# epii-db-orm 使用教程

## Db 数据库查询 sql 语句模块

## 安装

```javascript
npm i epii-db-orm -S
```

## 连接数据库

```javascript
import { Db } from "epii-db-orm";

// 设置数据表的前缀
Db.config.tablePrefix = "";
// 设置连接的数据库
Db.config.connection = "";

Db.config.onSql = function (sql) {
  console.log(sql); // 查询的 sql 语句
};
```

### 注意事项：

1.在写查询 sql 语句 之前必须先配置初始内容，连接数据库
2.所有查询 sql 语句返回的结果都是`异步`

### 查询数据

#### 查询单个数据

查询单个数据使用`find`方法：

```javascript
Db.name("test").where("id",1).find()
```

查询到结果就返回查询的结果对象，没有查询到结果就返回 null

#### 查询所有结果

查询数据表中的所有数据使用 `select` 方法

```javascript
// 查询 test 数据表中的所有数据
Db.name("test").select()
```

查询到结果返回的是一个数组

#### 查询某一个字段的所有数据

单独查询某一个字段的所有数据使用 `field`方法 

```javascript
// 查询一个字段
Db.name("test").field("name").select()

// 查询多个字段中间使用逗号分开
Db.name("test").field("name,age").select()
```

### 添加数据

#### 添加单条数据

```javascript
let data = {} // data对象中必须包含数据表中的所有字段
Db.name("test").insert(data)
```

#### 添加多条数据

```javascript
let data = [] 
Db.name("test").insertAll(data)
```

如果是添加一条 data 是个对象  添加多条 data 是个数据

### 更新数据

```javascript
let data = {}
Db.name('test').where("id",13).update(data)
```

### 删除数据

一次只能删除一条数据

```javascript
Db.name("test").delete(12)
```

### 查询表达式

#### where

查询 id = 10 的数据

```javascript
Db.name("test").where("id=10").find()
// 也可以
Db.name("test").where("id",10).find()
// 也可以 
Db.name("test").whereId(10).select()
```

#### whereBetween

查询 id 在 5 到 10 之前的数据

```javascript
// whereBetween(field: string, start: Number, end: number)
Db.name("test").whereBetween("id",5,10).select()

```

#### whereLike

模糊查询

```javascript
Db.name("test").whereLike("name",'苏%').select()
```

#### whereOp

条件查询  查询 id 大于 10 的数据  
whereOp 第二个参数支持  '>' | '>=' | '<' | '<=' | '!=' | '<>' | '!>' | '!<'

```javascript
Db.name("test").whereOp('id','>','10').select()
```

#### limit

limit方法主要用于指定查询和操作的数量。
查询满足条件的两条数据

```javascript
Db.name("test").whereLike("name",'苏%').limit(2).select()
```

对于大数据表，尽量使用limit限制查询结果，否则会导致很大的内存开销和性能问题。

#### alias

alias用于设置当前数据表的别名
给 test 表设置一个表名 test1

```javascript
Db.name("test").alias("test1").whereLike("name",'苏%').limit(2).select()
```

#### group

group 方法通常用于根据一个或多个列对结果集进行分组 。

```javascript
Db.name("test").group("name").select()
```

### WhereData

当查询的语句复杂的话我们还可以使用 WhereData 来实现
**如何使用**
需要先引入

```javascript
import { WhereData } from "epii-db-orm";

// 生成实例对象
const where = await new WhereData();

// 查询 id=5 的数据
where.putExp("id", "5");

// 把实例对象直接传递给where
Db.name("test").where(where).select()
```

#### putExp

查询【 id=5 】 的数据

```javascript
const where = await new WhereData();
where.putExp("id", "5");
console.log(await Db.name("test").where(where).select());
```

#### putLike

模糊查询  相当于 whereLike 

```javascript
where.putLike('name','苏%')
```

#### putIn

查询 id 包含 1,2,3

```javascript
where.putIn('id',[1,2,3])
```

#### putNotIn

查询 id 不包含 1,2,3

```javascript
where.putNotIn('id',[1,2,3])
```

#### putSymbol

条件查询   相当于 whereOp
查询 id>5 的数据

```javascript
where.putSymbol('id','>','5')
```

#### putBetween

在什么范围之间
查询 id 在 3 到 10 之间的数据

```javascript
// putBetween(field, sValue, eValue)

where.putBetween('id','3','10')
```

#### putNotBetween

不在什么范围之间
查询 id 不在 3 到 10 之间的数据

```javascript
where.putNotBetween('id','3','10')
```