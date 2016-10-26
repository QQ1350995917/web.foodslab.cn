# 产品系列接口 [返回首页](../index.md) [返回产品接口](product.md)

## 管理员创建系列
#### 描述
- 管理员创建产品系列,后台接口,请求时候服务器检测权限

#### 请求地址
- http://localhost:8080/foodslab/series/mCreate

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|label     |p     |String    |否| |系列的名称|

- GET请求链接示例：http://localhost:8080/foodslab/series/mCreate?p={"cs":"B82C0915A6B228497FA5DA44A8EE2CB9","label":"辣椒酱"}
- 请求数据结构示例：
```json
{
    "cs": "B82C0915A6B228497FA5DA44A8EE2CB9",
    "label": "辣椒酱"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|seriesId |data     |String    |否	|    |系列的ID|
|05|2|label    |data     |String    |否	|    |系列的名称|
|06|2|status   |data     |int       |否	|    |系列的状态|
|07|2|queue    |data     |int       |否	|    |系列的顺序|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 406,
    "data": {
        "label": "辣椒酱"
    },
    "message": "REPEAT ERROR"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "label": "辣椒酱",
        "queue": 0,
        "seriesId": "820424a9-e9e1-4a6c-8b4b-f683b2acfac4",
        "status": 1
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员更新系列
#### 描述
- 管理员更新产品系列的名称

#### 请求地址
- http://localhost:8080/foodslab/series/mUpdate

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|seriesId  |p     |String    |否| |系列的ID|
|04|2|label     |p     |String    |否| |系列的名称|

- GET请求链接示例：http://localhost:8080/foodslab/series/mUpdate?p={"cs":"B82C0915A6B228497FA5DA44A8EE2CB9","seriesId":"07064b80-c2a5-4372-925d-43d238b31422","label":"高大上"}
- 请求数据结构示例：
```json
{
    "cs": "B82C0915A6B228497FA5DA44A8EE2CB9",
    "seriesId": "07064b80-c2a5-4372-925d-43d238b31422",
    "label": "高大上"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|seriesId |data     |String    |否 |    |系列的ID|
|05|2|label    |data     |String    |否 |    |系列的名称|


- 响应数据结构(操作失败示例)：
```json
{
    "code": 406,
    "data": {
        "label": "高大上",
        "seriesId": "07064b80-c2a5-4372-925d-43d238b31422"
    },
    "message": "REPEAT ERROR"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "label": "高大上",
        "seriesId": "07064b80-c2a5-4372-925d-43d238b31422"
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员更新系列状态
#### 描述
- 管理员更新产品系列的状态

#### 请求地址
- http://localhost:8080/foodslab/series/mMark

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|seriesId  |p     |String    |否| |系列的ID|
|04|2|status    |p     |int       |否| |系列的状态|

- GET请求链接示例：http://localhost:8080/foodslab/series/mMark?p={"cs":"B82C0915A6B228497FA5DA44A8EE2CB9","seriesId":"07064b80-c2a5-4372-925d-43d238b31422","status":1}
- 请求数据结构示例：
```json
{
    "cs": "B82C0915A6B228497FA5DA44A8EE2CB9",
    "seriesId": "07064b80-c2a5-4372-925d-43d238b31422",
    "status": 1
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|seriesId |data     |String    |否	|    |系列的ID|
|05|2|status   |data     |int       |否	|    |系列的状态|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 400,
    "data": {
        "status": 4
    },
    "message": "PARAMETERS BAD"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "seriesId": "07064b80-c2a5-4372-925d-43d238b31422",
        "status": 1
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员读取系列集合
#### 描述
- 管理员读取系列集合

#### 请求地址
- http://localhost:8080/foodslab/series/mRetrieves

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|

- GET请求链接示例：http://localhost:8080/foodslab/series/mRetrieves?p={"cs":"B82C0915A6B228497FA5DA44A8EE2CB9"}
- 请求数据结构示例：
```json
{
    "cs": "B82C0915A6B228497FA5DA44A8EE2CB9"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|seriesId |data     |String    |否	|    |系列ID|
|05|2|label    |data     |String    |否	|    |系列名称|
|06|2|status   |data     |int       |否	|    |系列状态|
|07|2|queue    |data     |int       |否	|    |系列顺序|

- 响应数据结构(操作失败示例)：

(无)

- 响应数据结构(操作成功示例)：
```json
{
    "code": 204,
    "data": [],
    "message": "SERVER OK"
}
```
```json
{
    "code": 200,
    "data": [
        {
            "label": "石磨香油",
            "queue": 6,
            "seriesId": "05844fe5-a675-4afc-8d66-2220ee8f9eb6",
            "status": 2
        },
        {
            "label": "芝麻碎",
            "queue": 6,
            "seriesId": "0e2129cd-ae29-4400-bde3-d0e01cdf12c7",
            "status": 2
        }
    ],
    "message": "SERVER OK"
}
```
- 备注：无





## 用户读取
#### 描述
- 用户读取产品系列的集合,前台接口

#### 请求地址
- http://localhost:8080/foodslab/series/retrieves

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|

- GET请求链接示例：http://localhost:8080/foodslab/series/retrieves
- 请求数据结构示例：

(无)

- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|seriesId |data     |String    |否	|    |系列的ID|
|05|2|label    |data     |String    |否	|    |系列的名称|
|06|2|queue    |data     |int       |否	|    |系列的顺序|

- 响应数据结构(操作失败示例)：

(无)

- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": [
        {
            "label": "石磨香油",
            "queue": 0,
            "seriesId": "05844fe5-a675-4afc-8d66-2220ee8f9eb6"
        },
        {
            "label": "芝麻碎",
            "queue": 0,
            "seriesId": "0e2129cd-ae29-4400-bde3-d0e01cdf12c7"
        },
        {
            "label": "压榨香油",
            "queue": 0,
            "seriesId": "38d13617-77a8-46b7-812d-a6b19d43a4be"
        }
    ],
    "message": "SERVER OK"
}
```
- 备注：无