# 产品规格接口 [返回首页](../index.md)

## 管理员创建一个规格
#### 描述
- 管理员创建一个规格

#### 请求地址
- http://localhost:8080/foodslab/format/mCreate

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|typeId    |p     |String    |否| |所属的类型ID|
|04|2|label     |p     |String    |否| |规格标签|
|05|2|meta      |p     |String    |否| |规格的单位|
|06|2|amount    |p     |String    |否| |规格的数量|
|07|2|amountMeta|p     |String    |否| |规格的数量单位|
|08|2|price     |p     |String    |否| |规格的价格|
|09|2|postage   |p     |String    |否| |规格的邮费|
|10|2|pricingStatus  |p     |String    |否| |规格的打折状态|
|11|2|pricingDiscount|p     |String    |否| |规格的打折折扣|
|12|2|pricing        |p     |String    |否| |规格的现价|
|13|2|pricingStart   |p     |String    |否| |规格的打折开始时间|
|14|2|pricingEnd     |p     |String    |否| |规格的打折结束时间|
|15|2|expressStatus  |p     |String    |否| |规格的包邮状态|
|16|2|expressCount   |p     |String    |否| |规格的包邮数量|
|17|2|expressName    |p     |String    |否| |规格的包邮快递|
|18|2|expressStart   |p     |String    |否| |规格的包邮开始时间|
|19|2|expressEnd     |p     |String    |否| |规格的包邮结束时间|

- GET请求链接示例：http://localhost:8080/foodslab/format/mCreate?p={"typeId":"7cf157af-b6b6-49a4-b738-d37e48ca4cb8","status":2,"label":"222","meta":"ml","amount":"222","amountMeta":"ml","price":"22","postage":"222","pricingStatus":2,"pricingDiscount":"22","pricing":"22","pricingStart":1477353600000,"pricingEnd":1477612800000,"expressStatus":2,"expressCount":"22","expressName":"圆通快递","expressStart":1477440000000,"expressEnd":1477612800000,"cs":"2429656B42A5EE9751C8933A7E18FC4F"}
- 请求数据结构示例：
```json
{
    "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8",
    "status": 2,
    "label": "222",
    "meta": "ml",
    "amount": "222",
    "amountMeta": "ml",
    "price": "22",
    "postage": "222",
    "pricingStatus": 2,
    "pricingDiscount": "22",
    "pricing": "22",
    "pricingStart": 1477353600000,
    "pricingEnd": 1477612800000,
    "expressStatus": 2,
    "expressCount": "22",
    "expressName": "圆通快递",
    "expressStart": 1477440000000,
    "expressEnd": 1477612800000,
    "cs": "2429656B42A5EE9751C8933A7E18FC4F"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|03|2|typeId    |data     |String    |否| |所属的类型ID|
|03|2|formatId  |data     |String    |否| |规格的ID|
|04|2|label     |data     |String    |否| |规格标签|
|05|2|meta      |data     |String    |否| |规格的单位|
|06|2|amount    |data     |String    |否| |规格的数量|
|07|2|amountMeta|data     |String    |否| |规格的数量单位|
|08|2|price     |data     |String    |否| |规格的价格|
|09|2|postage   |data     |String    |否| |规格的邮费|
|10|2|pricingStatus  |data     |String    |否| |规格的打折状态|
|11|2|pricingDiscount|data     |String    |否| |规格的打折折扣|
|12|2|pricing        |data     |String    |否| |规格的现价|
|13|2|pricingStart   |data     |String    |否| |规格的打折开始时间|
|14|2|pricingEnd     |data     |String    |否| |规格的打折结束时间|
|15|2|expressStatus  |data     |String    |否| |规格的包邮状态|
|16|2|expressCount   |data     |String    |否| |规格的包邮数量|
|17|2|expressName    |data     |String    |否| |规格的包邮快递|
|18|2|expressStart   |data     |String    |否| |规格的包邮开始时间|
|19|2|expressEnd     |data     |String    |否| |规格的包邮结束时间|

- 响应数据结构(操作失败示例)：

{无}

- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "amount": 222,
        "amountMeta": "ml",
        "expressCount": 22,
        "expressEnd": 1477612800000,
        "expressName": "圆通快递",
        "expressStart": 1477440000000,
        "expressStatus": 2,
        "formatId": "f0ddd6ba-74aa-48b6-87de-d7c17c38fe47",
        "label": 222,
        "meta": "ml",
        "postage": 222,
        "price": 22,
        "pricing": 22,
        "pricingDiscount": 22,
        "pricingEnd": 1477612800000,
        "pricingStart": 1477353600000,
        "pricingStatus": 2,
        "queue": 0,
        "status": 1,
        "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8",
        "weight": 0
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员更新一个规格
#### 描述
- 管理员更新一个规格

#### 请求地址
- http://localhost:8080/foodslab/format/mUpdate

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|typeId    |p     |String    |否| |所属的类型ID|
|03|2|typeId    |data     |String    |否| |所属的类型ID|
|03|2|formatId  |data     |String    |否| |规格的ID|
|04|2|label     |data     |String    |否| |规格标签|
|05|2|meta      |data     |String    |否| |规格的单位|
|06|2|amount    |data     |String    |否| |规格的数量|
|07|2|amountMeta|data     |String    |否| |规格的数量单位|
|08|2|price     |data     |String    |否| |规格的价格|
|09|2|postage   |data     |String    |否| |规格的邮费|
|10|2|pricingStatus  |data     |String    |否| |规格的打折状态|
|11|2|pricingDiscount|data     |String    |否| |规格的打折折扣|
|12|2|pricing        |data     |String    |否| |规格的现价|
|13|2|pricingStart   |data     |String    |否| |规格的打折开始时间|
|14|2|pricingEnd     |data     |String    |否| |规格的打折结束时间|
|15|2|expressStatus  |data     |String    |否| |规格的包邮状态|
|16|2|expressCount   |data     |String    |否| |规格的包邮数量|
|17|2|expressName    |data     |String    |否| |规格的包邮快递|
|18|2|expressStart   |data     |String    |否| |规格的包邮开始时间|
|19|2|expressEnd     |data     |String    |否| |规格的包邮结束时间|


- GET请求链接示例：http://localhost:8080/foodslab/format/mUpdate?p={"typeId":"afa35163-e198-487f-823b-8dda99a2b4bb","status":1,"label":"250","meta":"ml","amount":"22","amountMeta":"ml","price":"250","postage":"250","pricingStatus":1,"pricingDiscount":"250","pricing":"250","pricingStart":1470096000000,"pricingEnd":1470182400000,"expressStatus":1,"expressCount":"250","expressName":"圆通快递","expressStart":1470096000000,"expressEnd":1470182400000,"formatId":"39c0dae2-e5ea-4c6f-8a01-77444ad8617a","cs":"2429656B42A5EE9751C8933A7E18FC4F"}
- 请求数据结构示例：
```json
{
    "typeId": "afa35163-e198-487f-823b-8dda99a2b4bb",
    "status": 1,
    "label": "250",
    "meta": "ml",
    "amount": "22",
    "amountMeta": "ml",
    "price": "250",
    "postage": "250",
    "pricingStatus": 1,
    "pricingDiscount": "250",
    "pricing": "250",
    "pricingStart": 1470096000000,
    "pricingEnd": 1470182400000,
    "expressStatus": 1,
    "expressCount": "250",
    "expressName": "圆通快递",
    "expressStart": 1470096000000,
    "expressEnd": 1470182400000,
    "formatId": "39c0dae2-e5ea-4c6f-8a01-77444ad8617a",
    "cs": "2429656B42A5EE9751C8933A7E18FC4F"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|03|2|typeId    |data     |String    |否| |所属的类型ID|
|03|2|formatId  |data     |String    |否| |规格的ID|
|04|2|label     |data     |String    |否| |规格标签|
|05|2|meta      |data     |String    |否| |规格的单位|
|06|2|amount    |data     |String    |否| |规格的数量|
|07|2|amountMeta|data     |String    |否| |规格的数量单位|
|08|2|price     |data     |String    |否| |规格的价格|
|09|2|postage   |data     |String    |否| |规格的邮费|
|10|2|pricingStatus  |data     |String    |否| |规格的打折状态|
|11|2|pricingDiscount|data     |String    |否| |规格的打折折扣|
|12|2|pricing        |data     |String    |否| |规格的现价|
|13|2|pricingStart   |data     |String    |否| |规格的打折开始时间|
|14|2|pricingEnd     |data     |String    |否| |规格的打折结束时间|
|15|2|expressStatus  |data     |String    |否| |规格的包邮状态|
|16|2|expressCount   |data     |String    |否| |规格的包邮数量|
|17|2|expressName    |data     |String    |否| |规格的包邮快递|
|18|2|expressStart   |data     |String    |否| |规格的包邮开始时间|
|19|2|expressEnd     |data     |String    |否| |规格的包邮结束时间|


- 响应数据结构(操作失败示例)：
```json
{
    "code": 3000,
    "data": 88,
    "message": "fail"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "amount": 22,
        "amountMeta": "ml",
        "expressCount": 250,
        "expressEnd": 1470182400000,
        "expressName": "圆通快递",
        "expressStart": 1470096000000,
        "expressStatus": 1,
        "formatId": "39c0dae2-e5ea-4c6f-8a01-77444ad8617a",
        "label": 250,
        "meta": "ml",
        "postage": 250,
        "price": 250,
        "pricing": 250,
        "pricingDiscount": 250,
        "pricingEnd": 1470182400000,
        "pricingStart": 1470096000000,
        "pricingStatus": 1,
        "queue": 0,
        "status": 1,
        "typeId": "afa35163-e198-487f-823b-8dda99a2b4bb",
        "weight": 0
    },
    "message": "SERVER OK"
}
```
- 备注：无








