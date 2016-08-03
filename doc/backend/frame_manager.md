## [返回首页](../index.md)
## 管理员列表
#### 描述
- 请求用户权限下的管理员列表

#### 请求地址
- http://localhost:8080/manager

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|managerId      |      |String    |否| |描述|

示例：无
```json
{
    "managerId": "xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx"
}
```
备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|04|2|managerId|data     |String    |否	|    |数据集合体-管理员ID|
|05|2|username |data     |String    |否	|    |数据集合体-管理员用户名|
|06|2|password |data     |String    |否	|    |数据集合体-密码|
|07|2|level    |data     |int       |否	|    |数据集合体-级别|
|08|2|queue    |data     |int       |否	|    |数据集合体-排序|
|09|2|status   |data     |int       |否	|    |数据集合体-状态|
|10|2|pId      |data     |String    |否	|    |数据集合体-上级ID|
|11|2|managerMenuEntitiesMapping|data|jsonArray |否	|    |数据集合体-与菜单的映射关系|
|12|3|managerId|managerMenuEntitiesMapping|String |否	|    |数据集合体-与菜单的映射关系-管理员ID|
|13|3|menuId|managerMenuEntitiesMapping|String |否	|    |数据集合体-与菜单的映射关系-菜单ID|
|14|3|menuLabel|managerMenuEntitiesMapping|String |否	|    |数据集合体-与菜单的映射关系-菜单名称|
|15|3|createTime|managerMenuEntitiesMapping|long |否	|    |数据集合体-与菜单的映射关系-创建时间|
|16|3|updateTime|managerMenuEntitiesMapping|long |否	|    |数据集合体-与菜单的映射关系-最近的的更新时间|
|17|2|updateTime|data     |long    |否	|    |数据集合体-数据创建时间|
|18|2|createTime|data     |long    |否	|    |数据集合体-数据最近的的修改时间|


示例：无

```json
{
    "code": 0,
    "data": [
        {
            "managerMenuEntitiesMapping": [],
            "password": "123456",
            "level": 0,
            "createTime": 1470103227000,
            "pId": "xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx",
            "updateTime": 1470103227000,
            "managerId": "xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx",
            "queue": 1,
            "username": "admin",
            "status": 1
        },
        {
            "managerMenuEntitiesMapping": [
                {
                    "createTime": 1470208522000,
                    "menuId": "17d1a324-ca6f-4f1c-8e58-fdd4fdb1b9d7",
                    "updateTime": 1470208522000,
                    "managerId": "f4330db0-bc18-4899-9632-d0de2a81318c",
                    "menuLabel": "产品管理"
                }
            ],
            "password": "123",
            "level": 1,
            "createTime": 1470143907000,
            "pId": "xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx",
            "updateTime": 1470143907000,
            "managerId": "f4330db0-bc18-4899-9632-d0de2a81318c",
            "queue": 1,
            "username": "dingpw",
            "status": 1
        }
    ],
    "message": "this is tip message!"
}
```
备注：无

## 重名检测
#### 描述
- 检测管理员用户名是否重复

#### 请求地址
- http://localhost:8080/manager/check

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|username  |          |String    |否| |描述|

示例：无
```json
{
    "username": "admin"
}
```
备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |Boolean   |否	|    |响应结果|

示例：无

```json
{
    "code": 0,
    "data": "true",
    "message": "this is tip message!"
}
```
备注：无


## 新建管理员
#### 描述
- 创建一个新的管理员

#### 请求地址
- http://localhost:8080/manager/create

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|pid  |          |String    |否| |描述|
|01|1|username  |          |String    |否| |描述|
|01|1|password  |          |String    |否| |描述|
|01|1|menus     |          |String    |否| |描述|

示例：无
```json
{
    "pid":"xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx",
    "username": "admin",
    "password": "123456",
    "menus": "17d1a324-ca6f-4f1c-8e58-fdd4fdb1b9d7:产品管理,999b42f6-3129-4f09-be16-27a26455c4c5:销售报表,321aa99c-3f34-433c-9a84-12e929d4a351:海报管理,bff0e87f-d59c-4549-a47b-4265ddf0ce37:消息管理"
}
```
备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |Boolean   |否	|    |响应结果|


示例：无

```json
{
    "code": 0,
    "data": "true",
    "message": "this is tip message!"
}
```
备注：无


## 更新管理员
#### 描述
- 更新一个管理员信息

#### 请求地址
- http://localhost:8080/manager/update

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|managerId |      |String    |否| |描述|
|02|1|username |       |String    |否| |描述|
|03|1|isUsernameU|     |Boolean    |否| |描述|
|04|1|password |       |String    |否| |描述|
|05|1|isPasswordU|     |String    |否| |描述|
|06|1|status|          |int    |否| |描述|
|07|1|isStatusU|       |String    |否| |描述|
|08|1|pId|             |String    |否| |描述|
|09|1|menus| |String    |否| |描述|

示例：无
```json
{
    "managerId": "xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx",
    "username": "admin",
    "isUsernameU": "true",
    "password": "123456",
    "isPasswordU": "true",
    "status": 1,
    "isStatusU": "true",
    "pId": "xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx",
    "menus": "17d1a324-ca6f-4f1c-8e58-fdd4fdb1b9d7:产品管理,999b42f6-3129-4f09-be16-27a26455c4c5:销售报表,321aa99c-3f34-433c-9a84-12e929d4a351:海报管理,bff0e87f-d59c-4549-a47b-4265ddf0ce37:消息管理"
}
```
备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |响应消息|
|03|1|data     |         |Boolean   |否	|    |响应结果|


示例：无

```json
{
    "code": 0,
    "data": "true",
    "message": "this is tip message!"
}
```
备注：无