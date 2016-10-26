## 接口模板
#### 描述
- 接口描述

#### 请求地址
- http://localhost:8080/foodslab

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|key       |p     |String    |否| |描述|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "code": 0,
    "data": 88,
    "message": "this is a tip message"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|

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
    "code": 3050,
    "data": 88,
    "message": "success"
}
```
- 备注：无