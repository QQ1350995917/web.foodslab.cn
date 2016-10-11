## [返回首页](../index.md)
## 创建海报
#### 描述
- 创建一个海报,当没有posterId的时候标示创建的是唯一的一个顶级海报

#### 请求地址
- http://localhost:8080/foodslab/poster/create

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|managerId     |      |String    |否| |描述|
|01|1|status      |      |int    |是| |为空默认为0|
|02|1|clickable      |      |int    |是| |为空默认为0|
|03|1|href      |      |int    |是| |可为空|
|04|1|pid      |      |String    |是| |为空标示创建的是唯一的一个顶级海报|

- GET请求链接示例：http://localhost:8080/foodslab/poster/create?managerId=xxxx
- 请求数据结构示例：
```json
{
    "managerId": "xxxx",
    "status": 0,
    "clickable": 0,
    "href": "xxxx",
    "pid": "xxxx"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|

- 响应数据结构示例：

```json
{
    "code": 200,
    "message": "创建成功"
}
```
- 备注：无

## 读取海报
#### 描述
- 读取海报列表

#### 请求地址
- http://localhost:8080/foodslab/poster/

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|managerId      |      |String    |否| |描述|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "managerId": "xxxx"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|03|2|posterId |data     |String |否	|    |数据ID|
|04|2|status   |data     |int |否	|    |数据状态|
|05|2|clickable|data     |int |否	|    |是否可点击|
|06|2|href     |data     |int |否	|    |链接地址|
|07|2|start    |data     |long |否	|    |显示开始时间|
|08|2|end      |data     |long |否	|    |显示结束时间|
|09|2|pid      |data     |String |否	|    |数据父ID|
|10|2|createTime|data    |long |否	|    |创建时间|
|11|2|updateTime|data    |long |否	|    |更新时间|
|12|2|children  |data    |jsonArray |否	|    |子节点|
|13|3|posterId |children     |String |否	|    |数据ID|
|14|3|status   |children     |int |否	|    |数据状态|
|15|3|clickable|children     |int |否	|    |是否可点击|
|16|3|href     |children     |int |否	|    |链接地址|
|17|3|start    |children     |long |否	|    |显示开始时间|
|18|3|end      |children     |long |否	|    |显示结束时间|
|19|3|pid      |children     |String |否	|    |数据父ID|
|20|3|createTime|children    |long |否	|    |创建时间|
|21|3|updateTime|children    |long |否	|    |更新时间|

- 响应数据结构示例：

```json
{
    "code": 0,
    "data": {
        "createTime": 1471253379000,
        "children": [
            {
                "createTime": 1471255051000,
                "clickable": 1,
                "pid": "56b732a9-77c7-4f93-a4e0-08627482e6f8",
                "updateTime": 1471255051000,
                "href": "http://www.foodslab.cn",
                "posterId": "07d4c22d-05eb-4d3f-b805-6c41874b13c1",
                "status": 1
            }
        ],
        "clickable": 0,
        "start": 1472601600000,
        "end": 1472515200000,
        "pid": "56b732a9-77c7-4f93-a4e0-08627482e6f8",
        "updateTime": 1471252091000,
        "href": "",
        "posterId": "56b732a9-77c7-4f93-a4e0-08627482e6f8",
        "status": 1
    },
    "message": "this is tip message!"
}
```
- 备注：无


## 更新海报
#### 描述
- 更新海报

#### 请求地址
- http://localhost:8080/foodslab/update/

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|managerId      |      |String    |否| |描述|
|02|1|start      |      |String    |否| |描述|
|03|1|end        |      |String    |否| |描述|
|04|1|clickable|      |String    |否| |描述|
|05|1|href     |      |String    |否| |描述|
|06|1|status   |      |String    |否| |描述|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "start":"xxxx",
    "end":"xxxx",
    "clickable": 1,
    "href": "http://www.foodslab.cn",
    "status": 1
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
    "data": {
        "start": 1472601600000,
        "end": 1472515200000,
        "createTime": 1471255051000,
        "clickable": 1,
        "pid": "56b732a9-77c7-4f93-a4e0-08627482e6f8",
        "updateTime": 1471255051000,
        "href": "http://www.foodslab.cn",
        "posterId": "07d4c22d-05eb-4d3f-b805-6c41874b13c1",
        "status": 1
    },
    "message": "this is tip message!"
}
```
- 备注：无