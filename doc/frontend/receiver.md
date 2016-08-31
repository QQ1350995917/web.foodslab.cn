## [返回首页](../index.md)

## 新建收货人
#### 描述
- 用户新创建一个收货人的信息

#### 请求地址
- http://localhost:8080/foodslab/receiver/create

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|accountId |      |String    |是| |如果为空则表示是匿名用户在下单|
|02|1|name      |      |String    |否| |收货人名称|
|03|1|phone0      |      |String    |否| |收货人电话|
|04|1|phone1      |      |String    |否| |紧急电话|
|05|1|province      |      |String    |否| |收货人省份地域名称|
|06|1|city      |      |String    |否| |收货人地区级地域名称|
|07|1|county      |      |String    |否| |收货人县级地域名称|
|08|1|town      |      |String    |否| |收货人乡镇界级地域名称|
|09|1|village      |      |String    |否| |收货人乡村级别地域名称|
|10|1|append      |      |String    |否| |收货人追加的地址信息|

- GET请求链接示例：http://localhost:8080/foodslab/receiver/create?accountId=a8002cbe-60bc-4f7d-abef-a36e46b23f49&name=丁朋伟&phone0=12312341234&phone1=12312341234&province=北京&city=北京&county=昌平区&town=回龙观&village=新龙城&append=12A-1-123
- 请求数据结构示例：
```json
{
    "accountId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "name=丁朋伟",
    "phone0": "12312341234",
    "phone1": "12312341234",
    "province": "北京",
    "city": "北京",
    "county": "昌平区",
    "town": "回龙观",
    "village": "新龙城",
    "append": "12A-1-123"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|04|2|receiverId|data     |String |是	|    |如果为空创建失败|
|05|2|name|data     |String |否	|    ||
|06|2|phone0|data     |String |否	|    ||
|07|2|phone1|data     |String |否	|    ||
|08|2|province|data     |String |否	|    ||
|09|2|city|data     |String |否	|    ||
|10|2|county|data     |String |否	|    ||
|11|2|town|data     |String |否	|    ||
|12|2|village|data     |String |否	|    ||
|13|2|append|data     |String |是	|    |如果为空则无追加|
|13|2|accountId|data     |String |否	|    |如果为空匿名创建|

- 响应数据结构示例：

```json

{
    "code": 200,
    "data": {
        "accountId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "append": "12A-1-123",
        "city": "北京",
        "county": "昌平区",
        "name": "丁朋伟",
        "phone0": "12312341234",
        "phone1": "12312341234",
        "province": "北京",
        "receiverId": "890a9b2d-f0f5-4197-bdc1-b055f098ab0e",
        "town": "回龙观",
        "village": "新龙城"
    },
    "message": "创建成功"
}
```

```json
{
    "code": 500,
    "data": {
        "append": "12A-1-123",
        "city": "北京",
        "county": "昌平区",
        "name": "丁朋伟",
        "phone0": "12312341234",
        "phone1": "12312341234",
        "province": "北京",
        "receiverId": "890a9b2d-f0f5-4197-bdc1-b055f098ab0e",
        "town": "回龙观",
        "village": "新龙城"
    },
    "message": "创建失败"
}
```
- 备注：无