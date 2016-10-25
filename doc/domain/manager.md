## [返回首页](../index.md)

## 管理员登录
#### 描述
- 接口描述 管理员后台登录

#### 请求地址
- http://localhost:8080/foodslab/manager/mLogin

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|loginName |p     |String    |否| |管理员登录名|
|03|2|password  |p     |String    |否| |管理员登录密码,登录密码不少于8位|

- GET请求链接示例：- http://localhost:8080/foodslab/manager/mLogin?p={"loginName":"aaa","password":"aaa"}
- 请求数据结构示例：
```json
{
    "loginName": "aaa",
    "password": "aaa"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonObject|否	|    |数据集合体|
|04|2|cs       |data     |String    |否	|    |cookie|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 400,
    "message": "PARAMETERS BAD"
}
```
```json
{
    "code": 400,
    "data": {},
    "message": "PARAMETERS BAD"
}
```
```json
{
    "code": 400,
    "data": {
        "password": ""
    },
    "message": "PARAMETERS BAD"
}
```
```json
{
    "code": 401,
    "data": {
        "loginName": "aaa",
        "password": "aaa"
    },
    "message": "LOGIN NAME OR PASSWORD FAIL"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "cs": "0BD100BDCEFBA2B8AE2BCA717228F592"
    },
    "message": "LOGIN SUCCESS"
}
```
- 备注：无





## 管理员读取账户信息
#### 描述
- 接口描述 管理员读取自己账户信息

#### 请求地址
- http://localhost:8080/foodslab/manager/mRetrieve

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs |p     |String    |否| |管理员登录名|

- GET请求链接示例：- http://localhost:8080/foodslab/manager/mRetrieve?p={"cs":"0BD100BDCEFBA2B8AE2BCA717228F592"}
- 请求数据结构示例：
```json
{
    "cs": "0BD100BDCEFBA2B8AE2BCA717228F592"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonObject|否	|    |数据集合体|
|04|2|cs       |data     |String    |否	|    |cookie|
|05|2|loginName|data     |String    |否	|    |登录名称|
|06|2|username |data     |String    |否	|    |用户名称|
|07|2|password |data     |String    |否	|    |登录密码|
|08|2|menus    |data     |jsonArray |否	|    |管理菜单集合|
|09|3|menuId   |menus    |String    |否	|    |菜单ID|
|10|4|label    |menus    |String    |否	|    |菜单名称|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 408,
    "data": {
        "cs": "0BD100BDCEFBA2B8AE2BCA717228F592"
    },
    "message": "LOGIN TIMEOUT"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "cs": "0BD100BDCEFBA2B8AE2BCA717228F592",
        "loginName": "aaa",
        "menus": [
            {
                "menuId": "511434e69a5711e69f33a24fc0d9649c"
                "label": "订单管理"
            }
        ],
        "password": "aaa",
        "username": "aaaa"
    },
    "message": "this is tip message!"
}
```
- 备注：无





## 管理员更新账户信息
#### 描述
- 接口描述 管理员更新自己账户的用户名和密码信息

#### 请求地址
- http://localhost:8080/foodslab/manager/mUpdate

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|username  |p     |String    |否| |管理员的用户名|
|04|2|password  |p     |String    |否| |管理员的登录密码|

- GET请求链接示例：http://localhost:8080/foodslab/manager/mUpdate?p={"cs":"0BD100BDCEFBA2B8AE2BCA717228F592","username":"aaaa","password":"aaaa"}
- 请求数据结构示例：
```json
{
    "cs": "0BD100BDCEFBA2B8AE2BCA717228F592",
    "username": "aaaa",
    "password": "aaaa"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonObject|否	|    |数据对象|
|04|2|cs       |data     |String    |否	|    |提交的cookie数据|
|05|2|username |data     |String    |否	|    |提交的用户名数据|
|06|2|password |data     |String    |否	|    |提交的密码数据|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 400,
    "data": {
        "cs": "0BD100BDCEFBA2B8AE2BCA717228F592",
        "username": "aaaaaaa"
    },
    "message": "PARAMETERS BAD"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "cs": "0BD100BDCEFBA2B8AE2BCA717228F592",
        "password": "aaaa",
        "username": "aaaa"
    },
    "message": "this is tip message!"
}
```
- 备注：无





## 管理员检测是否登录
#### 描述
- 接口描述 管理员检测cookie是否已经超时

#### 请求地址
- http://localhost:8080/foodslab/manager/mSession

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie |

- GET请求链接示例：http://localhost:8080/foodslab/manager/mSession?p={"cs": "0BD100BDCEFBA2B8AE2BCA717228F592"}
- 请求数据结构示例：
```json
{
    "cs": "0BD100BDCEFBA2B8AE2BCA717228F592"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonObject|否	|    |数据对象|
|04|2|cs       |data     |String    |否	|    |cookie |

- 响应数据结构(操作失败示例)：
```json
{
    "code": 408,
    "data": {
        "cs": "0BD100BDCEFBA2B8AE2BCA717228F592"
    },
    "message": "LOGIN TIMEOUT"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "cs": "0BD100BDCEFBA2B8AE2BCA717228F592"
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员退出登录
#### 描述
- 接口描述 管理员退出登录

#### 请求地址
- http://localhost:8080/foodslab/manager/mExit

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p  |      |jsonObject|否| |参数名称|
|02|2|cs |p     |String    |否| |cookie|

- GET请求链接示例：http://localhost:8080/foodslab/manager/mExit?p={"cs": "0BD100BDCEFBA2B8AE2BCA717228F592"}
- 请求数据结构示例：
```json
{
    "cs": "0BD100BDCEFBA2B8AE2BCA717228F592"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonObject|否	|    |数据对象|
|04|2|cs       |data     |String    |否	|    |cookie |

- 响应数据结构(操作失败示例)：
```json
{
    "code": 408,
    "data": {
        "cs": "0BD100BDCEFBA2B8AE2BCA717228F592"
    },
    "message": "LOGIN TIMEOUT"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "message": "SERVER OK"
}
```
- 备注：无





## 读取管理员列表
#### 描述
- 管理员读取管理员列表

#### 请求地址
- http://localhost:8080/manager/MRetrieves

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |          |jsonObject|否| |参数名称|
|02|2|cs        |          |String    |否| |cookie|

- GET请求链接示例：http://localhost:8080/manager/MRetrieves?p={"cs": "0BD100BDCEFBA2B8AE2BCA717228F592"}
- 请求数据结构示例：
```json
{
    "cs": "0BD100BDCEFBA2B8AE2BCA717228F592"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|04|2|managerId|data     |String    |否	|    |管理员ID|
|05|2|loginName|data     |String    |否	|    |管理员登录名|
|06|2|username |data     |String    |否	|    |管理员用户名|
|07|2|password |data     |String    |否	|    |管理员登录密码|
|08|2|status   |data     |int       |否	|    |管理员状态|
|09|2|menus    |data     |jsonArray |否	|    |管理员菜单|
|10|3|menuId   |menus    |String    |否	|    |管理员菜单ID|
|11|3|label    |menus    |String    |否	|    |管理员菜单名称|
|12|3|category |menus    |int       |否	|    |管理员菜单种类|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 408,
    "data": {
        "cs": "0BD100BDCEFBA2B8AE2BCA717228F592"
    },
    "message": "LOGIN TIMEOUT"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": [
        {
            "loginName": "ccc",
            "managerId": "709c0572-5918-4818-b212-0f0a827633c2",
            "menus": [
                {
                    "category": 2,
                    "label": "产品管理",
                    "menuId": "17d1a324-ca6f-4f1c-8e58-fdd4fdb1b9d7"
                },
                {
                    "category": 2,
                    "label": "订单管理",
                    "menuId": "c7c1677e-d320-4cdf-9820-f97a4cf187ce"
                }
            ],
            "password": "ccc",
            "status": 2,
            "username": "ccc"
        },
        {
            "loginName": "aaa",
            "managerId": "39bf0681-8871-4cf6-88cb-65e3b91dd25c",
            "menus": [],
            "password": "aaa",
            "status": 2,
            "username": "aaa"
        }
    ],
    "message": "this is tip message!"
}
```
- 备注：无





## 新建管理员
#### 描述
- 创建一个新的管理员

#### 请求地址
- http://localhost:8080/manager/MCreate

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |          |jsonObject|否| |参数名称|
|02|2|cs        |          |String    |否| |cookie|
|03|2|loginName |          |String    |否| |登录名称|
|04|2|username  |          |String    |否| |用户名称|
|05|2|password  |          |String    |否| |登录密码|
|06|2|menus     |          |jsonString|否| |菜单集合|
|07|3|menuId    |menus     |String    |否| |菜单ID|
|08|3|label     |menus     |String    |否| |菜单名称|

示例：http://localhost:8080/manager/MCreate?p={"username":"ddd","password":"ddd","menus":[{"label":"管理员","menuId":"c341aa66-3775-493f-93cf-358346c3477b"},{"label":"皮肤设置","menuId":"75a55868-669e-4f72-a368-20302bc79be5"}],"cs":"5000AE0035701567CDDFFF9872727F5C"}
```json
{
    "loginName": "ddd",
    "username": "ddd",
    "password": "ddd",
    "menus": [
        {
            "label": "管理员",
            "menuId": "c341aa66-3775-493f-93cf-358346c3477b"
        },
        {
            "label": "皮肤设置",
            "menuId": "75a55868-669e-4f72-a368-20302bc79be5"
        }
    ],
    "cs": "5000AE0035701567CDDFFF9872727F5C"
}
```
备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonObject|否	|    |响应结果|
|04|2|managerId|data     |String    |否	|    |管理员ID|
|05|2|loginName|data     |String    |否	|    |管理员登录名|
|06|2|username |data     |String    |否	|    |管理员用户名|
|07|2|password |data     |String    |否	|    |管理员登录密码|
|08|2|menus    |data     |String    |否	|    |管理员菜单|
|09|2|menuId   |menus    |String    |否	|    |管理员菜单ID|
|10|2|label    |menus    |String    |否	|    |管理员菜单名称|


- 响应数据结构(操作失败示例)：
```json
{
    "code": 400,
    "data": {
        "menus": [
            {
                "menuId": "c341aa66-3775-493f-93cf-358346c3477b",
                "label": "管理员"
            },
            {
                "menuId": "75a55868-669e-4f72-a368-20302bc79be5",
                "label": "皮肤设置"
            }
        ],
        "password": "ddd",
        "username": "ddd"
    },
    "message": "PARAMETERS BAD"
}
```
```json
{
    "code": 406,
    "data": {
        "loginName": "ddd",
        "menus": [
            {
                "menuId": "c341aa66-3775-493f-93cf-358346c3477b",
                "label": "管理员"
            },
            {
                "menuId": "75a55868-669e-4f72-a368-20302bc79be5",
                "label": "皮肤设置"
            }
        ],
        "password": "ddd",
        "username": "ddd"
    },
    "message": "REPEAT ERROR"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "loginName": "ddd",
        "managerId":"33bfc550-aba8-4e16-a3c3-bcc896b423fb",
        "menus": [
            {
                "menuId": "c341aa66-3775-493f-93cf-358346c3477b",
                "label": "管理员"
            },
            {
                "menuId": "75a55868-669e-4f72-a368-20302bc79be5",
                "label": "皮肤设置"
            }
        ],
        "password": "ddd",
        "username": "ddd"
    },
    "message": "SERVER OK"
}
```
备注：无





## 更新管理员
#### 描述
- 更新管理员信息

#### 请求地址
- http://localhost:8080/foodslab/manager/MUpdate

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |          |jsonObject|否| |参数名称|
|02|2|cs        |          |String    |否| |cookie|
|03|2|managerId |          |String    |否| |管理员ID|
|04|2|username  |          |String    |否| |用户名称|
|05|2|password  |          |String    |否| |登录密码|
|06|2|menus     |          |jsonString|否| |菜单集合|
|07|3|menuId    |menus     |String    |否| |菜单ID|
|08|3|label     |menus     |String    |否| |菜单名称|

- GET请求链接示例：http://localhost:8080/foodslab/manager/MUpdate?p={"managerId":"33bfc550-aba8-4e16-a3c3-bcc896b423fb","username":"ddd","password":"ddd","menus":[{"label":"皮肤设置","menuId":"75a55868-669e-4f72-a368-20302bc79be5"}],"cs":"5000AE0035701567CDDFFF9872727F5C"}
- 请求数据结构示例：
```json
{
    "managerId": "33bfc550-aba8-4e16-a3c3-bcc896b423fb",
    "username": "ddd",
    "password": "ddd",
    "menus": [
        {
            "label": "皮肤设置",
            "menuId": "75a55868-669e-4f72-a368-20302bc79be5"
        }
    ],
    "cs": "5000AE0035701567CDDFFF9872727F5C"
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |jsonObject|否	|    |响应结果|
|04|2|managerId|data     |String    |否	|    |管理员ID|
|05|2|loginName|data     |String    |否	|    |管理员登录名|
|06|2|username |data     |String    |否	|    |管理员用户名|
|07|2|password |data     |String    |否	|    |管理员登录密码|
|08|2|menus    |data     |String    |否	|    |管理员菜单|
|09|2|menuId   |menus    |String    |否	|    |管理员菜单ID|
|10|2|label    |menus    |String    |否	|    |管理员菜单名称|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 408,
    "data": {
        "cs": "5000AE0035701567CDDFFF9872727F5C",
        "password": "ddd",
        "managerId": "33bfc550-aba8-4e16-a3c3-bcc896b423fb",
        "menus": [
            {
                "menuId": "75a55868-669e-4f72-a368-20302bc79be5",
                "label": "皮肤设置"
            }
        ],
        "username": "ddd"
    },
    "message": "LOGIN TIMEOUT"
}
```
```json
{
    "code": 400,
    "data": {
        "menus": [
            {
                "label": "皮肤设置",
                "menuId": "75a55868-669e-4f72-a368-20302bc79be5"
            }
        ],
        "password": "ddd",
        "username": "ddd"
    },
    "message": "PARAMETERS BAD"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "managerId": "33bfc550-aba8-4e16-a3c3-bcc896b423fb",
        "menus": [
            {
                "label": "皮肤设置",
                "menuId": "75a55868-669e-4f72-a368-20302bc79be5"
            }
        ],
        "password": "ddd",
        "username": "ddd"
    },
    "message": "SERVER OK"
}
```
- 备注：无





## 管理员修改管理员状态
#### 描述
- 管理员禁用/启用/删除管理员

#### 请求地址
- http://localhost:8080/foodslab/manager/MMark

#### 请求方式
- post

#### 请求参数

| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|p         |      |jsonObject|否| |参数名称|
|02|2|cs        |p     |String    |否| |cookie|
|03|2|managerId |p     |String    |否| |管理员ID|
|04|2|status    |p     |String    |否| |管理员状态|

- GET请求链接示例：http://localhost:8080/foodslab/manager/MMark?p={"cs":"5000AE0035701567CDDFFF9872727F5C","managerId":"33bfc550-aba8-4e16-a3c3-bcc896b423fb","status":1}
- 请求数据结构示例：
```json
{
    "cs": "5000AE0035701567CDDFFF9872727F5C",
    "managerId": "33bfc550-aba8-4e16-a3c3-bcc896b423fb",
    "status": 1
}
```
- 备注：无
#### 响应参数
| No.|level|key|PKey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |响应数据体|
|03|1|managerId|         |String    |否	|    |管理员ID|
|03|1|status   |         |String    |否	|    |管理员状态|

- 响应数据结构(操作失败示例)：
```json
{
    "code": 408,
    "data": {
        "cs": "5000AE0035701567CDDFFF9872727F5C",
        "managerId": "33bfc550-aba8-4e16-a3c3-bcc896b423fb",
        "status": 1
    },
    "message": "LOGIN TIMEOUT"
}
```
```json
{
    "code": 400,
    "data": {
        "managerId": "33bfc550-aba8-4e16-a3c3-bcc896b423fb"
    },
    "message": "PARAMETERS BAD"
}
```
- 响应数据结构(操作成功示例)：
```json
{
    "code": 200,
    "data": {
        "managerId": "33bfc550-aba8-4e16-a3c3-bcc896b423fb",
        "status": 2
    },
    "message": "SERVER OK"
}
```
- 备注：无