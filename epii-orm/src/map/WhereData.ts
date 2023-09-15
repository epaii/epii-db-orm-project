import { BaseMap, PlainObject, WhereSymbol } from "../InterfaceTypes";

export class WhereData {
  mapData: BaseMap = new Map();
  expData: Array<String> = [];
  private initData(initData: PlainObject | BaseMap) {
    if (initData instanceof Map) {
      this.mapData = initData;
    } else if (typeof initData === "object") {
      for (const key in initData) {
        if (Object.prototype.hasOwnProperty.call(initData, key)) {
          this.mapData.set(key, initData[key]);
        }
      }
    }
  }
  constructor(initData: PlainObject | BaseMap | null = null) {
    if (initData === null) return;
    this.initData(initData);
  }
  putExp(field: String, exp: String): WhereData {
    this.expData.push(field + " = " + exp);
    return this;
  }
  putLike(field: String, value: String): WhereData {
    this.expData.push(field + " like '" + value + "'");
    return this;
  }
  // 包含 id in (1,2,3)
  putIn(field: String, value: Array<String | Number>): WhereData {
    let condition_sql = "";

    if (typeof value[0] == "string") {
      for (let index = 0; index < value.length; index++) {
        condition_sql += "'" + value[index] + "'" + ",";
      }
    } else {
      for (let index = 0; index < value.length; index++) {
        condition_sql += value[index].toString() + ",";
      }
    }
    condition_sql = condition_sql.slice(0, condition_sql.length - 1);
    this.expData.push(field + " in " + "(" + condition_sql + ")");
    return this;
  }
  //不包含  id not in (1,2,3)
  putNotIn(field: String, value: Array<String | Number>): WhereData {
    let condition_sql = "";

    if (typeof value[0] == "string") {
      for (let index = 0; index < value.length; index++) {
        condition_sql += "'" + value[index] + "'" + ",";
      }
    } else {
      for (let index = 0; index < value.length; index++) {
        condition_sql += value[index].toString() + ",";
      }
    }
    condition_sql = condition_sql.slice(0, condition_sql.length - 1);
    this.expData.push(field + " not in " + "(" + condition_sql + ")");
    return this;
  }

  // 有符号的
  putSymbol(field: String, type: WhereSymbol, value: String): WhereData {
    this.expData.push(field + type + value);
    return this;
  }

  // 在范围之内
  putBetween(field: String, sValue: String, eValue: String): WhereData {
    let condition_sql = field + " between " + sValue + " and " + eValue;
    this.expData.push(condition_sql);
    return this;
  }

  // 不在范围之内
  putNotBetween(field: String, sValue: String, eValue: String): WhereData {
    let condition_sql = field + " not between " + sValue + " and " + eValue;
    this.expData.push(condition_sql);
    return this;
  }

  static make(keyOrData: string | null = null, value: String): WhereData {
    let out = new WhereData();
    if (keyOrData != null) {
      out.putExp(keyOrData, value);
    }
    return out;
  }
}
