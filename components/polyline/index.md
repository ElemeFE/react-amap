---
category: 覆盖物
order: 4
title: Polyline 组件
---


## 何时使用

需要在地图上一个折线段的时候；

## API



### 动态属性

| 属性 | 类型 | 默认取值 | 说明 |
|------|-----|------|-----|
| path | [LngLat](http://lbs.amap.com/api/javascript-api/reference/core#LngLat)\[\] <br/> `{longitude, latitude}`\[\]  | [] | 折线的节点坐标数组 |
| draggable | `Boolean` | false | 实例线段图形是否可拖拽 |
| extData | 任意 | / | 用户自定义属性，支持JavaScript API任意数据类型，如Polyline的id等 |

### 静态属性

| 属性       |  类型 | 默认取值 | 说明     |
|-----------|-----------|-------|-----|
| zIndex  | `Number`  | 10    | 多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示 |
| bubble  | `Boolean` | false | 是否将覆盖物的鼠标或touch等事件冒泡到地图上 |
| showDir | `Boolean` | false | 是否延路径显示白色方向箭头,默认false。Canvas绘制时有效，建议折线宽度大于6时使用|

### 扩展属性

| 属性     | 类型 | 默认取值 | 说明     |
|----------|-----------|-------|-----|
| style   | `{ geodesic, isOutline, outlineColor, strokeColor, strokeOpacity, strokeWeight, strokeStyle, strokeDasharray }` | / | 绘制折线的外观，各个字段取值类型参考[PolylineOptions](http://lbs.amap.com/api/javascript-api/reference/overlay#Polyline) |
| visible | `Boolean` | true | 多边形的显示/隐藏状态 |