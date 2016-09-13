## [返回首页](../index.md)

## 结算页面
#### 描述
- 由立即购买或者购物车跳转到结算页面

#### 请求地址
- http://localhost:8080/foodslab/pb

#### 请求方式
- post

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|accountId |      |String    |是| |匿名购买|
|01|1|formatIds |      |String    |否| |要购买的商品ID字符串集合,使用","分割|

- GET请求链接示例：http://localhost:8080/foodslab/pb?accountId=test&formatIds=761f3cb4-130b-4fe0-8ef5-08fc748fda0b,37c9d4ec-e361-4f49-b962-e595b7f40552
- 请求数据结构示例：
```json
{
    "accountId": "test",
    "formatIds": "761f3cb4-130b-4fe0-8ef5-08fc748fda0b,37c9d4ec-e361-4f49-b962-e595b7f40552"
}
```
- 备注：无

#### 响应参数
html页面

- 响应数据结构示例：
无

- 备注：无