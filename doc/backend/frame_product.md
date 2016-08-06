## [返回首页](../index.md)

## 新建系列
#### 描述
- 新建一个产品系列

#### 请求地址
- http://localhost:8080/product/createSeries

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|label      |      |String    |否| |系列名称|

- GET请求链接示例：http://localhost:8080/product/createSeries?label=小磨香油
- 请求数据结构示例：
```json
{
    "label": "seriesName"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonObject|否	|    |数据体|
|04|2|seriesId |data     |String|否	|    |新建成功的seriesId|
|05|2|label    |data     |String|否	|    |新建成功的label|

- 响应数据结构示例：

```json
{
    "code": 200,
    "data": {
        "label": "小磨香油",
        "seriesId": "a40e29d0-7015-4b12-8bc4-57391a0b22cf"
    },
    "message": "创建系列成功"
}
```
```json
{
    "code": 400,
    "data": "true",
    "message": "系类名称已经存在"
}
```
- 备注：无


## 新建型号
#### 描述
- 新建某个产品系列下的产品型号

#### 请求地址
- http://localhost:8080/product/createType

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|seriesId      |      |String    |否| |系列ID|
|02|1|label      |      |String    |否| |型号名称|

- GET请求链接示例：http://localhost:8080/product/createType?seriesId=a40e29d0-7015-4b12-8bc4-57391a0b22cf&label=家庭装
- 请求数据结构示例：
```json
{
    "seriesId": "seriesId",
    "label": "typeName"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonObject|否	|    |数据体|
|04|2|seriesId |data     |String |否	|    |seriesId|
|05|3|typeId   |data     |String |否	|    |新建成功的typeId|
|05|3|label    |data     |String |否	|    |新建成功的label |

- 响应数据结构示例：

```json
{
    "code": 200,
    "data": {
        "typeId": "c31d08fc-754c-4ce1-b7b6-33d0541b38f2",
        "label": "家庭装",
        "seriesId": "a40e29d0-7015-4b12-8bc4-57391a0b22cf"
    },
    "message": "创建系列成功"
}
```
```json
{
    "code": 400,
    "data": "true",
    "message": "系类名称已经存在"
}
```
- 备注：无

## 新建规格
#### 描述
- 新建某个产品型号下的产品规格

#### 请求地址
- http://localhost:8080/product/createFormat

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|label      |      |String    |否| |规格的量,比如 1，100，500，2，3，4|
|02|1|meta       |      |String    |否| |规格的单位 比如 kg, mk，L，盒，包，瓶|
|03|1|amount       |      |int    |否| |规格下的数量 通常是在，盒，包下的包含个数，比如每盒有4瓶|
|04|1|amountMeta       |      |String    |否| |规格下的数量的单位|
|05|1|pricing       |      |float    |否| |定价|
|06|1|pricingMeta       |      |String    |否| |定价单位 通常是￥|
|07|1|postage       |      |float    |否| |邮费|
|08|1|postageMeta       |      |String    |否| |邮费单位 通常是￥|
|09|1|price       |      |float    |是| |现价|
|10|1|priceDiscount       |      |float    |是| |现价对比定价的折扣|
|11|1|priceStart       |      |String    |是| |折扣活动开始时间|
|12|1|priceEnd       |      |String    |是| |折扣活动结束时间|
|13|1|priceStatus       |      |int    |是| |折扣活动所处于的状态，是否要显示|
|14|1|expressCount       |      |int    |是| |包邮需要的数量|
|15|1|expressName       |      |String    |是| |邮递公司名称|
|16|1|expressStart       |      |String    |是| |包邮活动开始时间|
|17|1|expressEnd       |      |String    |是| |包邮活动结束时间|
|18|1|expressStatus       |      |int    |是| |包邮活动所处于的状态，是否要显示|
|19|1|giftCount       |      |int    |是| |满赠需要的数量|
|20|1|giftLabel       |      |String    |是| |满赠产品的名称|
|21|1|giftId       |      |String    |是| |满赠产品规格的ID|
|22|1|giftStart       |      |String    |是| |满赠活动开始时间|
|23|1|giftEnd       |      |String    |是| |满赠活动结束时间|
|24|1|giftStatus       |      |int    |是| |满赠活动所处于的状态|
|25|1|queue       |      |int    |是| |该规格的顺序|
|26|1|status       |      |int    |是| |该规格的状态|
|27|1|typeId       |      |String    |否| |规格的类型ID|


- GET请求链接示例：http://localhost:8080/foodslab/product/createFormat?label=450&meta=ml&amount=1&amountMeta=瓶&pricing=180&pricingMeta=￥&postage=10&postageMeta=￥&typeId=aba4d190-6874-426a-883f-a1e561a6f879
- 请求数据结构示例：
```json
{
    "amount": 1,
    "amountMeta": "瓶",
    "expressCount": 0,
    "expressStatus": 0,
    "giftCount": 0,
    "giftStatus": 0,
    "label": "450",
    "meta": "ml",
    "postage": 10,
    "postageMeta": "￥",
    "price": 0,
    "priceDiscount": 0,
    "priceStatus": 0,
    "pricing": 180,
    "pricingMeta": "￥",
    "queue": 0,
    "status": 0,
    "typeId": "aba4d190-6874-426a-883f-a1e561a6f879"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|04|2|seriesId |data     |String |否	|    |系列ID|
|05|2|label     |data     |String |否	|    |系列Label|
|06|2|queue     |data     |int |否	|    |系列排序|
|07|2|status     |data     |int |否	|    |系类装态|
|08|2|description     |data     |String |是	|    |系列描述|
|09|2|createTime     |data     |long |否	|    |创建时间|
|10|2|updateTime     |data     |long |否	|    |更新时间|
|11|2|children     |data     |jsonArray |是	|    |子节点-型号数据|
|12|3|typeId     |children     |String |否	|    |型号ID|
|13|3|seriesId     |children     |String |否	|    |系列ID|
|14|3|label     |children     |String |否	|    |型号Label|
|15|3|queue     |children     |int |是	|    |型号排序|
|16|3|status     |children     |int |否	|    |型号状态|
|17|3|description     |children     |String |是	|    |型号的描述|
|18|3|detail     |children     |String |是	|    |型号的详情说明|
|19|3|crafts     |children     |String |是	|    |型号的工艺链接|
|20|3|createTime     |children     |long  |否	|    |型号创建时间|
|21|3|updateTime     |children     |long  |否	|    |型号的更新时间|
|22|3|children     |children     |String |是	|    |子节点-规格数据|
|21|4|formatId     |children     |String |否	|    |规格ID|
|21|4|formatId     |children     |String |否	|    |规格ID|
|21|4|formatId     |children     |String |否	|    |规格ID|
|21|4|formatId     |children     |String |否	|    |规格ID|
|21|4|formatId     |children     |String |否	|    |规格ID|
|21|4|formatId     |children     |String |否	|    |规格ID|
|21|4|formatId     |children     |String |否	|    |规格ID|
|21|4|formatId     |children     |String |否	|    |规格ID|
|21|4|formatId     |children     |String |否	|    |规格ID|

- 响应数据结构示例：

```json
{
    "code": 200,
    "data": {
        "formatId": "9465c8ba-9cdc-435b-b26d-48d0a497691c",
        "meta": "ml",
        "typeId": "aba4d190-6874-426a-883f-a1e561a6f879",
        "label": "450"
    },
    "message": "创建系列成功"
}
```
```json
{
    "code": 400,
    "data": "true",
    "message": "规格名称已经存在"
}
```
- 备注：无


## 获取产品树
#### 描述
- 请求所有产品体系的属性树结构

#### 请求地址
- http://localhost:8080/foodslab/product

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|managerId |      |String    |否| |描述|

- GET请求链接示例：http://localhost:8080/foodslab/product
- 请求数据结构示例：
```json
{
    "managerId": "xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|

- 响应数据结构示例：

```json
{
    "code": 0,
    "data": [
        {
            "createTime": 1470299988000,
            "children": [],
            "updateTime": 1470393700000,
            "label": "S压榨香油",
            "seriesId": "4a08ad62-21d5-4416-9e9d-a060b9ea35b2",
            "queue": 0,
            "status": 1
        },
        {
            "createTime": 1470285214000,
            "children": [
                {
                    "createTime": 1470394941000,
                    "children": [],
                    "typeId": "0b1f5fa6-1cb8-45b4-bfe7-00a7a03e3949",
                    "updateTime": 1470394941000,
                    "label": "T2",
                    "queue": 0,
                    "seriesId": "a40e29d0-7015-4b12-8bc4-57391a0b22cf",
                    "status": 1
                },
                {
                    "createTime": 1470394944000,
                    "children": [
                        {
                            "giftCount": 0,
                            "price": 0,
                            "giftStatus": 0,
                            "postageMeta": "￥",
                            "amount": 1,
                            "updateTime": 1470448496000,
                            "label": "100",
                            "priceStatus": 0,
                            "priceDiscount": 0,
                            "pricingMeta": "￥",
                            "postage": 10,
                            "formatId": "36de2b3a-bd82-4087-9ac0-d14874c8f46f",
                            "amountMeta": "瓶",
                            "createTime": 1470448496000,
                            "meta": "ml",
                            "expressCount": 0,
                            "typeId": "aba4d190-6874-426a-883f-a1e561a6f879",
                            "expressStatus": 0,
                            "pricing": 180,
                            "queue": 0,
                            "status": 0
                        }
                    ],
                    "typeId": "aba4d190-6874-426a-883f-a1e561a6f879",
                    "updateTime": 1470394944000,
                    "label": "T1",
                    "queue": 0,
                    "seriesId": "a40e29d0-7015-4b12-8bc4-57391a0b22cf",
                    "status": 1
                }
            ],
            "updateTime": 1470393700000,
            "label": "S小磨香油",
            "seriesId": "a40e29d0-7015-4b12-8bc4-57391a0b22cf",
            "queue": 0,
            "status": 1
        }
    ],
    "message": "this is tip message!"
}
```
- 备注：无