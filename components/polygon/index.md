---
category: 覆盖物
order: 3
title: Polygon 组件
---


## 何时使用

Polygon 组件

## API



### 可响应式属性

| 属性 | 类型 | 默认取值 | 说明 |
|------|-----|------|-----|
| path | 一维或者二维数组，数组元素类型为：[LngLat](http://lbs.amap.com/api/javascript-api/reference/core#LngLat) 或者 `{longitude, latitude}`  | [] | 多边形轮廓线的节点坐标数组，当为“环”多边形时（多边形区域在多边形内显示为“岛”），path为二维数组，“环”多边形时，要求数组第一个元素为外多边形，其余为“岛”多边形，外多边形需包含“岛”多边形，否则程序不作处理 |
| extData | 任意 | / | 用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等 |


### 不可响应属性

| 属性     | 类型 | 默认取值 | 说明     |
|----------|-----------|-------|-----|
| `zIndex` | `Number`  | 10    | 多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示 |
| `bubble` | `Boolean` | false | 是否将覆盖物的鼠标或touch等事件冒泡到地图上 |

### 扩展属性

| 属性     | 类型 | 默认取值 | 说明     |
|----------|-----------|-------|-----|
| `style`   | `{ strokeColor, strokeOpacity, strokeWeight, fillColor, fillOpacity, strokeStyle, strokeDasharray }` | / | 绘制多边形的外观，各个字段取值类型参考[PolygonOptions](http://lbs.amap.com/api/javascript-api/reference/overlay#Polygon) |
| `visible` | `Boolean` | true | 多边形的显示/隐藏状态 |