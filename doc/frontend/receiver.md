# 收货人接口 [返回首页](../index.md)

## 新建收货人
#### 描述
- 用户新创建一个收货人的信息

#### 请求地址
- http://localhost:8080/foodslab/receiver/create

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|sessionId |      |String    |否| |sessionId|
|02|1|name      |      |String    |否| |收货人名称|
|03|1|phone0    |      |String    |否| |收货人电话|
|04|1|phone1    |      |String    |是| |备用电话|
|05|1|province  |      |String    |否| |省份|
|06|1|city      |      |String    |否| |地区|
|07|1|county    |      |String    |否| |县|
|08|1|town      |      |String    |否| |乡镇|
|09|1|village   |      |String    |是| |村,不存在村级单位|
|10|1|append    |      |String    |是| |追加的地址信息|

- GET请求链接示例：http://localhost:8080/foodslab/receiver/create?p=加密参数
- 请求数据结构示例：
```json
{
    "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "name": "丁朋伟",
    "phone0": "12312341234",
    "phone1": "12312341234",
    "province": "北京",
    "city": "北京",
    "county": "昌平区",
    "town": "回龙观",
    "village": "新龙城",
    "append": "12A-1-123"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code       |	       |String    |否	|    |响应码|
|02|1|message    |         |String    |否	|    |相应消息|
|03|1|data       |         |jsonObject|否	|    |数据集合体|
|04|2|receiverId |data     |String    |是	|    |如果为空创建失败|
|05|2|name       |data     |String    |否	|    ||
|06|2|phone0     |data     |String    |否	|    ||
|07|2|phone1     |data     |String    |否	|    ||
|08|2|province   |data     |String    |否	|    ||
|09|2|city       |data     |String    |否	|    ||
|10|2|county     |data     |String    |否	|    ||
|11|2|town       |data     |String    |否	|    ||
|12|2|village    |data     |String    |是	|    ||
|13|2|append     |data     |String    |是	|    |如果为空则无追加|

- 响应数据结构示例：(执行成功,返回创建成功的数据ID以及提交的数据)
```json
{
    "code": 3050,
    "data": {
        "receiverId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "name": "丁朋伟",
        "phone0": "12312341234",
        "phone1": "12312341234",
        "province": "北京",
        "city": "北京",
        "county": "昌平区",
        "town": "回龙观",
        "village": "新龙城",
        "append": "12A-1-123"
    },
    "message": "成功"
}
```
- 响应数据结构示例：(执行失败,返回提交的数据)
```json
{
    "code": 3000,
    "data": {
        "name": "丁朋伟",
        "phone0": "12312341234",
        "phone1": "12312341234",
        "province": "北京",
        "city": "北京",
        "county": "昌平区",
        "town": "回龙观",
        "village": "新龙城",
        "append": "12A-1-123"
    },
    "message": "失败"
}
```
- 备注：无


## 修改收货人
#### 描述
- 用户修改一个收货人的信息

#### 请求地址
- http://localhost:8080/foodslab/receiver/update

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|sessionId |      |String    |否| |sessionId|
|02|1|receiverId|      |String    |否| |receiverId|
|03|1|name      |      |String    |否| |收货人名称|
|04|1|phone0    |      |String    |否| |收货人电话|
|05|1|phone1    |      |String    |是| |备用电话|
|06|1|province  |      |String    |否| |省份|
|07|1|city      |      |String    |否| |地区|
|08|1|county    |      |String    |否| |县|
|09|1|town      |      |String    |否| |乡镇|
|10|1|village   |      |String    |是| |村,不存在村级单位|
|11|1|append    |      |String    |是| |追加的地址信息|

- GET请求链接示例：http://localhost:8080/foodslab/receiver/update?p=加密参数
- 请求数据结构示例：
```json
{
    "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "receiverId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "name": "丁朋伟",
    "phone0": "12312341234",
    "phone1": "12312341234",
    "province": "北京",
    "city": "北京",
    "county": "昌平区",
    "town": "回龙观",
    "village": "新龙城",
    "append": "12A-1-123"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code       |	       |String    |否	|    |响应码|
|02|1|message    |         |String    |否	|    |相应消息|
|03|1|data       |         |jsonObject|否	|    |数据集合体|
|04|2|receiverId |data     |String    |是	|    ||
|05|2|name       |data     |String    |否	|    ||
|06|2|phone0     |data     |String    |否	|    ||
|07|2|phone1     |data     |String    |否	|    ||
|08|2|province   |data     |String    |否	|    ||
|09|2|city       |data     |String    |否	|    ||
|10|2|county     |data     |String    |否	|    ||
|11|2|town       |data     |String    |否	|    ||
|12|2|village    |data     |String    |是	|    ||
|13|2|append     |data     |String    |是	|    |如果为空则无追加|

- 响应数据结构示例：(执行成功,返回创建成功的数据ID以及提交的数据)
```json
{
    "code": 3050,
    "data": {
        "receiverId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "name": "丁朋伟",
        "phone0": "12312341234",
        "phone1": "12312341234",
        "province": "北京",
        "city": "北京",
        "county": "昌平区",
        "town": "回龙观",
        "village": "新龙城",
        "append": "12A-1-123"
    },
    "message": "成功"
}
```
- 响应数据结构示例：(执行失败,返回提交的数据)
```json
{
    "code": 3000,
    "data": {
        "receiverId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "name": "丁朋伟",
        "phone0": "12312341234",
        "phone1": "12312341234",
        "province": "北京",
        "city": "北京",
        "county": "昌平区",
        "town": "回龙观",
        "village": "新龙城",
        "append": "12A-1-123"
    },
    "message": "失败"
}
```
- 备注：无


## 删除收货人
#### 描述
- 用户删除一个收货人的信息

#### 请求地址
- http://localhost:8080/foodslab/receiver/delete

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|sessionId |      |String    |否| |sessionId|
|02|1|receiverId|      |String    |否| |receiverId|

- GET请求链接示例：http://localhost:8080/foodslab/receiver/delete?p=加密参数
- 请求数据结构示例：
```json
{
    "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "receiverId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code       |	       |String    |否	|    |响应码|
|02|1|message    |         |String    |否	|    |相应消息|
|03|1|data       |         |jsonObject|否	|    |数据集合体|
|04|2|receiverId |data     |String    |是	|    ||
|05|2|name       |data     |String    |否	|    ||
|06|2|phone0     |data     |String    |否	|    ||
|07|2|phone1     |data     |String    |否	|    ||
|08|2|province   |data     |String    |否	|    ||
|09|2|city       |data     |String    |否	|    ||
|10|2|county     |data     |String    |否	|    ||
|11|2|town       |data     |String    |否	|    ||
|12|2|village    |data     |String    |是	|    ||
|13|2|append     |data     |String    |是	|    |如果为空则无追加|

- 响应数据结构示例：(执行成功,返回提交的数据,不含ID)
```json
{
    "code": 3050,
    "data": {
        "name": "丁朋伟",
        "phone0": "12312341234",
        "phone1": "12312341234",
        "province": "北京",
        "city": "北京",
        "county": "昌平区",
        "town": "回龙观",
        "village": "新龙城",
        "append": "12A-1-123"
    },
    "message": "成功"
}
```
- 响应数据结构示例：(执行失败,返回提交的数据)
```json
{
    "code": 3000,
    "data": {
        "receiverId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "name": "丁朋伟",
        "phone0": "12312341234",
        "phone1": "12312341234",
        "province": "北京",
        "city": "北京",
        "county": "昌平区",
        "town": "回龙观",
        "village": "新龙城",
        "append": "12A-1-123"
    },
    "message": "失败"
}
```
- 备注：无


## 设置默认收货人
#### 描述
- 用户设置一个默认收货人的信息

#### 请求地址
- http://localhost:8080/foodslab/receiver/king

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|sessionId |      |String    |否| |sessionId|
|02|1|receiverId|      |String    |否| |receiverId|

- GET请求链接示例：http://localhost:8080/foodslab/receiver/king?p=加密参数
- 请求数据结构示例：
```json
{
    "sessionId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
    "receiverId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code       |	       |String    |否	|    |响应码|
|02|1|message    |         |String    |否	|    |相应消息|
|03|1|data       |         |jsonObject|否	|    |数据集合体|
|04|2|receiverId |data     |String    |是	|    ||
|05|2|name       |data     |String    |否	|    ||
|06|2|phone0     |data     |String    |否	|    ||
|07|2|phone1     |data     |String    |否	|    ||
|08|2|province   |data     |String    |否	|    ||
|09|2|city       |data     |String    |否	|    ||
|10|2|county     |data     |String    |否	|    ||
|11|2|town       |data     |String    |否	|    ||
|12|2|village    |data     |String    |是	|    ||
|13|2|append     |data     |String    |是	|    |如果为空则无追加|
|14|2|status     |data     |int       |否   |    |数据书否是默认收货人,2普通地址,3默认收货人地址|

- 响应数据结构示例：(执行成功,返回提交的数据,不含ID)
```json
{
    "code": 3050,
    "data": {
        "receiverId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "name": "丁朋伟",
        "phone0": "12312341234",
        "phone1": "12312341234",
        "province": "北京",
        "city": "北京",
        "county": "昌平区",
        "town": "回龙观",
        "village": "新龙城",
        "append": "12A-1-123",
        "status": "3"
    },
    "message": "成功"
}
```
- 响应数据结构示例：(执行失败,返回提交的数据)
```json
{
    "code": 3000,
    "data": {
        "receiverId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
        "name": "丁朋伟",
        "phone0": "12312341234",
        "phone1": "12312341234",
        "province": "北京",
        "city": "北京",
        "county": "昌平区",
        "town": "回龙观",
        "village": "新龙城",
        "append": "12A-1-123",
        "status": "2"
    },
    "message": "失败"
}
```
- 备注：无


## 读取收货人
#### 描述
- 用户读取收货人的信息

#### 请求地址
- http://localhost:8080/foodslab/receiver/retrieve

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|sessionId |      |String    |否| |sessionId|

- GET请求链接示例：http://localhost:8080/foodslab/receiver/retrieve?p=加密参数
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
|01|1|code       |	       |String    |否	|    |响应码|
|02|1|message    |         |String    |否	|    |相应消息|
|03|1|data       |         |jsonArray |否	|    |数据集合体|
|04|2|receiverId |data     |String    |是	|    ||
|05|2|name       |data     |String    |否	|    ||
|06|2|phone0     |data     |String    |否	|    ||
|07|2|phone1     |data     |String    |否	|    ||
|08|2|province   |data     |String    |否	|    ||
|09|2|city       |data     |String    |否	|    ||
|10|2|county     |data     |String    |否	|    ||
|11|2|town       |data     |String    |否	|    ||
|12|2|village    |data     |String    |是	|    ||
|13|2|append     |data     |String    |是	|    |如果为空则无追加|
|14|2|status     |data     |int       |否   |    |数据书否是默认收货人,2普通地址,3默认收货人地址|

- 响应数据结构示例：(执行成功)
```json
{
    "code": 3050,
    "data": [
        {
            "receiverId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
            "name": "丁朋伟",
            "phone0": "12312341234",
            "phone1": "12312341234",
            "province": "北京",
            "city": "北京",
            "county": "昌平区",
            "town": "回龙观",
            "village": "新龙城",
            "append": "12A-1-123",
            "status": "2"
        },
        {
            "receiverId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
            "name": "丁朋伟",
            "phone0": "12312341234",
            "phone1": "12312341234",
            "province": "北京",
            "city": "北京",
            "county": "昌平区",
            "town": "回龙观",
            "village": "新龙城",
            "append": "12A-1-123",
            "status": "2"
        },
        {
            "receiverId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
            "name": "丁朋伟",
            "phone0": "12312341234",
            "phone1": "12312341234",
            "province": "北京",
            "city": "北京",
            "county": "昌平区",
            "town": "回龙观",
            "village": "新龙城",
            "append": "12A-1-123",
            "status": "3"
        }
    ],
    "message": "成功"
}
```
- 响应数据结构示例：(执行失败,返回空数据)
```json
{
    "code": 3000,
    "message": "失败"
}
```
- 备注：无