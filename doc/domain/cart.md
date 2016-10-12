# 购物车数据接口
## [返回首页](../index.md)

## 读取购物车
#### 描述
- 读取购物车列表

#### 请求地址
- http://localhost:8080/foodslab/cart/retrieve

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|accountId |               |String    |否| |账户ID|

- GET请求链接示例：http://localhost:8080/foodslab/cart/retrieve?accountId=test
- 请求数据结构示例：
```json
{
    "accountId": "test"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|03|1|accountId|data     |String|否	|    |账户ID|
|03|1|formatId |data     |String|否	|    |规格ID|
|03|1|amount   |data     |int |否	|    |数量|
|03|1|mappingId|data     |String |否	|    |对应关系|
|03|1|createTime|data     |long |否	|    |创建时间|

- 响应数据结构示例：

```json
{
    "code": 200,
    "data": [
        {
            "mappingId": "a5fe1398-02e5-4f0c-b66d-f50ed6b91559",
            "accountId": "test",
            "amount": 3,
            "product": {
                "parent": {
                    "parent": {
                        "createTime": 1471051308000,
                        "updateTime": 1471051308000,
                        "label": "石磨香油",
                        "seriesId": "b2523f4e-77c5-4a40-810e-c1e436e80677",
                        "queue": 0,
                        "status": 1
                    },
                    "createTime": 1471070415000,
                    "typeId": "56826b6e-6c6d-483a-bf00-9a1274cb0179",
                    "updateTime": 1471070419000,
                    "label": "商用装",
                    "queue": 0,
                    "seriesId": "b2523f4e-77c5-4a40-810e-c1e436e80677",
                    "status": 1
                },
                "pricingStart": 1470873600000,
                "giftCount": 1,
                "giftLabel": "gift_product1",
                "giftStart": 1471996800000,
                "pricingStatus": 0,
                "price": 1,
                "giftStatus": 0,
                "postageMeta": "ml",
                "pricingEnd": 1470787200000,
                "amount": 1,
                "priceMeta": "L",
                "weight": 8,
                "giftEnd": 1471392000000,
                "updateTime": 1471701375000,
                "label": "599",
                "priceDiscount": 1,
                "expressEnd": 1471392000000,
                "postage": 1,
                "expressName": "顺丰快递",
                "formatId": "09c0692e-0a2a-46e1-ad2b-2c60df91b9eb",
                "amountMeta": "ml",
                "createTime": 1471076751000,
                "meta": "Kg",
                "expressCount": 1,
                "typeId": "56826b6e-6c6d-483a-bf00-9a1274cb0179",
                "expressStatus": 0,
                "pricing": 1,
                "queue": 0,
                "expressStart": 1472169600000,
                "status": 0
            },
            "formatId": "09c0692e-0a2a-46e1-ad2b-2c60df91b9eb",
            "createTime": 1473054477000
        }
    ],
    "message": "this is tip message!"
}
```
- 备注：无

## 添加新商品
#### 描述
- 向指定的用户购物车中添加一个商品

#### 请求地址
- http://localhost:8080/foodslab/cart/create

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|accountId |      |String    |否| |用户的信息|
|01|1|formatId  |      |String    |否| |商品规格ID|
|01|1|amount    |      |int       |否| |商品数量|

- GET请求链接示例：http://localhost:8080/foodslab/cart/create?accountId=test&formatId=09c0692e-0a2a-46e1-ad2b-2c60df91b9eb&amount=3
- 请求数据结构示例：
```json
{
    "accountId": "test",
    "formatId": "09c0692e-0a2a-46e1-ad2b-2c60df91b9eb",
    "amount": 3
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|03|1|accountId|data     |String|否	|    |账户ID|
|03|1|formatId |data     |String|否	|    |规格ID|
|03|1|amount   |data     |int |否	|    |数量|
|03|1|mappingId|data     |String |否	|    |对应关系|
- 响应数据结构示例：

```json
{
    "code": 200,
    "data": {
        "accountId": "test",
        "amount": 3,
        "formatId": "09c0692e-0a2a-46e1-ad2b-2c60df91b9eb",
        "mappingId": "85d4df43-5423-4227-9d69-b90578663afb"
    },
    "message": "创建成功"
}
```
- 备注：无


## 修改商品数量
#### 描述
- 在指定的用户购物车中修改一个商品的数量

#### 请求地址
- http://localhost:8080/foodslab/cart/update

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|accountId |      |String    |否| |用户的信息|
|01|1|mapping  |      |String    |否| |商品在购物中中的ID|
|01|1|amount    |      |int       |否| |商品数量|

- GET请求链接示例：http://localhost:8080/foodslab/cart/update?accountId=test&mapping=85d4df43-5423-4227-9d69-b90578663afb&amount=5
- 请求数据结构示例：
```json
{
    "accountId": "test",
    "mapping": "85d4df43-5423-4227-9d69-b90578663afb",
    "amount": 3
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|03|1|accountId|data     |String|否	|    |账户ID|
|03|1|amount   |data     |int |否	|    |数量|
|03|1|mappingId|data     |String |否	|    |对应关系|
- 响应数据结构示例：

```json
{
    "code": 200,
    "data": {
        "accountId": "test",
        "amount": 5,
        "mappingId": "85d4df43-5423-4227-9d69-b90578663afb"
    },
    "message": "更新成功"
}
```
- 备注：无


## 删除商品
#### 描述
- 在指定的用户购物车中删除一个商品

#### 请求地址
- http://localhost:8080/foodslab/cart/delete

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|accountId |      |String    |否| |用户的信息|
|01|1|mapping  |      |String    |否| |商品在购物中中的ID|

- GET请求链接示例：http://localhost:8080/foodslab/cart/delete?accountId=test&mapping=85d4df43-5423-4227-9d69-b90578663afb
- 请求数据结构示例：
```json
{
    "accountId": "test",
    "mapping": "85d4df43-5423-4227-9d69-b90578663afb"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|03|1|accountId|data     |String|否	|    |账户ID|
|03|1|amount   |data     |int |否	|    |数量|
|03|1|mappingId|data     |String |否	|    |对应关系|

- 响应数据结构示例：

```json
{
    "code": 200,
    "data": [
        {
            "accountId": "test",
            "amount": 0,
            "mappingId": "85d4df43-5423-4227-9d69-b90578663afb"
        }
    ],
    "message": "更新成功"
}
```
- 备注：无