# 产品类型接口 [返回首页](../index.md)

## 管理员读取类型
#### 描述
- 管理员根据系列的Id读取其下的类型

#### 请求地址
- http://localhost:8080/foodslab/type/mRetrieves

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|seriesId  |p     |String    |否| |描述|

- GET请求链接示例：http://localhost:8080/foodslab/type/mRetrieves?p={"seriesId":"05844fe5-a675-4afc-8d66-2220ee8f9eb6","cs":"535A9B3C7806B5BEC54C92867EF6D78F"}
- 请求数据结构示例：
```json
{
    "seriesId": "05844fe5-a675-4afc-8d66-2220ee8f9eb6",
    "cs": "535A9B3C7806B5BEC54C92867EF6D78F"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|typeId   |data     |String    |否	|    |类型的Id|
|05|2|seriesId |data     |String    |否	|    |类型的系列ID|
|06|2|label    |data     |String    |否	|    |类型的名称|
|07|2|status   |data     |int       |否	|    |类型的状态|
|08|2|queue    |data     |int       |否	|    |类型的顺序|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 204,
    "data": [],
    "message": "SERVER OK"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": [
        {
            "label": "商用装",
            "queue": 5,
            "seriesId": "05844fe5-a675-4afc-8d66-2220ee8f9eb6",
            "status": 2,
            "typeId": "afa35163-e198-487f-823b-8dda99a2b4bb"
        },
        {
            "label": "家庭装",
            "queue": 5,
            "seriesId": "05844fe5-a675-4afc-8d66-2220ee8f9eb6",
            "status": 2,
            "typeId": "cc36900c-1d0f-410f-bb34-19c1ee7eb903"
        }
    ],
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员创建系列
#### 描述
- 管理员创建系列

#### 请求地址
- http://localhost:8080/foodslab/type/mCreate

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|seriesId  |p     |String    |否| |所属的系列ID|
|04|2|label     |p     |String    |否| |类型的名称|

- GET请求链接示例：http://localhost:8080/foodslab/type/mCreate?p={"seriesId":"05844fe5-a675-4afc-8d66-2220ee8f9eb6","label":"家庭装","cs":"31832EFE3935F3DE34ED90BB8C2B0C2C"}
- 请求数据结构示例：
```json
{
    "seriesId": "05844fe5-a675-4afc-8d66-2220ee8f9eb6",
    "label": "家庭装",
    "cs": "31832EFE3935F3DE34ED90BB8C2B0C2C"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|typeId   |data     |String    |否	|    |类型的ID|
|05|3|seriesId |data     |String    |否	|    |类型所属系列的ID|
|06|4|label    |data     |String    |否	|    |类型的名称|
|07|5|status   |data     |int       |否	|    |类型的状态|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 406,
    "data": {
        "label": "家庭装",
        "seriesId": "05844fe5-a675-4afc-8d66-2220ee8f9eb6"
    },
    "message": "REPEAT ERROR"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "label": "家庭装",
        "seriesId": "05844fe5-a675-4afc-8d66-2220ee8f9eb6",
        "status": 1,
        "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8"
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员更新类型
#### 描述
- 管理员更新类型

#### 请求地址
- http://localhost:8080/foodslab/type/mUpdate

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|seriesId  |p     |String    |否| |类型所属的系列ID|
|04|2|typeId    |p     |String    |否| |类型的ID|
|05|2|label     |p     |String    |否| |类型的名称|

- GET请求链接示例：http://localhost:8080/foodslab/type/mUpdate?p={"cs":"31832EFE3935F3DE34ED90BB8C2B0C2C","seriesId":"05844fe5-a675-4afc-8d66-2220ee8f9eb6","typeId":"7cf157af-b6b6-49a4-b738-d37e48ca4cb8","label":"商用装"}
- 请求数据结构示例：
```json
{
    "cs": "31832EFE3935F3DE34ED90BB8C2B0C2C",
    "seriesId": "05844fe5-a675-4afc-8d66-2220ee8f9eb6",
    "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8",
    "label": "商用装"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|typeId   |data     |String    |否	|    |类型的ID|
|05|3|seriesId |data     |String    |否	|    |类型所属系列的ID|
|06|4|label    |data     |String    |否	|    |类型的名称|
|07|5|status   |data     |int       |否	|    |类型的状态|


- 响应数据结构(操作失败示例)：
```json
{
    "code": 406,
    "data": {
        "label": "商用装",
        "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8",
        "seriesId": "05844fe5-a675-4afc-8d66-2220ee8f9eb6"
    },
    "message": "REPEAT ERROR"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "label": "商用装",
        "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8",
        "seriesId": "05844fe5-a675-4afc-8d66-2220ee8f9eb6"
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员更新类型的简介
#### 描述
- 管理员更新类型的简介

#### 请求地址
- http://localhost:8080/foodslab/type/mSummary

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|typeId    |p     |String    |否| |类型的ID|
|04|2|summary   |p     |String    |否| |类型的简介|

- GET请求链接示例：http://localhost:8080/foodslab/type/mSummary?p={"cs":"31832EFE3935F3DE34ED90BB8C2B0C2C","typeId":"7cf157af-b6b6-49a4-b738-d37e48ca4cb8","summary":"这里填写简介信息"}
- 请求数据结构示例：
```json
{
    "cs": "31832EFE3935F3DE34ED90BB8C2B0C2C",
    "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8",
    "summary": "这里填写简介信息"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|typeId   |data     |String    |否	|    |类型的ID|
|05|3|summary  |data     |String    |否	|    |类型的简介|


- 响应数据结构(操作失败示例)：
```json
{
    "code": 500,
    "data": {
        "summary": "这里填写简介信息",
        "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8"
    },
    "message": "SERVER ERROR"
}
```
- 响应数据结构(操作成功示例)：
```json

{
    "code": 200,
    "data": {
        "summary": "这里填写简介信息",
        "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8"
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员更新类型的说明
#### 描述
- 管理员更新类型的说明

#### 请求地址
- http://localhost:8080/foodslab/type/mDirections

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|typeId    |p     |String    |否| |类型的ID|
|04|2|directions|p     |String    |否| |类型的说明|

- GET请求链接示例：http://localhost:8080/foodslab/type/mDirections?p={"cs":"31832EFE3935F3DE34ED90BB8C2B0C2C","typeId":"7cf157af-b6b6-49a4-b738-d37e48ca4cb8","directions":"&lt;h1&gt;这里填写html格式的说明信息&lt;/h1&gt;"}
- 请求数据结构示例：
```json
{
    "cs": "31832EFE3935F3DE34ED90BB8C2B0C2C",
    "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8",
    "directions": "<h1>这里填写html格式的说明信息</h1>"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|typeId   |data     |String    |否	|    |类型的ID|
|05|3|directions|data     |String    |否	|    |类型的说明|


- 响应数据结构(操作失败示例)：
```json
{
    "code": 500,
    "data": {
        "directions": "<h1>这里填写html格式的说明信息</h1>",
        "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8"
    },
    "message": "SERVER ERROR"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "directions": "<h1>这里填写html格式的说明信息</h1>",
        "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8"
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员修改类型状态
#### 描述
- 管理员修改状态

#### 请求地址
- http://localhost:8080/foodslab/type/mMark

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|typeId    |p     |String    |否| |类型的ID|
|04|2|status    |p     |String    |否| |类型的状态|

- GET请求链接示例：http://localhost:8080/foodslab/type/mMark?p={"cs":"31832EFE3935F3DE34ED90BB8C2B0C2C","typeId":"7cf157af-b6b6-49a4-b738-d37e48ca4cb8","status":2}
- 请求数据结构示例：
```json
{
    "cs": "31832EFE3935F3DE34ED90BB8C2B0C2C",
    "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8",
    "status": 2
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|1|typeId   |data     |String    |否	|    |类型的ID|
|05|1|status   |data     |int       |否	|    |类型的状态|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 400,
    "data": {
        "status": 4,
        "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8"
    },
    "message": "PARAMETERS BAD"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "status": 2,
        "typeId": "7cf157af-b6b6-49a4-b738-d37e48ca4cb8"
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员读取类型详情
#### 描述
- 管理员读取类型详情

#### 请求地址
- http://localhost:8080/foodslab/type/mRetrieve

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|typeId    |p     |String    |否| |类型的ID|

- GET请求链接示例：http://localhost:8080/foodslab/type/mRetrieve?p={"cs":"31832EFE3935F3DE34ED90BB8C2B0C2C","typeId":"afa35163-e198-487f-823b-8dda99a2b4bb"}
- 请求数据结构示例：
```json
{
    "cs": "31832EFE3935F3DE34ED90BB8C2B0C2C",
    "typeId": "afa35163-e198-487f-823b-8dda99a2b4bb"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|seriesId |data     |String    |否	|    |类型的ID|
|05|2|typeId   |data     |String    |否	|    |类型所属的系列的ID|
|06|2|label    |data     |String    |否	|    |类型的名称|
|07|2|summary  |data     |String    |否	|    |类型的简介|
|08|2|directions|data    |String    |否	|    |类型的详细信息|
|09|2|status   |data     |int       |否	|    |类型的状态|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 400,
    "data": {},
    "message": "PARAMETERS BAD"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "directions": "<h1 style=\"text-align: center;\">这里填写的是石磨香油商用装的说明</h1><div><h1 style=\"text-align: center;\">这里填写的是石磨香油商用装的说明</h1></div><div><br></div><div>adfasdfasdfasdfasfasdfaadfasdfasdfasdfasfasdfaadfasdfasdfasdfasfasdfaadfasdfasdfasdfasfasdfaadfasdfasdfasdfasfasdfaadfasdfasdfasdfasfasdfaadfasdfas</div><div>dfasdfasfasdfaadfasdfasdfasdfasfasdfaadfasdfasdfasdfasfasdfaadfasdfasdfasdfasfasdfaadfasdfasdfasdfasfasdfaadfasdfasdfasdfasfasdfaadfasdfasdfasdfasf</div><div>asdfaadfasdfasdfasdfasfasdfa</div><div><h1 style=\"text-align: center;\"><br></h1></div><div><div><h1 style=\"text-align: center;\">22</h1></div></div>",
        "label": "商用装",
        "seriesId": "05844fe5-a675-4afc-8d66-2220ee8f9eb6",
        "status": 2,
        "summary": "石磨芝麻香油商用装，适用于火锅店，麻辣烫店铺，烧烤店铺等。石磨芝麻香油商用装，适用于火锅店，麻辣烫店铺，烧烤店铺等。石磨芝麻香油商用装，适用于火锅店，麻辣烫店铺，烧烤店铺等。石磨芝麻香油商用装，适用于火锅店，麻辣烫店铺，烧烤店铺等。22",
        "typeId": "afa35163-e198-487f-823b-8dda99a2b4bb"
    },
    "message": "SERVER OK"
}
```
- 备注：无