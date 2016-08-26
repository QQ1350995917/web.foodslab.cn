## [返回首页](../index.md)

## 获取链接数据
#### 描述
- 获得各个页面的页脚上显示的链接数据

#### 请求地址
- http://localhost:8080/foodslab/meta/link

#### 请求方式
- get

#### 请求参数 无
- GET请求链接示例：http://localhost:8080/foodslab/meta/link
- 请求数据结构示例：无
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
    "code": 200,
    "data": [
        {
            "linkId": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06",
            "createTime": 1471086238000,
            "children": [
                {
                    "linkId": "36ef905a-c8b1-476f-9f80-4ef475bde289",
                    "createTime": 1471651379000,
                    "pid": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06",
                    "updateTime": 1471651379000,
                    "label": "食坊简介",
                    "href": "http://www.foodslab.cn",
                    "queue": 99,
                    "status": 1
                }
            ],
            "pid": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06",
            "updateTime": 1471618788000,
            "label": "关于我们",
            "queue": 1,
            "status": 1
        }
    ],
    "message": "this is tip message!"
}
```
- 备注：无

## 获取地址数据
#### 描述
- 获取人员属性的地址数据

#### 请求地址
- http://localhost:8080/foodslab/meta/address

#### 请求方式
- get

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|pcode     |      |String    |是| |为空这表示顶级数据|

- GET请求链接示例：http://localhost:8080/foodslab/meta/address?pcode=000000000000
- 请求数据结构示例：无

- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|04|2|code     |data     |String    |否	|    |code|
|04|2|pcode    |data     |String    |否	|    |上级code|
|04|2|label     |data     |String    |否	|    |显示名称|

- 响应数据结构示例：

```json
{
    "code": 200,
    "data": [
        {
            "code": "110000000000",
            "pcode": "110000000000",
            "label": "北京",
            "queue": 0
        }
    ],
    "message": "this is tip message!"
}
```
- 备注：无