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
|01|1|managerId      |      |String    |否| |描述|
|02|1|label    |      |String    |否| |描述|
|03|1|href     |      |String    |是| |一级连接可以为空,二级连接不可以为空|
|04|1|pid      |      |String    |是| |如果pid是空,则认为是在创建一级连接|

- GET请求链接示例：http://localhost:8080/foodslab/link/create?label=关于我们
- 请求数据结构示例：
```json
{
    "managerId": "xxxx",
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
    "code": 200,
    "data": [
        {
            "linkId": "2d1742f0-7cd1-4a06-894e-76ebef2a0abf",
            "createTime": 1471086435000,
            "children": [
                {
                    "linkId": "17fd89f2-0444-4abd-8045-65900bdaa575",
                    "createTime": 1471137739000,
                    "pid": "2d1742f0-7cd1-4a06-894e-76ebef2a0abf",
                    "updateTime": 1471139015000,
                    "label": "北京网备",
                    "href": "http://www.foodslab.cn",
                    "status": 1
                },
                {
                    "linkId": "380ebffc-84d4-4b32-9884-f9a99f414ca7",
                    "createTime": 1471137743000,
                    "pid": "2d1742f0-7cd1-4a06-894e-76ebef2a0abf",
                    "updateTime": 1471139040000,
                    "label": "食品药监",
                    "href": "http://www.foodslab.cn",
                    "status": 1
                },
                {
                    "linkId": "6eed4b56-12c5-42cc-92ca-b5a9122851ef",
                    "createTime": 1471137735000,
                    "pid": "2d1742f0-7cd1-4a06-894e-76ebef2a0abf",
                    "updateTime": 1471139063000,
                    "label": "工商信息",
                    "href": "http://www.foodslab.cn",
                    "status": 1
                }
            ],
            "pid": "2d1742f0-7cd1-4a06-894e-76ebef2a0abf",
            "updateTime": 1471086435000,
            "label": "备案信息",
            "status": 1
        },
        {
            "linkId": "31826dbe-2ed3-4485-90c4-c6f7df14cf4c",
            "createTime": 1471086418000,
            "children": [],
            "pid": "31826dbe-2ed3-4485-90c4-c6f7df14cf4c",
            "updateTime": 1471086418000,
            "label": "网络店铺",
            "status": 1
        },
        {
            "linkId": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06",
            "createTime": 1471086238000,
            "children": [],
            "pid": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06",
            "updateTime": 1471086238000,
            "label": "关于我们",
            "status": 1
        },
        {
            "linkId": "4c668bf1-4905-4180-a9fd-99ba6d1d6709",
            "createTime": 1471086408000,
            "children": [],
            "pid": "4c668bf1-4905-4180-a9fd-99ba6d1d6709",
            "updateTime": 1471086408000,
            "label": "友情链接",
            "status": 1
        }
    ],
    "message": ""
}
```
- 备注：无


## 更新连接
#### 描述
- 更新二级连接的信息

#### 请求地址
- http://localhost:8080/foodslab/link/update?linkId=17fd89f2-0444-4abd-8045-65900bdaa575&label=北京网备&href=http://www.foodslab.cn&status=1;

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|managerId      |      |String    |否| |描述|
|02|1|linkId      |      |String    |否| |描述|
|03|1|label      |      |String    |是| |不涉及更新的选项可以为空|
|04|1|href      |      |String    |是| |不涉及更新的选项可以为空|
|05|1|status      |      |String    |是| |不涉及更新的选项可以为空|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "managerId": "xxxx",
    "linkId": "xxxx",
    "label": "xxxx",
    "href": "xxxx",
    "status": -1
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|03|1|linkId     |data        |String |否	|    |数据id|
|03|1|label     |data        |String |否	|    |数据标签|
|03|1|href     |data         |String |否	|    |数据连接|
|03|1|status     |data         |int |否	|    |数据状态|

- 响应数据结构示例：

```json
{
    "code": 200,
    "data": {
        "href": "http://www.foodslab.cn",
        "label": "北京网备",
        "linkId": "17fd89f2-0444-4abd-8045-65900bdaa575",
        "status": 1
    },
    "message": "更新成功"
}
```
- 备注：无