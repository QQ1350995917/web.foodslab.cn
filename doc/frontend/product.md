## [返回首页](../index.md)

## 获取系列数据
#### 描述
- 获取系列列表

#### 请求地址
- http://localhost:8080/foodslab/product/series

#### 请求方式
- get

#### 请求参数

| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|flag      |      |String  |是| |非空表示请求数据含有产品树|
|01|1|seriesId  |      |String  |是| |在第一个条件成立的情况下,不指定该条件则表示请求第一个系列下的产品树,指定无效则不包含产品树|

- GET请求链接示例：
1. http://localhost:8080/foodslab/product/series
2. http://localhost:8080/foodslab/product/series?flag=1&seriesId=seriesId
- 请求数据结构示例：flag=1&seriesId=eaf77fd7-de68-4587-a3e5-3b7b340cfe2e
- 备注：调用该数据接口的功能有: 首页系列菜单, 系列页面菜单以及产品的初始化和切换页签

#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|04|2|seriesId |data     |String    |否	|    |系列ID|
|05|2|label    |data     |String    |否	|    |系列label|
|06|2|children |data     |jsonArray |是	|    |类型数据集合|
|07|3|typeId   |children |String    |是	|    |类型ID|
|08|3|seriesId |children |String    |是	|    |类型所属的系列ID|
|09|3|label    |children |String    |是	|    |类型label|
|10|3|children |children |jsonArray |是	|    |规格数据集合|
|11|4|formatId |children |String    |是	|    |规格ID|
|12|4|label    |children |String    |是	|    |规格label|
|13|4|meta     |children |String    |是	|    |规格单位|
|14|4|price    |children |int       |是	|    |价格|
|15|4|pricingMeta|children |String  |是	|    |价格单位|

- 响应数据结构示例：
```json
{
    "code": 200,
    "data": [
        {
            "seriesId": "b2523f4e-77c5-4a40-810e-c1e436e80677",
            "label": "石磨香油"
        },
        {
            "seriesId": "c081fe20-098e-4ef9-8be6-1d8788cb8057",
            "label": "吊炉花生"
        }
    ],
    "message": "this is tip message!"
}
```

```json
{
    "code": 200,
    "data": [
        {
            "children": [
                {
                    "children": [
                        {
                            "pricingMeta": "￥",
                            "formatId": "761f3cb4-130b-4fe0-8ef5-08fc748fda0b",
                            "meta": "ml",
                            "price": 50,
                            "label": "200"
                        }
                    ],
                    "typeId": "113df3d5-bfbe-4350-aa6f-d20064bc25af",
                    "label": "家庭装",
                    "seriesId": "b2523f4e-77c5-4a40-810e-c1e436e80677"
                }
            ],
            "label": "石磨香油",
            "seriesId": "b2523f4e-77c5-4a40-810e-c1e436e80677"
        },
        {
            "label": "吊炉花生",
            "seriesId": "c081fe20-098e-4ef9-8be6-1d8788cb8057"
        }
    ],
    "message": "this is tip message!"
}
```
- 备注：无



## 获取推荐数据
#### 描述
- 获取推荐的产品

#### 请求地址
- http://localhost:8080/foodslab/product/recommend

#### 请求方式
- get

#### 请求参数 无

- GET请求链接示例：http://localhost:8080/foodslab/product/recommend
- 请求数据结构示例：无
- 备注：无

#### 响应参数
| No.|level|key|Pkey|type|null|default|description|
| ------------- |:-------------:| -----:|:-------------:| -----:|:-------------:| -----:|:-------------:|
|01|1|code     |	     |String    |否	|    |响应码|
|02|1|message  |         |String    |否	|    |相应消息|
|03|1|data     |         |jsonArray |否	|    |数据集合体|
|04|2|formatId |data     |String |否	|    |规格ID|
|05|2|label    |data     |String |否	|    |规格标签|
|06|2|meta     |data     |String |否	|    |规格单位|
|07|2|price    |data     |float  |否	|    |价格   |
|08|2|pricingMeta|data   |String |否	|    |价格单位|
|09|2|typeId   |data     |String |否	|    |类型ID|
|10|2|parent   |data     |jsonObject|否	|    |类型对象|
|11|3|typeId   |parent   |parent |否	|    |类型的ID|
|12|3|label    |parent   |parent |否	|    |类型的标签|
|13|3|seriesId |parent   |parent |否	|    |系列的ID|
|14|3|parent   |parent   |jsonObject |否	|    |系列对象|
|15|4|seriesId |parent   |parent |否	|    |系列的ID|
|16|4|label    |parent   |parent |否	|    |系列的标签|


- 响应数据结构示例：

```json
{
    "code": 200,
    "data": [
        {
            "pricingMeta": "L",
            "parent": {
                "parent": {
                    "label": "白芝麻",
                    "seriesId": "3cd62990-0683-4e0f-b051-93ef363e8c39"
                },
                "typeId": "b3c3ad2e-f013-4f1b-951c-d94cf2a06053",
                "label": "散装",
                "seriesId": "3cd62990-0683-4e0f-b051-93ef363e8c39"
            },
            "formatId": "a8002cbe-60bc-4f7d-abef-a36e46b23f49",
            "meta": "ml",
            "price": 11,
            "typeId": "b3c3ad2e-f013-4f1b-951c-d94cf2a06053",
            "label": "11"
        }
    ],
    "message": "this is tip message!"
}
```
- 备注：无