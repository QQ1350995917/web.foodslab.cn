# 用户信息接口 [返回首页](../index.md)

## 账户标记检测
#### 描述
- 账户信息发生变动时候,检测新的信息是否已经存在于系统中,如用户注册和用户修改账户的电话号码时候检测电话号码是否存在,微信和QQ授权登录时候检测openId是否存在

#### 请求地址
- http://localhost:8080/foodslab/account/exist

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|session   |      |String  |否| |会话标记|
|02|2|source    |      |int     |否| |标记数据来源,枚举值:foodslab=0,weixin=1,qq=2|
|03|3|identity  |      |String  |否| |电话号码或者openId|
|04|4|vCode     |      |String  |是| |验证码,判定为机器访问时候,需要携带验证码|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "session":"session",
    "source": 0,
    "identity": "identity",
    "vCode":"vCode"
}
```
- 备注：无
#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|2|message  |         |String    |否	|    |相应消息|
|03|3|data     |         |jsonObject|否	|    |数据集合体|
|04|4|exist    |data     |int       |否	|    |是否存在提交的标记,枚举值,0=不存在,1=存在|
|05|5|vCode    |data     |String    |是	|    |判定为机器访问后的验证码图像数据|

- 响应数据结构示例：

```json
{
    "code": 0,
    "data": 88,
    "message": "this is a tip message"
}
```
- 备注：无


## 注册接口
#### 描述
- 用户发起注册数据提交(Auth用不到该接口)

#### 请求地址
- http://localhost:8080/foodslab/account/create

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|session   |      |String    |否| |会话标记|
|02|2|source    |      |int     |否| |标记数据来源,固定值:0=foodslab|
|03|3|identity  |      |String  |否| |电话号码|
|04|4|smsCode   |      |String  |否| |[短信验证码](meta.md)|
|05|5|vCode     |      |String  |是| |判定为机器访问时候携带的参数|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "session": "session",
    "source": 0,
    "identity": "identity",
    "smsCode":"smsCode",
    "vCode":"vCode"
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

## 登录接口
#### 描述
- 用于用户登录,Auth授权登录(暂行接口)

#### 请求地址
- http://localhost:8080/foodslab/account/retrieve

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|session   |         |String    |否| |描述|
|02|2|source    |         |int       |否| |标记数据来源,枚举值:foodslab=0,weixin=1,qq=2|
|03|3|identity  |         |String    |否| |手机号码或者openId|
|04|4|password  |         |String    |否| |手机号码存在才有的数据|
|05|5|vCode     |         |String    |是| |手机号码在第二次提交数据需要携带的数据|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "session": "session",
    "source": "source",
    "identity": "identity",
    "password":"password",
    "vCode":"vCode"
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

## 忘记密码接口
#### 描述
- 用户忘记密码后重置密码的接口

#### 请求地址
- http://localhost:8080/foodslab/account/password

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|session   |      |String    |否| |会话标记|
|02|2|source    |      |int     |否| |标记数据来源,固定值:0=foodslab|
|03|3|identity  |      |String  |否| |电话号码|
|04|4|smsCode   |      |String  |否| |[短信验证码](meta.md)|
|05|5|vCode     |      |String  |是| |判定为机器访问时候携带的参数|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "session": "session",
    "source": 0,
    "identity": "identity",
    "smsCode":"smsCode",
    "vCode":"vCode"
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


## 修改手机号码
#### 描述
- 用户修改手机号码的接口

#### 请求地址
- http://localhost:8080/foodslab/account/phone

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|session   |      |String    |否| |会话标记|
|02|2|source    |      |int     |否| |标记数据来源,固定值:0=foodslab|
|03|3|identity  |      |String  |否| |电话号码|
|04|4|smsCode   |      |String  |否| |[短信验证码](meta.md)|
|05|5|vCode     |      |String  |是| |判定为机器访问时候携带的参数|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "session": "session",
    "source": 0,
    "identity": "identity",
    "smsCode":"smsCode",
    "vCode":"vCode"
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

## 修改用户信息
#### 描述
- 用户修改其他信息的接口

#### 请求地址
- http://localhost:8080/foodslab/account/update

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|session   |      |String    |否| |会话标记|
|02|2|source    |      |int     |否| |标记数据来源,固定值:0=foodslab|
|03|3|nickName  |      |String  |否| |昵称|
|04|4|gender    |      |int     |否| |性别,0=男性,1=女性|
|05|5|address   |      |String  |是| |地址|
|06|6|vCode     |      |String  |是| |判定为机器访问时候携带的参数|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "session": "session",
    "source": 0,
    "nickName": "identity",
    "gender":"smsCode",
    "address":"smsCode",
    "vCode":"vCode"
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


## 用户修改头像
#### 描述
- 用户修改头像

#### 请求地址
- http://localhost:8080/foodslab/account/portrait

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|session   |      |String    |否| |会话标记|
|02|2|source    |      |int     |否| |标记数据来源,固定值:0=foodslab|
|03|3|portrait  |      |String  |否| |头像数据|
|04|4|vCode     |      |String  |是| |判定为机器访问时候携带的参数|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "session": "session",
    "source": 0,
    "portrait": "identity",
    "vCode":"vCode"
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

## 账户绑定和解绑
#### 描述
- 用户把其下的不同类型的账户归集到一起,或者分离.如果绑定则分离,如果分离则绑定

#### 请求地址
- http://localhost:8080/foodslab/account/bind

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|session   |      |String    |否| |会话标记|
|02|2|targetId  |      |String  |否| |头像数据|
|03|3|sourceId  |      |String  |否| |头像数据|
|04|4|vCode     |      |String  |是| |判定为机器访问时候携带的参数|

- GET请求链接示例：无
- 请求数据结构示例：
```json
{
    "session": "session",
    "source": 0,
    "portrait": "identity",
    "vCode":"vCode"
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
