---
category: 覆盖物
order: 6
title: Circle 组件
---

## 何时使用

需要在地图上显示一个圆形时


## API

### 动态属性

| 属性 | 类型 | 默认取值 | 说明 |
|------|-----|------|-----|
| center | [LngLat](http://lbs.amap.com/api/javascript-api/reference/core#LngLat) 或者 `{longitude, latitude}`  | / | 圆心位置 |
| radius | `Number` | / | 圆半径，单位:米 |
| draggable | `Boolean` | false | 圆形是否可拖拽 |
| extData | 任意 | / | 用户自定义属性，支持JavaScript API任意数据类型，如Circle的id等 |
  

### 静态属性

| 属性     | 类型 | 默认取值 | 说明     |
|----------|-----------|-------|-----|
| zIndex | `Number`  | 10    | 层叠顺序 |
| bubble | `Boolean` | false | 是否将覆盖物的鼠标或touch等事件冒泡到地图上 |


### 扩展的动态属性

| 属性     | 类型 | 默认取值 | 说明     |
|----------|-----------|-------|-----|
| style   | `{ strokeColor, strokeOpacity, strokeWeight, fillColor, fillOpacity, strokeStyle, strokeDasharray }` | / | 绘制圆形的外观，各个字段取值类型参考[CircleOptions](http://lbs.amap.com/api/javascript-api/reference/overlay#Circle) |
| visible | `Boolean` | true | 圆形的显示/隐藏状态 |