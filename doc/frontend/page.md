# 页面跳转 [返回首页](../index.md)

## 页面跳转总述
#### 描述
- 通过地址栏直接访问或者链接跳转访问.返回的基本数据如响应数据结构示例所示,其中动态数据包括meta节点,link节点和script节点.

#### 请求地址
- http://localhost:8080/foodslab/

#### 请求方式
- get

#### 请求参数 无

- GET请求链接示例：http://localhost:8080/foodslab/
- 请求数据结构示例：无

- 备注：无
#### 响应参数说明
1. html整体布局结构的数据,该数据共分为三个部分:header,main,footer
2. 固定的application.css样式表引入
3. 固定的application.js脚本引入
4. 动态的首页相关的样式表和脚本引入

- 响应数据结构示例：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="" content="">
    <title>食坊</title>
    <link rel="stylesheet" type="text/css" href="/foodslab/webapp/asserts/application.css">
            <link rel="stylesheet" type="text/css" href="/foodslab/webapp/asserts/index.css">
</head>
<body>
<div id="header" class="header"></div>
<div id="main" class="main"></div>
<div id="footer" class="footer"></div>
</body>
<script type="text/javascript" src="/foodslab/webapp/asserts/application.js"></script>
        <script type="text/javascript" src="/foodslab/webapp/asserts/index.js"></script>
</html>
```
- 备注：无

## 首页


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