# 结算页面
## [返回首页](../index.md)

## 获取发货人信息
## 获取收货人信息

## 获取货物信息
#### 描述
- 在用户进行结算时候获取要结算的货物信息

#### 请求地址
- http://localhost:8080/foodslab/billing

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|accountId |      |String    |是| |匿名购买|
|01|1|formatId  |      |String    |否| |要购买的商品的ID|

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