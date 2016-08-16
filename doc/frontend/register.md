## [返回首页](../index.md)
## 手机号码注册
#### 描述
- 用户使用手机号码和短信验证码注册,成功后同时登录

#### 请求地址
- http://localhost:8080/foodslab/user/createAccount

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|telephone     |      |String    |否| |电话号码|
|02|1|password      |      |String    |否| |密码|

- GET请求链接示例：http://localhost:8080/foodslab/user/createAccount?telephone=18511694468&password=123456
- 请求数据结构示例：
```json
{
    "telephone": "xxxx",
    "password": "xxxx"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|04|2|accountId|data         |String |否	|    |数据集合体|
|05|2|gender   |data         |int    |否	|    |数据集合体|
|06|2|password |data         |String |否	|    |数据集合体|
|07|2|source   |data         |int    |否	|    |注册方式(账号来源)|
|08|2|telephone|data         |String |否	|    |数据集合体|
|09|2|userId   |data         |String |否	|    |数据集合体|


- 响应数据结构示例：

```json
{
    "code": 200,
    "data": {
        "accountId": "5d9ed972-1973-47c2-ae1b-b6f9e7d1cf5c",
        "gender": 0,
        "password": "123456",
        "source": 0,
        "telephone": "18511694468",
        "userId": "f8c49eed-037a-4719-a48f-443dd4a73a24"
    },
    "message": "创建成功"
}
```
- 备注：无

## 微信号码注册
#### 描述
- 用户使用微信号码授权注册,成功后同时登录

#### 请求地址
- http://localhost:8080/foodslab

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|managerId      |      |String    |否| |描述|
|01|1|key      |Pkey      |String    |否| |描述|

- GET请求链接示例：无
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
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|

- 响应数据结构示例：

```json
{
    "code": 0,
    "data": 88,
    "message": "this is a tip message"
}
```
- 备注：无


## QQ号码注册
#### 描述
- 用户使用QQ号码授权注册,成功后同时登录

#### 请求地址
- http://localhost:8080/foodslab

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|managerId      |      |String    |否| |描述|
|01|1|key      |Pkey      |String    |否| |描述|

- GET请求链接示例：无
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
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|

- 响应数据结构示例：

```json
{
    "code": 0,
    "data": 88,
    "message": "this is a tip message"
}
```
- 备注：无