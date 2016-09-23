# 产品接口 [返回首页](../index.md)

## 从系列读取产品树
#### 描述
- 创建产品规格,后台接口,请求时候服务器检测权限

#### 请求地址
- http://localhost:8080/foodslab/product/mRetrieves

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|sessionId |          |String    |否| |sessionID|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonObject|否	|    |相应的数据|
|04|2|label    |data     |String    |否	|    |提交的数据|
|05|2|seriesId |data     |String    |否	|    |提交的数据|
|06|2|typeId   |data     |String    |是	|    |操作失败的时无该数据|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 3000,
    "data": {
        "label": "家庭装",
        "queue": 0,
        "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
        "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "status": -2
    },
    "message": "fail"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 3050,
    "data": {
        "label": "家庭装",
        "queue": 0,
        "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
        "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "status": -2,
        "typeId": "fe4095fc-9158-4008-93d5-0dcc96f29801"
    },
    "message": "success"
}
```
- 备注：无






## 获取系列数据
#### 描述
- 获取系列列表

#### 请求地址
- http://localhost:8080/foodslab/product/series

#### 请求方式
- get

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|flag      |      |String  |是| |非空表示请求数据含有产品树|
|01|1|seriesId  |      |String  |是| |在第一个条件成立的情况下,不指定该条件则表示请求第一个系列下的产品树,指定无效则不包含产品树|

- GET请求链接示例：
1. http://localhost:8080/foodslab/product/series
2. http://localhost:8080/foodslab/product/series?flag=1&seriesId=seriesId
- 请求数据结构示例：flag=1&seriesId=eaf77fd7-de68-4587-a3e5-3b7b340cfe2e
- 备注：调用该数据接口的功能有: 首页系列菜单, 系列页面菜单以及产品的初始化和切换页签

#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|04|2|seriesId |data     |String    |否	|    |系列ID|
|05|2|label    |data     |String    |否	|    |系列label|
|06|2|children |data     |jsonArray |是	|    |类型数据集合|
|07|3|typeId   |children |String    |是	|    |类型ID|
|08|3|seriesId |children |String    |是	|    |类型所属的系列ID|
|09|3|label    |children |String    |是	|    |类型label|
|10|3|children |children |jsonArray |是	|    |规格数据集合|
|11|4|formatId |children |String    |是	|    |规格ID|
|12|4|label    |children |String    |是	|    |规格label|
|13|4|meta     |children |String    |是	|    |规格单位|
|14|4|price    |children |int       |是	|    |价格|
|15|4|pricingMeta|children |String  |是	|    |价格单位|

- 响应数据结构示例：
```json
{
    "code": 200,
    "data": [
        {
            "seriesId": "b2523f4e-77c5-4a40-810e-c1e436e80677",
            "label": "石磨香油"
        },
        {
            "seriesId": "c081fe20-098e-4ef9-8be6-1d8788cb8057",
            "label": "吊炉花生"
        }
    ],
    "message": "this is tip message!"
}
```

```json
{
    "code": 200,
    "data": [
        {
            "children": [
                {
                    "children": [
                        {
                            "pricingMeta": "￥",
                            "formatId": "761f3cb4-130b-4fe0-8ef5-08fc748fda0b",
                            "meta": "ml",
                            "price": 50,
                            "label": "200"
                        }
                    ],
                    "typeId": "113df3d5-bfbe-4350-aa6f-d20064bc25af",
                    "label": "家庭装",
                    "seriesId": "b2523f4e-77c5-4a40-810e-c1e436e80677"
                }
            ],
            "label": "石磨香油",
            "seriesId": "b2523f4e-77c5-4a40-810e-c1e436e80677"
        },
        {
            "label": "吊炉花生",
            "seriesId": "c081fe20-098e-4ef9-8be6-1d8788cb8057"
        }
    ],
    "message": "this is tip message!"
}
```
- 备注：无



## 获取推荐数据
#### 描述
- 获取推荐的产品

#### 请求地址
- http://localhost:8080/foodslab/product/recommend

#### 请求方式
- get

#### 请求参数 无

- GET请求链接示例：http://localhost:8080/foodslab/product/recommend
- 请求数据结构示例：无
- 备注：无

#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|04|2|formatId |data     |String |否	|    |规格ID|
|05|2|label    |data     |String |否	|    |规格标签|
|06|2|meta     |data     |String |否	|    |规格单位|
|07|2|price    |data     |float  |否	|    |价格   |
|08|2|pricingMeta|data   |String |否	|    |价格单位|
|09|2|typeId   |data     |String |否	|    |类型ID|
|10|2|parent   |data     |jsonObject|否	|    |类型对象|
|11|3|typeId   |parent   |parent |否	|    |类型的ID|
|12|3|label    |parent   |parent |否	|    |类型的标签|
|13|3|seriesId |parent   |parent |否	|    |系列的ID|
|14|3|parent   |parent   |jsonObject |否	|    |系列对象|
|15|4|seriesId |parent   |parent |否	|    |系列的ID|
|16|4|label    |parent   |parent |否	|    |系列的标签|


- 响应数据结构示例：

```json
{
    "code": 200,
    "data": [
        {
            "pricingMeta": "L",
            "parent": {
                "parent": {
                    "label": "白芝麻",
                    "seriesId": "3cd62990-0683-4e0f-b051-93ef363e8c39"
                },
                "typeId": "b3c3ad2e-f013-4f1b-951c-d94cf2a06053",
                "label": "散装",
                "seriesId": "3cd62990-0683-4e0f-b051-93ef363e8c39"
            },
            "formatId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
            "meta": "ml",
            "price": 11,
            "typeId": "b3c3ad2e-f013-4f1b-951c-d94cf2a06053",
            "label": "11"
        }
    ],
    "message": "this is tip message!"
}
```
- 备注：无


## 获取类型数据
#### 描述
- 根据类型的ID获取产品规格的详情以及规格子集数据

#### 请求地址
- http://localhost:8080/foodslab/product/type

#### 请求方式
- get

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|typeId    |      |String    |是| |如果不存在则跳转404|
|01|1|formatId  |      |String    |是| |如果不存在则默认为第一个规格数据是选中的|

- GET请求链接示例：http://localhost:8080/foodslab/product/type?typeId=113df3d5-bfbe-4350-aa6f-d20064bc25af&formatId=761f3cb4-130b-4fe0-8ef5-08fc748fda0b
- 请求数据结构示例：无
- 备注：无

#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|04|2|seriesId |data     |String    |否	|    |系列ID|
|05|2|label    |data     |String    |否	|    |系列label|
|06|2|child    |data     |jsonObject|是	|    |类型数据集合|
|07|3|typeId   |child    |String    |是	|    |类型ID|
|08|3|seriesId |child    |String    |是	|    |类型所属的系列ID|
|09|3|label    |child    |String    |是	|    |类型label|
|09|3|description |child |String    |是	|    |类型label|
|09|3|detail   |child |String    |是	|    |类型label|
|10|3|children |child |jsonArray |是	|    |规格数据集合|
|11|4|formatId |children |String    |是	|    |规格ID|
|12|4|label    |children |String    |是	|    |规格label|
|13|4|meta     |children |String    |是	|    |规格单位|
|14|4|price    |children |int       |是	|    |价格|
|15|4|priceMeta|children |String  |是	|    |价格单位|
|16|4|amount     |children |int       |是	|    |数量|
|17|4|amountMeta |children |String  |是	|    |数量单位|
|18|4|postage    |children |int       |是	|    |邮费|
|19|4|postageMeta|children |String  |是	|    |邮费单位|
|20|4|pricingStatus|children |int       |是	|    |现价状态|
|21|4|priceDiscount|children |float  |是	|    |现价折扣|
|22|4|pricing      |children |float  |是	|    |现价|
|23|4|pricingStart    |children |long  |是	|    |现价开始时间|
|24|4|pricingEnd      |children   |long  |是	|    |现价结束时间|
|25|4|expressStatus|children |int       |是	|    |包邮状态|
|26|4|expressName  |children |String  |是	|    |包邮名称|
|27|4|expressCount |children |int  |是	|    |包邮数量|
|28|4|expressStart |children |long  |是	|    |包邮开始时间|
|29|4|expressEnd   |children |long  |是	|    |包邮结束时间|
|30|4|giftStatus   |children |int       |是	|    |满赠状态|
|31|4|giftLabel  |children |String    |是	|    |满赠产品|
|32|4|giftCount |children |int   |是	|    |满赠数量|
|33|4|giftStart |children |long  |是	|    |满赠开始时间|
|34|4|giftEnd   |children |long  |是	|    |满赠结束时间|
|35|4|typeId    |children |long  |是	|    |满赠结束时间|

- 响应数据结构示例：

```json
{
    "code": 200,
    "data": {
        "label": "石磨香油",
        "seriesId": "b2523f4e-77c5-4a40-810e-c1e436e80677",
        "child": {
            "images": [],
            "children": [
                {
                    "giftCount": 5,
                    "priceEnd": 1470096000000,
                    "giftLabel": "gift_product2",
                    "giftStart": 1471910400000,
                    "price": 50,
                    "giftStatus": 0,
                    "postageMeta": "￥",
                    "amount": 1,
                    "weight": 4,
                    "giftEnd": 1470700800000,
                    "updateTime": 1471701375000,
                    "label": "200",
                    "priceStatus": 1,
                    "priceDiscount": 5,
                    "pricingMeta": "￥",
                    "expressEnd": 1470787200000,
                    "postage": 100,
                    "expressName": "请选择快递公司",
                    "formatId": "761f3cb4-130b-4fe0-8ef5-08fc748fda0b",
                    "amountMeta": "Kg",
                    "createTime": 1471073111000,
                    "meta": "ml",
                    "expressCount": 5,
                    "priceStart": 1471910400000,
                    "typeId": "113df3d5-bfbe-4350-aa6f-d20064bc25af",
                    "expressStatus": 1,
                    "pricing": 100,
                    "queue": 0,
                    "expressStart": 1471910400000,
                    "status": 1
                },
                {
                    "giftCount": 3,
                    "priceEnd": 1471824000000,
                    "giftLabel": "gift_product1",
                    "giftStart": 1471996800000,
                    "price": 3,
                    "giftStatus": 0,
                    "postageMeta": "￥",
                    "amount": 3,
                    "weight": 7,
                    "giftEnd": 1470787200000,
                    "updateTime": 1471701375000,
                    "label": "3",
                    "priceStatus": 1,
                    "priceDiscount": 3,
                    "pricingMeta": "ml",
                    "expressEnd": 1471910400000,
                    "postage": 3,
                    "expressName": "顺丰快递",
                    "formatId": "92bbc817-89d1-470e-8c4d-1ed8e4e865f6",
                    "amountMeta": "Kg",
                    "createTime": 1471073179000,
                    "meta": "ml",
                    "expressCount": 3,
                    "priceStart": 1471478400000,
                    "typeId": "113df3d5-bfbe-4350-aa6f-d20064bc25af",
                    "expressStatus": 0,
                    "pricing": 3,
                    "queue": 0,
                    "expressStart": 1472515200000,
                    "status": 1
                }
            ],
            "description": "豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。",
            "typeId": "113df3d5-bfbe-4350-aa6f-d20064bc25af",
            "label": "家庭装",
            "detail": "<div>滕王高阁临江渚，佩玉鸣鸾罢歌舞。</div><div>画栋朝飞南浦云，珠帘暮卷西山雨。</div><div>闲云潭影日悠悠，物换星移几度秋。</div><div>阁中帝子今何在？槛外长江空自流。</div>",
            "seriesId": "b2523f4e-77c5-4a40-810e-c1e436e80677"
        }
    },
    "message": "this is tip message!"
}
```
- 备注：无


## 获取产品规格
#### 描述
- 接口描述

#### 请求地址
- http://localhost:8080/foodslab/product/format?formatIds=a8002cbe-60bc-4f7d-abef-a36e46b23f49

#### 请求方式
- get

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|formatId  |      |String    |否| |描述|

- GET请求链接示例：无
- 请求数据结构示例： 无

- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|04|2|formatId |data |String    |是	|    |规格ID|
|05|2|label    |data |String    |是	|    |规格label|
|06|2|meta     |data |String    |是	|    |规格单位|
|07|2|price    |data |int       |是	|    |价格|
|08|2|priceMeta|data |String  |是	|    |价格单位|
|09|2|amount     |data |int       |是	|    |数量|
|10|2|amountMeta |data |String  |是	|    |数量单位|
|11|2|postage    |data |int       |是	|    |邮费|
|12|2|postageMeta|data |String  |是	|    |邮费单位|
|13|2|pricingStatus|data |int       |是	|    |现价状态|
|14|2|priceDiscount|data |float  |是	|    |现价折扣|
|15|2|pricing      |data |float  |是	|    |现价|
|16|2|pricingStart    |data |long  |是	|    |现价开始时间|
|17|2|pricingEnd      |data   |long  |是	|    |现价结束时间|
|18|2|expressStatus|data |int       |是	|    |包邮状态|
|19|2|expressName  |data |String  |是	|    |包邮名称|
|20|2|expressCount |data |int  |是	|    |包邮数量|
|21|2|expressStart |data |long  |是	|    |包邮开始时间|
|22|2|expressEnd   |data |long  |是	|    |包邮结束时间|
|23|2|giftStatus   |data |int       |是	|    |满赠状态|
|24|2|giftLabel  |data |String    |是	|    |满赠产品|
|25|2|giftCount |data |int   |是	|    |满赠数量|
|26|2|giftStart |data |long  |是	|    |满赠开始时间|
|27|2|giftEnd   |data |long  |是	|    |满赠结束时间|
|28|2|parent   |data |jsonObject  |是	|    ||
|29|3|seriesId |parent    |String    |是	|    |类型所属的系列ID|
|30|3|label    |parent    |String    |是	|    |类型label|
|31|3|description |parent |String    |是	|    |类型label|
|32|3|detail   |parent |String    |是	|    |类型label|
|33|3|parent   |parent |String    |是	|    |类型label|
|34|4|seriesId |parent     |String    |否	|    |系列ID|
|35|4|label    |parent     |String    |否	|    |系列label|
|36|4|child    |parent     |jsonObject|是	|    |类型数据集合|
|37|4|typeId   |parent    |String    |是	|    |类型ID|


- 响应数据结构示例：

```json
{
    "code": 200,
    "data": [
        {
            "parent": {
                "parent": {
                    "label": "白芝麻",
                    "seriesId": "3cd62990-0683-4e0f-b051-93ef363e8c39"
                },
                "typeId": "b3c3ad2e-f013-4f1b-951c-d94cf2a06053",
                "label": "散装",
                "seriesId": "3cd62990-0683-4e0f-b051-93ef363e8c39"
            },
            "pricingStart": 1471996800000,
            "giftCount": 11,
            "giftLabel": "gift_product1",
            "giftStart": 1470268800000,
            "pricingStatus": 1,
            "price": 11,
            "giftStatus": 1,
            "postageMeta": "g",
            "pricingEnd": 1471910400000,
            "amount": 11,
            "priceMeta": "L",
            "weight": 0,
            "giftEnd": 1470873600000,
            "updateTime": 1471701375000,
            "label": "11",
            "priceDiscount": 11,
            "expressEnd": 1471910400000,
            "postage": 11,
            "expressName": "顺丰快递",
            "formatId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
            "amountMeta": "ml",
            "createTime": 1471082940000,
            "meta": "ml",
            "expressCount": 11,
            "typeId": "b3c3ad2e-f013-4f1b-951c-d94cf2a06053",
            "expressStatus": 1,
            "pricing": 11,
            "queue": 0,
            "expressStart": 1471996800000,
            "status": 1
        }
    ],
    "message": "this is tip message!"
}
```
- 备注：无