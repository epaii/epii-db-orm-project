

# xx-connection-mysql 使用教程

### 一个连接数据库的模块（MySQL数据库）

### 安装

`npm i xx-connection-mysql -s`

### 如何使用

```javascript
// 引入模块
import { XXConnectionMysql } from "xx-connection-mysql";

// 设置数据库的基础配置
const connectionMysql = await new XXConnectionMysql({
  host: "", // ip地址
  user: "", // 用户名
  password: "", // 密码
  database: "", // 数据库名
  multipleStatements: true, // 表示可以一次性执行多条SQL
  connectionLimit:5 //限制连接池数量
});

```