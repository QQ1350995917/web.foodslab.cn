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
