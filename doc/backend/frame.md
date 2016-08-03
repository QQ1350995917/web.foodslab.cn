## [返回首页](../index.md)
## 请求菜单
#### 描述
- 根据用户权限请求相应的菜单

#### 请求地址
- http://localhost:8080/menus

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|managerId      |      |String    |否| |描述|

示例：无
```json
{
    "managerId": "xxx"
}
```
备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|04|2|method   |data     |String    |否	|    |数据元素-方法名称|
|05|2|positionId|data     |String    |否	|    |数据元素-位置ID|
|06|2|level     |data     |int       |否	|    |数据元素-级别|
|07|2|createTime|data     |long      |否	|    |数据元素-创建时间|
|08|2|menuId    |data     |String    |否	|    |数据元素-ID|
|09|2|pId       |data     |String    |否	|    |数据元素-PID|
|10|2|updateTime|data     |long      |否	|    |数据元素-更新时间|
|11|2|label     |data     |String    |否	|    |数据元素-显示名称|
|12|2|queue     |data     |int       |否	|    |数据元素-序号|
|13|2|status    |data     |int       |否	|    |数据元素-状态|

示例：无

```json
{
    "code": 0,
    "data": [
        {
            "method": "sys_status",
            "positionId": "51bf4162-5270-11e6-8311-1cae145b8cab",
            "level": 0,
            "createTime": 1470103148000,
            "menuId": "468c67fc-b88e-47d9-b8b5-02a586d0919a",
            "pId": "468c67fc-b88e-47d9-b8b5-02a586d0919a",
            "updateTime": 1470103148000,
            "label": "系统状态",
            "queue": 0,
            "status": 2
        }
    ],
    "message": "this is tip message!"
}
```
备注：无

## 退出登录
#### 描述
- 用户点击退出按钮调用的接口

#### 请求地址
- http://localhost:8080/login/exit

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|managerId      |      |String    |否| |描述|

示例：无
```json
{
    "managerId": "xxx"
}
```
备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|key      |Pkey      |String    |否| |描述|

示例：无

```json
{
    "stringKey": "BeJson",
    "intKey": 88,
    "booleanKey": true,
    "unitKey": {
        "stringKey": "value",
        "stringKye": "value",
        "country": "value"
    },
    "arrayKey": [
        {
            "stringKey": "value",
            "stringKey": "value"
        },
        {
            "stringKey": "value",
            "stringKey": "value"
        }
    ]
}
```
备注：无