---
category: 覆盖物
order: 10
title: GroundImage 组件
---


## 何时使用

需要在地图上特定边界区域内显示一张图片时使用


## API

### 动态属性

| 属性       | 类型 | 默认取值 | 说明 |
|-----------|-----|------|-----|
| opacity | `Number` | 1 | 图片透明度，取值范围[0,1]，0表示完全透明，1表示不透明 |
| src       | `String` | / | 要显示的图片 url |
| bounds    | `{ sw, ne }` 或者 [AMap.Bounds](http://lbs.amap.com/api/javascript-api/reference/core#Bounds) | / |根据西南方和东北方的坐标确定的边界范围 |


> sw 和 ne 的取值都是`{longitude, latitude}`, 如：
```js 
bounds = { 
  sw: {
    longitude: 120,
    latitude: 20,
  },
  ne: {
    longitude: 130,
    latitude: 30
  }
}
```

### 静态属性

| 属性       | 类型 | 默认取值 | 说明 |
|-----------|-----|------|-----|
| clickable | `Boolean`   | false | 图层是否可点击，若为可点击则GroundImage支持鼠标点击事件 |


### 扩展的动态属性


| 属性       | 类型 | 默认取值 | 说明 |
|-----------|-----|------|-----|
| visible  | `Boolean` | true | 图片是否可见 |
| events   | `Object`  | / | 给组件绑定事件，目前支持三个事件`created`,`click`,`dblclick` |