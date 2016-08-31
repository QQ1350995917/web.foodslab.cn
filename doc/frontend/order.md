## [返回首页](../index.md)

## 创建新订单
#### 描述
- 创建一个新的订单

#### 请求地址
- http://localhost:8080/foodslab/order/create

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|accountId |      |String    |是| |如果为空则表示是匿名用户在下单|
|02|1|senderName       |      |String    |否| |描述|
|03|1|senderPhone      |      |String    |否| |描述|
|04|1|cost      |      |float    |否| |描述|
|05|1|postage   |      |float    |否| |描述|
|06|1|formatId  |      |String    |否| |描述|
|07|1|province  |      |String    |否| |描述|
|08|1|city      |      |String    |否| |描述|
|09|1|county    |      |String    |否| |描述|
|10|1|town      |      |String    |否| |描述|
|11|1|village   |      |String    |否| |描述|
|12|1|append    |      |String    |否| |描述|
|13|1|name      |      |String    |否| |描述|
|14|1|phone0   |      |String    |否| |描述|
|15|1|phone1   |      |String    |否| |描述|

- GET请求链接示例：http://localhost:8080/foodslab/order/create?accountId=a8002cbe-60bc-4f7d-abef-a36e46b23f49&senderName=丁朋伟&senderPhone=12312341234&cost=1234&postage=123&formatId=a8002cbe-60bc-4f7d-abef-a36e46b23f49&name=丁朋伟&phone0=12312341234&phone1=12312341234&province=北京&city=北京&county=昌平区&town=回龙观&village=新龙城&append=12A-1-123
- 请求数据结构示例：
```json
{
    "accountId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "senderName": "丁朋伟",
    "senderPhone": "12312341234",
    "cost": 123,
    "postage": 123,
    "formatId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
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
|03|1|orderId  |         |jsonArray |否	|    |订单ID|

- 响应数据结构示例：

```json
{
    "code": 200,
    "data": {
        "orderId": "27c76560-287f-470e-bc7f-3cb161c5e6ce"
    },
    "message": "创建成功"
}
```
- 备注：无