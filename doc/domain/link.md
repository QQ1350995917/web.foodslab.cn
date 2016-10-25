## [返回首页](../index.md)

## 用户读取链接
#### 描述
- 用户访问读取链接集合,包括一级链接以及子集链接

#### 请求地址
- http://localhost:8080/foodslab/link/retrieves

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|

- GET请求链接示例：http://localhost:8080/foodslab/link/retrieves
- 请求数据结构示例：

(无)

- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|label    |data     |String    |否	|    |链接名称|
|05|2|children |data     |jsonArray |否	|    |子链接集合|
|06|3|label    |children |String    |否	|    |子链接名称|
|07|3|href     |children |String    |否	|    |子链接地址|

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
            "children": [
                {
                    "href": "http://www.foodslab.cn",
                    "label": "北京网备"
                },
                {
                    "href": "http://www.foodslab.cn",
                    "label": "食品药监"
                },
                {
                    "href": "http://www.foodslab.cn",
                    "label": "工商信息"
                },
                {
                    "href": "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11000002000001",
                    "label": "北京网备"
                }
            ],
            "label": "备案信息"
        },
        {
            "children": [
                {
                    "href": "http://www.foodslab.cn",
                    "label": "一号店"
                },
                {
                    "href": "http://www.foodslab.cn",
                    "label": "天猫"
                },
                {
                    "href": "http://www.foodslab.cn",
                    "label": "淘宝"
                },
                {
                    "href": "http://www.foodslab.cn",
                    "label": "京东"
                }
            ],
            "label": "网络店铺"
        },
        {
            "children": [
                {
                    "href": "http://dingpw.com/",
                    "label": "食坊简介"
                },
                {
                    "href": "http://www.foodslab.cn",
                    "label": "微信关注"
                },
                {
                    "href": "http://www.foodslab.cn",
                    "label": "电子邮件"
                },
                {
                    "href": "http://www.foodslab.cn",
                    "label": "新浪微博"
                }
            ],
            "label": "关于我们"
        },
        {
            "children": [
                {
                    "href": "http://www.foodslab.cn",
                    "label": "安检机构"
                },
                {
                    "href": "http://www.foodslab.cn",
                    "label": "技术支持"
                },
                {
                    "href": "http://www.foodslab.cn",
                    "label": "技术支持"
                }
            ],
            "label": "友情链接"
        }
    ],
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员创建链接
#### 描述
- 管理员创建链接,包括创建顶级链接和子级链接,区别在于创建顶级链接不需要pid和href

#### 请求地址
- http://localhost:8080/foodslab/link/mCreate

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |描述|
|03|2|label     |p     |String    |否| |链接名称|
|04|2|href      |p     |String    |是| |链接地址,如果是顶级链接则不需要改项|
|05|2|pid       |p     |String    |是| |链接的父亲ID,如果为空则标示创建的是顶级链接|

- GET请求链接示例：http://localhost:8080/foodslab/link/mCreate?p={"label":"aaa","cs":"688117C7A0017657382797F1870D3D60"}
- 请求数据结构示例：
```json
{
    "cs": "688117C7A0017657382797F1870D3D60",
    "label": "aaa"

}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|linkId   |data     |String    |是|     |创建成功后返回的ID|
|05|2|label    |data     |String    |否|     |名称|
|06|2|href     |data     |String    |是|     |链接地址,如果是顶级链接则不需要改项|
|07|2|status   |data     |int       |是|     |创建成功后返回的状态|
|08|2|weight   |data     |int       |是|     |创建成功后返回的权重|
|09|2|pid      |data     |String    |是|     |链接的父亲ID,如果为空则标示创建的是顶级链接|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 406,
    "data": {
        "cs": "688117C7A0017657382797F1870D3D60",
        "label": "aaa"
    },
    "message": "REPEAT ERROR"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "cs": "688117C7A0017657382797F1870D3D60",
        "label": "aaa",
        "linkId": "abe4eb9a-82e3-4867-866d-58ad2a4d57cf",
        "pid": "abe4eb9a-82e3-4867-866d-58ad2a4d57cf",
        "status": 1,
        "weight": 0
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员修改链接
#### 描述
- 管理员修改链接属性,包括修改顶级链接和子级链接,顶级链接不需要修改href

#### 请求地址
- http://localhost:8080/foodslab/link/mUpdate

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |描述|
|03|2|linkId    |p     |String    |否| |链接ID|
|04|2|label     |p     |String    |否| |链接名称|
|05|2|href      |p     |String    |是| |链接地址,如果是顶级链接则不需要改项|
|06|2|pid       |p     |String    |是| |链接的父亲ID,如果为空则标示创建的是顶级链接|

- GET请求链接示例：http://localhost:8080/foodslab/link/mUpdate?p={"pid":"4bbf83cf-2ad4-4a93-90e3-df92a62f6e06","linkId":"eea10c2e-3556-4e69-a2e5-c9d48fb5edd8","label":"系列","href":"http://www.foodslab.cn","cs":"688117C7A0017657382797F1870D3D60"}
- 请求数据结构示例：
```json
{
    "pid": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06",
    "linkId": "eea10c2e-3556-4e69-a2e5-c9d48fb5edd8",
    "label": "联系我们",
    "href": "http://www.foodslab.cn",
    "cs": "688117C7A0017657382797F1870D3D60"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|linkId   |data     |String    |是|     |创建成功后返回的ID|
|05|2|label    |data     |String    |否|     |名称|
|06|2|href     |data     |String    |是|     |链接地址,如果是顶级链接则不需要改项|
|07|2|pid      |data     |String    |是|     |链接的父亲ID,如果为空则标示创建的是顶级链接|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 400,
    "data": {
        "href": "http://www.foodslab.cn",
        "label": "联系我们",
        "pid": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06"
    },
    "message": "PARAMETERS BAD"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "href": "http://www.foodslab.cn",
        "label": "系列",
        "linkId": "eea10c2e-3556-4e69-a2e5-c9d48fb5edd8",
        "pid": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06"
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员更新链接状态
#### 描述
- 管理员禁用/启用/删除链接

#### 请求地址
- http://localhost:8080/foodslab/link/mMark

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|linkId    |p     |String    |否| |链接ID|
|04|2|status    |p     |int       |否| |链接状态|

- GET请求链接示例：http://localhost:8080/foodslab/link/mMark?p={"pid":"d0f10595-73c0-4914-bc2e-72df747b13ca","status":-1,"cs":"D03613B535D4BE77A3AA44DD6D62A032"}
- 请求数据结构示例：
```json
{
    "linkId": "d0f10595-73c0-4914-bc2e-72df747b13ca",
    "status": -1,
    "cs": "D03613B535D4BE77A3AA44DD6D62A032"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|04|2|linkId   |data     |String    |否	|    |链接ID    |
|05|2|status   |data     |int       |否	|    |数据状态  |

- 响应数据结构(操作失败示例)：
```json
{
    "code": 400,
    "data": {
        "linkId": "d0f10595-73c0-4914-bc2e-72df747b13ca",
        "status": -3
    },
    "message": "PARAMETERS BAD"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "linkId": "d0f10595-73c0-4914-bc2e-72df747b13ca",
        "status": -1
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员交换链接权重
#### 描述
- 管理员交换链接权重

#### 请求地址
- http://localhost:8080/foodslab/link/mSwap

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|linkId1   |p     |String    |否| |链接1的ID|
|04|2|weight1   |p     |String    |否| |链接1的权重|
|05|2|linkId2   |p     |String    |否| |链接2的ID|
|06|2|weight2   |p     |String    |否| |链接2的权重|

- GET请求链接示例：http://localhost:8080/foodslab/link/mSwap?p=
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
|04|2|linkId1  |data     |String    |否	|    |链接1的ID|
|05|2|weight1  |data     |int       |否	|    |链接1的权重|
|06|2|linkId2  |data     |String    |否	|    |链接2的ID|
|07|2|weight2  |data     |int       |否	|    |链接2的权重|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 400,
    "data": {
        "linkId1": "c0ad3ba2-a37d-4018-b714-50ab9f42cffa",
        "linkId2": "86aa827c-805b-4a2d-931f-11a3e7abfd25",
        "weight1": 12,
        "weight2": 12
    },
    "message": "PARAMETERS BAD"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "linkId1": "83e16ba7-0f06-4f69-9807-552a10f6fc25",
        "linkId2": "eea10c2e-3556-4e69-a2e5-c9d48fb5edd8",
        "weight1": 14,
        "weight2": 12
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员读取链接列表
#### 描述
- 管理员读取链接列表,如果参数中包含了pid则表示读取的是子集链接

#### 请求地址
- http://localhost:8080/foodslab/link/mRetrieve

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|01|2|cs        |p     |String    |否| |cookie|
|02|2|pid       |p     |String    |是| |父级ID,为空则表示读取的是子级的链接|

- GET请求链接示例：http://localhost:8080/foodslab/link/mRetrieve?p={"pid":"4bbf83cf-2ad4-4a93-90e3-df92a62f6e06","cs":"61F04EA3E78768E556AFA9BB7B3FE44C"}
- 请求数据结构示例：
```json
{
    "pid": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06",
    "cs": "61F04EA3E78768E556AFA9BB7B3FE44C"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|03|1|linkId   |data     |String    |否	|    |链接的ID|
|03|1|label    |data     |String    |否	|    |链接的名称|
|03|1|href     |data     |String    |否	|    |链接的链接|
|03|1|status   |data     |int       |否	|    |链接的状态|
|03|1|weight   |data     |int       |否	|    |链接的权重|
|03|1|pid      |data     |String    |否	|    |练级的父ID|

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
            "href": "http://www.foodslab.cn",
            "label": "系列",
            "linkId": "eea10c2e-3556-4e69-a2e5-c9d48fb5edd8",
            "pid": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06",
            "status": 1,
            "weight": 14
        },
        {
            "href": "http://www.foodslab.cn",
            "label": "电子邮件",
            "linkId": "83e16ba7-0f06-4f69-9807-552a10f6fc25",
            "pid": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06",
            "status": 2,
            "weight": 12
        },
        {
            "href": "http://www.foodslab.cn",
            "label": "微信关注",
            "linkId": "7276e6c9-4d1e-49f1-82d5-ba66ad9e1f54",
            "pid": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06",
            "status": 2,
            "weight": 12
        },
        {
            "href": "http://www.foodslab.cn",
            "label": "新浪微博",
            "linkId": "c14ac78e-8672-4782-afb2-f53bcd6cb003",
            "pid": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06",
            "status": 2,
            "weight": 12
        },
        {
            "href": "http://dingpw.com/",
            "label": "食坊简介",
            "linkId": "36ef905a-c8b1-476f-9f80-4ef475bde289",
            "pid": "4bbf83cf-2ad4-4a93-90e3-df92a62f6e06",
            "status": 2,
            "weight": 12
        }
    ],
    "message": "SERVER OK"
}
```
- 备注：无