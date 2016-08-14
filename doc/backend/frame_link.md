## [返回首页](../index.md)

## 新建链接
#### 描述
- 新建链接

#### 请求地址
- http://localhost:8080/foodslab/link/create

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|label      |Pkey      |String    |否| |描述|
|02|1|href      |Pkey      |String    |是| |描述|
|03|1|pid      |Pkey      |String    |是| |描述|

- GET请求链接示例：http://localhost:8080/foodslab/link/create?label=关于我们
- 请求数据结构示例：
```json
{
    "label": "关于我们",
    "href": "http://www.foodslab.cn",
    "pid": "this is pid"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonObject |否	|    |数据集合体|
|04|2|linkId     |data         |jsonObject |否	|    |数据集合体|
|05|2|pid     |data         |String |否	|    |数据集合体|
|06|2|label     |data         |String |否	|    |数据集合体|
|07|2|status     |data         |int |否	|    |数据集合体|

- 响应数据结构示例：

```json
{
    "code": 200,
    "data": {
        "linkId": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06",
        "pid": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06",
        "label": "关于我们",
        "status": "1"
    },
    "message": "创建成功"
}
```
- 备注：无

## 读取链接
#### 描述
- 读取链接

#### 请求地址
- http://localhost:8080/foodslab/link

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|managerId      |      |String    |否| |描述|

- GET请求链接示例：http://localhost:8080/foodslab/link?maangerId=xxxx
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
|03|1|data     |         |jsonObject |否	|    |数据集合体|
|04|2|linkId     |data         |jsonObject |否	|    |数据集合体|
|05|2|pid     |data         |String |否	|    |数据集合体|
|06|2|label     |data         |String |否	|    |数据集合体|
|07|2|status     |data         |int |否	|    |数据集合体|
|08|2|children     |data         |jsonArray |否	|    |数据集合体|
|09|3|linkId     |children         |String |否	|    |数据集合体|
|10|3|pid     |children         |String |否	|    |数据集合体|
|11|3|label     |children         |String |否	|    |数据集合体|
|12|3|status     |children         |int |否	|    |数据集合体|

- 响应数据结构示例：

```json
{
    "code": 0,
    "data": 88,
    "message": "this is a tip message"
}
```
- 备注：无