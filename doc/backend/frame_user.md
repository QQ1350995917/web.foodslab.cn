## [返回首页](../index.md)

## 读取用户
#### 描述
- 接口描述

#### 请求地址
- http://localhost:8080/foodslab/user/retrieve

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|managerId      |      |String    |否| |描述|

- GET请求链接示例：http://localhost:8080/foodslab/users?managerId=xxxx
- 请求数据结构示例：
```json
{
    "managerId": "xxxx"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|04|2|userId   |data     |String |否	|    |用户ID|
|05|2|status   |data     |int    |否	|    |用户状态|
|06|2|children |data     |int    |否	|    |账户数据集合体|
|06|2|accountId|children |String |否	|    |账户ID|
|06|2|name     |children |String |否	|    |账户ID|
|06|2|telephone|children |String |否	|    |账户ID|
|06|2|password |children |String |否	|    |账户ID|
|06|2|userId   |children |String |否	|    |账户ID|
|06|2|createTime|children |long |否	|    |账户ID|
|06|2|updateTime|children |long |否	|    |账户ID|

- 响应数据结构示例：

```json
{
    "code": 200,
    "data": [
        {
            "children": {
                "accountId": "8d816c77-0b6c-4591-87b0-34edc18919c8",
                "password": "123456",
                "createTime": 1471326085000,
                "name": "未命名",
                "telephone": "185116912451",
                "updateTime": 1471326085000,
                "userId": "ff57138d-13bd-4bf5-85fb-23458cdd1b81"
            },
            "userId": "ff57138d-13bd-4bf5-85fb-23458cdd1b81",
            "status": 1
        }
    ],
    "message": "ok"
}
```
- 备注：无