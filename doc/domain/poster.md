## [返回首页](../index.md)


## 用户获取海报
#### 描述
- 用户获取海报

#### 请求地址
- http://localhost:8080/foodslab/poster

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|

- GET请求链接示例：http://localhost:8080/foodslab/poster/retrieves
- 请求数据结构示例：

(无)

- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|1|name     |data     |String    |否	|    |海报的名称|
|05|1|imageUrl |data     |String    |否	|    |海报的图片地址|
|06|1|href     |data     |String    |否	|    |海报的点击地址|
|07|1|clickable|data     |int       |否	|    |海报能否点击|

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
            "clickable": 2,
            "href": "http://localhost:8080/foodslab/webapp/asserts/images/poster0.jpg",
            "imageUrl": "http://localhost:8080/foodslab/webapp/asserts/images/poster0.jpg",
            "name": "贺新年大促"
        },
        {
            "clickable": 1,
            "href": "http://localhost:8080/foodslab/webapp/asserts/images/poster1.jpg",
            "imageUrl": "http://localhost:8080/foodslab/webapp/asserts/images/poster1.jpg",
            "name": "贺新年大促"
        }
    ],
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员创建海报
#### 描述
- 管理员创建海报

#### 请求地址
- http://localhost:8080/foodslab/poster/mCreate

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|name      |p     |String    |否| |海报的名称|
|04|2|clickable |p     |String    |是| |海报是否可以点击,1不可点击,2可以点击,默认1|
|05|2|href      |p     |String    |是| |海报点击时候的跳转地址,为空则表示不可以点击|
|06|2|fileId    |p     |String    |是| |海报文件ID,如果不填写则表示,没有显示的图片|

- GET请求链接示例：http://localhost:8080/foodslab/poster/mCreate?p={"cs":"DC230F2B1DD968379D4FF9E57C4EE875","name":"贺新年大促","clickable":2,"href":"http://www.foodslab.cn","fileId":"29dec9e4c45a451780b1d552a188c98a"}
- 请求数据结构示例：
```json
{
    "cs": "DC230F2B1DD968379D4FF9E57C4EE875",
    "name": "贺新年大促",
    "clickable": 2,
    "href": "http://www.foodslab.cn",
    "fileId": "29dec9e4c45a451780b1d552a188c98a"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|1|posterId |data     |String    |否	|    |海报ID|
|05|1|name     |data     |String    |否	|    |海报名称|
|06|1|fileId   |data     |String    |否	|    |海报的图片ID|
|07|1|imageUrl |data     |String    |是	|    |海报的图片地址|
|08|1|clickable|data     |String    |否	|    |海报是否可以点击|
|09|1|href     |data     |String    |是	|    |海报点击后的地址|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 400,
    "data": {
        "clickable": 2,
        "fileId": "29dec9e4c45a451780b1d552a188c98a",
        "href": "http://www.foodslab.cn",
        "status": 0
    },
    "message": "PARAMETERS BAD"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "clickable": 2,
        "fileId": "29dec9e4c45a451780b1d552a188c98a",
        "href": "http://www.foodslab.cn",
        "name": "贺新年大促",
        "posterId": "ec8e487c-e5ef-4bdb-815a-7371d6eb324e",
        "status": 0
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员更新海报
#### 描述
- 接口描述

#### 请求地址
- http://localhost:8080/foodslab/poster/mUpdate

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|posterId  |p     |String    |否| |海报的ID|
|03|2|name      |p     |String    |否| |海报的名称|
|04|2|clickable |p     |String    |是| |海报是否可以点击,1不可点击,2可以点击,默认1|
|05|2|href      |p     |String    |是| |海报点击时候的跳转地址,为空则表示不可以点击|
|06|2|fileId    |p     |String    |是| |海报文件ID,如果不填写则表示,没有显示的图片|

- GET请求链接示例：http://localhost:8080/foodslab/poster/mUpdate?p={"cs":"DC230F2B1DD968379D4FF9E57C4EE875","posterId":"ec8e487c-e5ef-4bdb-815a-7371d6eb324e","name":"小促销","clickable":1,"href":"http://www.foodslab.cn/taobao","fileId":"29dec9e4c45a451780b1d552a188c98a"}
- 请求数据结构示例：
```json
{
    "cs": "DC230F2B1DD968379D4FF9E57C4EE875",
    "posterId": "ec8e487c-e5ef-4bdb-815a-7371d6eb324e",
    "name": "小促销",
    "clickable": 1,
    "href": "http://www.foodslab.cn/taobao",
    "fileId": "29dec9e4c45a451780b1d552a188c98a"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|1|posterId |data     |String    |否	|    |海报ID|
|05|1|name     |data     |String    |否	|    |海报名称|
|06|1|fileId   |data     |String    |否	|    |海报的图片ID|
|07|1|imageUrl |data     |String    |是	|    |海报的图片地址|
|08|1|clickable|data     |String    |否	|    |海报是否可以点击|
|09|1|href     |data     |String    |是	|    |海报点击后的地址|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 400,
    "data": {
        "clickable": 1,
        "fileId": "29dec9e4c45a451780b1d552a188c98a",
        "href": "http://www.foodslab.cn/taobao",
        "name": "哈哈哈"
    },
    "message": "PARAMETERS BAD"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "clickable": 1,
        "fileId": "29dec9e4c45a451780b1d552a188c98a",
        "href": "http://www.foodslab.cn/taobao",
        "name": "小促销",
        "posterId": "ec8e487c-e5ef-4bdb-815a-7371d6eb324e"
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员修改海报状态
#### 描述
- 管理员禁用/启用/删除海报的操作

#### 请求地址
- http://localhost:8080/foodslab/poster/mMark

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|posterId  |p     |String    |否| |海报的ID|
|04|2|status    |p     |String    |否| |海报的状态|

- GET请求链接示例：http://localhost:8080/foodslab/poster/mMark?p={"cs":"DC230F2B1DD968379D4FF9E57C4EE875","posterId":"ec8e487c-e5ef-4bdb-815a-7371d6eb324e","status":2}
- 请求数据结构示例：
```json
{
    "cs": "DC230F2B1DD968379D4FF9E57C4EE875",
    "posterId": "ec8e487c-e5ef-4bdb-815a-7371d6eb324e",
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
|04|1|posterId |data     |String    |否	|    |海报的ID|
|05|1|status   |data     |int       |否	|    |海报的状态|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 400,
    "data": {
        "posterId": "ec8e487c-e5ef-4bdb-815a-7371d6eb324e",
        "status": 3
    },
    "message": "PARAMETERS BAD"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "posterId": "ec8e487c-e5ef-4bdb-815a-7371d6eb324e",
        "status": 2
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员交换海报权重
#### 描述
- 管理员交换海报权重

#### 请求地址
- http://localhost:8080/foodslab/poster/mSwap

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|posterId1 |p     |String    |否| |海报1的ID|
|04|2|posterId2 |p     |String    |否| |海报2的ID|
|05|2|weight1   |p     |int       |否| |海报1的权重|
|06|2|weight2   |p     |int       |否| |海报2的权重|

- GET请求链接示例：http://localhost:8080/foodslab/poster/mSwap?p={"cs":"DC230F2B1DD968379D4FF9E57C4EE875","posterId1":"07d4c22d-05eb-4d3f-b805-6c41874b13c1","posterId2":"56b732a9-77c7-4f93-a4e0-08627482e6f8","weight1":2,"weight2":1}
- 请求数据结构示例：
```json
{
    "cs": "DC230F2B1DD968379D4FF9E57C4EE875",
    "posterId1": "07d4c22d-05eb-4d3f-b805-6c41874b13c1",
    "posterId2": "56b732a9-77c7-4f93-a4e0-08627482e6f8",
    "weight1": 2,
    "weight2": 1
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|posterId1|data     |String    |否 |    |海报1的ID|
|05|2|posterId2|data     |String    |否 |    |海报2的ID|
|06|2|weight1  |data     |int       |否 |    |海报1的权重|
|07|2|weight2  |data     |int       |否 |    |海报2的权重|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 400,
    "data": {
        "posterId1": "07d4c22d-05eb-4d3f-b805-6c41874b13c1",
        "posterId2": "56b732a9-77c7-4f93-a4e0-08627482e6f8",
        "weight1": 2,
        "weight2": 2
    },
    "message": "PARAMETERS BAD"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "posterId1": "07d4c22d-05eb-4d3f-b805-6c41874b13c1",
        "posterId2": "56b732a9-77c7-4f93-a4e0-08627482e6f8",
        "weight1": 2,
        "weight2": 1
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员读取海报集合
#### 描述
- 管理员读取海报集合

#### 请求地址
- http://localhost:8080/foodslab/poster/mRetrieves

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|

- GET请求链接示例：http://localhost:8080/foodslab/poster/mRetrieves?p={"cs":"E26774F73A21CE6CAA00DC3C81297F09"}
- 请求数据结构示例：
```json
{
    "cs": "E26774F73A21CE6CAA00DC3C81297F09"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|posterId |data     |String    |否	|    |海报的ID|
|05|2|name     |data     |String    |否	|    |海报的名称|
|06|2|clickable|data     |String    |否	|    |海报是否可以点击|
|07|2|href     |data     |String    |否	|    |海报的点击后的链接|
|08|2|status   |data     |int       |否	|    |海报的状态|
|09|2|weight   |data     |int       |否	|    |海报的权重|

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
            "clickable": 1,
            "href": "http://localhost:8080/foodslab/webapp/asserts/images/poster0.jpg",
            "name": "1111111",
            "posterId": "07d4c22d-05eb-4d3f-b805-6c41874b13c1",
            "status": 2,
            "weight": 2
        },
        {
            "clickable": 1,
            "fileId": "29dec9e4c45a451780b1d552a188c98a",
            "href": "http://www.foodslab.cn/taobao",
            "name": "哈哈哈",
            "posterId": "ec8e487c-e5ef-4bdb-815a-7371d6eb324e",
            "status": 2,
            "weight": 0
        }
    ],
    "message": "SERVER OK"
}
```
- 备注：无