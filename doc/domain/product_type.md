# 产品类型接口 [返回首页](../index.md)


## 创建类型
#### 描述
- 创建产品类型,后台接口,请求时候服务器检测权限

#### 请求地址
- http://localhost:8080/foodslab/type/mCreate

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|sessionId |          |String    |否| |sessionID|
|01|1|seriesId  |          |String    |否| |类型的ID|
|02|1|label     |          |String    |否| |类型的名称|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
    "label": "家庭装"
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


## 更新类型
#### 描述
- 更新产品类型名称,后台接口,请求时候服务器检测权限

#### 请求地址
- http://localhost:8080/foodslab/type/mUpdate

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|sessionId |          |String    |否| |sessionID|
|01|1|seriesId  |          |String    |否| |系列的ID|
|01|1|typeId    |          |String    |否| |类型的ID|
|02|1|label     |          |String    |否| |类型的名称|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
    "typeId": "fe4095fc-9158-4008-93d5-0dcc96f29801",
    "label": "家庭装"
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
|06|2|typeId   |data     |String    |否	|    |操作失败的时无该数据|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 3000,
    "data": {
        "label": "商用装",
        "queue": 0,
        "seriesId": "b2523f4e-77c5-4a40-810e-c1e436e80677",
        "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "status": -2,
        "typeId": "4cf353bd-d862-4ba9-bafc-b0fde4dfadb3"
    },
    "message": "fail"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 3050,
    "data": {
        "label": "商用装",
        "queue": 0,
        "seriesId": "b2523f4e-77c5-4a40-810e-c1e436e80677",
        "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "status": -2,
        "typeId": "4cf353bd-d862-4ba9-bafc-b0fde4dfadb3"
    },
    "message": "success"
}
```
- 备注：无


## 更新状态
#### 描述
- 更新产品类型状态,后台接口,请求时候服务器检测权限

#### 请求地址
- http://localhost:8080/foodslab/type/mMark

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|sessionId |          |String    |否| |sessionID|
|01|1|seriesId  |          |String    |否| |系列的ID|
|01|1|typeId    |          |String    |否| |类型的ID|
|02|1|status    |          |String    |否| |类型的状态|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
    "typeId": "fe4095fc-9158-4008-93d5-0dcc96f29801",
    "status": 1
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonObject|否	|    |相应的数据|
|04|2|status   |data     |int       |否	|    |类型的状态|
|05|2|seriesId |data     |String    |否	|    |类型所属的系列ID|
|06|2|typeId   |data     |String    |否	|    |类型的ID|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 3000,
    "data": {
        "queue": 0,
        "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
        "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "status": 1,
        "typeId": "xxx"
    },
    "message": "fail"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 3050,
    "data": {
        "queue": 0,
        "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
        "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "status": 1,
        "typeId": "2a344bd5-f2c6-4c7a-b9bc-981ca33f965f"
    },
    "message": "success"
}
```
- 备注：无


## 更新简介
#### 描述
- 更新产品类型简介,后台接口,请求时候服务器检测权限

#### 请求地址
- http://localhost:8080/foodslab/type/mSummary

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|sessionId |          |String    |否| |sessionID|
|01|1|seriesId  |          |String    |否| |系列的ID|
|01|1|typeId    |          |String    |否| |类型的ID|
|02|1|summary   |          |Text      |否| |类型的简介|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
    "typeId": "fe4095fc-9158-4008-93d5-0dcc96f29801",
    "summary": "这是一个产品类型的简介"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonObject|否	|    |相应的数据|
|04|2|summary  |data     |Text      |否	|    |类型简介|
|05|2|seriesId |data     |String    |否	|    |系列ID|
|06|2|typeId   |data     |String    |否	|    |类型ID|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 3000,
    "data": {
        "queue": 0,
        "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
        "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "status": -2,
        "summary": "这是一个产品类型的简介",
        "typeId": "xxxx"
    },
    "message": "fail"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 3050,
    "data": {
        "queue": 0,
        "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
        "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "status": -2,
        "summary": "这是一个产品类型的简介",
        "typeId": "fe4095fc-9158-4008-93d5-0dcc96f29801"
    },
    "message": "success"
}
```
- 备注：无


## 更新说明
#### 描述
- 更新产品类型说明,后台接口,请求时候服务器检测权限

#### 请求地址
- http://localhost:8080/foodslab/type/mDirections

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|sessionId |          |String    |否| |sessionID|
|01|1|seriesId  |          |String    |否| |系列的ID|
|01|1|typeId    |          |String    |否| |类型的ID|
|02|1|directions|          |Html      |否| |类型的说明|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
    "typeId": "fe4095fc-9158-4008-93d5-0dcc96f29801",
    "directions": "<H>这是一个产品类型的说明</H>"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code      |  	      |String    |否	|    |响应码|
|02|1|message   |         |String    |否	|    |相应消息|
|03|1|data      |         |jsonObject|否	|    |相应的数据|
|04|2|directions|data     |Html      |否	|    |类型的说明|
|05|2|seriesId  |data     |String    |否	|    |系列ID|
|06|2|typeId    |data     |String    |否|    |类型ID|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 3000,
    "data": {
        "directions": "<H>这是一个产品类型的说明</H>",
        "queue": 0,
        "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
        "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "status": -2,
        "typeId": "xxxx"
    },
    "message": "fail"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 3050,
    "data": {
        "directions": "<H>这是一个产品类型的说明</H>",
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


## 前台读取类型
#### 描述
- 前台读取产品类型详情,前台接口


## 后台读取类型
#### 描述
- 后台读取产品类型详情,后台接口,请求时候服务器检测权限