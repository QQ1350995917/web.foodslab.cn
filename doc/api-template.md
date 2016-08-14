## 接口模板
#### 描述
- 接口描述

#### 请求地址
- http://localhost:8080/foodslab

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|managerId      |      |String    |否| |描述|
|01|1|key      |Pkey      |String    |否| |描述|

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
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|

- 响应数据结构示例：

```json
{
    "code": 0,
    "data": 88,
    "message": "this is a tip message"
}
```
- 备注：无