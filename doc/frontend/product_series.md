# 产品系列接口 [返回首页](../index.md)

## 创建系列
#### 描述
- 创建产品系列,后台接口,请求时候服务器检测权限

#### 请求地址
- http://localhost:8080/foodslab/series/mCreate

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|sessionId |          |String    |否| |sessionID|
|02|1|label     |          |String    |否| |系列的名称|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "label": "石磨香油"
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
|05|2|seriesId |data     |String    |是	|    |操作失败的时无该数据|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 3000,
    "data": {
        "label": "石磨香油",
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
        "label": "石磨香油",
        "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
        "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "status": -2
    },
    "message": "success"
}
```
- 备注：无


## 更新系列
#### 描述
- 更新产品系列的名称,后台接口,请求时候服务器检测权限

#### 请求地址
- http://localhost:8080/foodslab/series/mUpdate

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|sessionId |          |String    |否| |sessionID|
|02|1|seriesId  |          |String    |否| |seriesId|
|03|1|label     |          |String    |否| |系列的名称|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "seriesId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "label": "石磨香油"
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

- 响应数据结构(操作失败示例)：
```json
{
    "code": 3000,
    "data": {
        "label": "石磨香油",
        "seriesId": "xxx",
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
        "label": "石磨香油",
        "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
        "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "status": -2
    },
    "message": "success"
}
```
- 备注：无


## 更新状态
#### 描述
- 更新产品系列的状态,后台接口,请求时候服务器检测权限

#### 请求地址
- http://localhost:8080/foodslab/series/mMark

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|sessionId |          |String    |否| |sessionID|
|02|1|seriesId  |          |String    |否| |seriesId|
|03|1|status    |          |int       |否| |枚举状态码,-1=删除,0=禁用,1=正常|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "seriesId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "status": -1
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonObject|否	|    |相应的数据|
|04|2|status   |data     |int       |否	|    |枚举状态码,-1=删除,0=禁用,1=正常|
|05|2|seriesId |data     |String    |否	|    |提交的数据|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 3000,
    "data": {
        "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321cx",
        "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "status": -1
    },
    "message": "fail"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 3050,
    "data": {
        "seriesId": "64cd6220-1fa8-4fec-b944-182c09d2321c",
        "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "status": -1
    },
    "message": "success"
}
```
- 备注：无


## 后台读取
#### 描述
- 后台读取产品系列的集合,后台接口,请求时候服务器检测权限

#### 请求地址
- http://localhost:8080/foodslab/series/mRetrieves

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|

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
|04|2|label    |data     |String    |否	|    |系列的名称|
|04|2|status   |data     |int       |否	|    |枚举状态码,-1=删除,0=禁用,1=正常|
|05|2|seriesId |data     |String    |否	|    |系列的ID|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 3000,
    "data": [],
    "message": "fail"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 3050,
    "data": [
        {
            "label": "白芝麻",
            "seriesId": "3cd62990-0683-4e0f-b051-93ef363e8c39",
            "status": -2
        },
        {
            "label": "石磨香油",
            "seriesId": "b2523f4e-77c5-4a40-810e-c1e436e80677",
            "status": -2
        },
        {
            "label": "吊炉花生",
            "seriesId": "c081fe20-098e-4ef9-8be6-1d8788cb8057",
            "status": -2
        },
        {
            "label": "石磨麻酱",
            "seriesId": "c7df824a-744d-445f-8bed-7039f0cecf0b",
            "status": -2
        }
    ],
    "message": "success"
}
```
- 备注：无


## 前台读取
#### 描述
- 前台读取产品系列的集合,前台接口

#### 请求地址
- http://localhost:8080/foodslab/series/retrieves

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonObject|否	|    |相应的数据|
|04|2|label    |data     |String    |否	|    |系列的名称|
|05|2|seriesId |data     |String    |否	|    |系列的ID|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 3000,
    "data": [],
    "message": "fail"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 3050,
    "data": [
        {
            "label": "白芝麻",
            "seriesId": "3cd62990-0683-4e0f-b051-93ef363e8c39",
            "status": -2
        },
        {
            "label": "石磨香油",
            "seriesId": "b2523f4e-77c5-4a40-810e-c1e436e80677",
            "status": -2
        },
        {
            "label": "吊炉花生",
            "seriesId": "c081fe20-098e-4ef9-8be6-1d8788cb8057",
            "status": -2
        },
        {
            "label": "石磨麻酱",
            "seriesId": "c7df824a-744d-445f-8bed-7039f0cecf0b",
            "status": -2
        }
    ],
    "message": "success"
}
```
- 备注：无