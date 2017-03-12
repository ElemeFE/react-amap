---
category: 信息窗体
order: 10
title: InfoWindow 组件
---


## 何时使用

需要在地图上显示一个信息窗体的时候使用；

**注意：在一个地图上最多只能同时显示一个信息窗体**

## API

### 动态属性

| 属性 | 类型 | 默认取值 | 说明 |
|------|-----|------|-----|
| content | `String`或者`HTMLElement` | / | 信息窗体的显示内容，可以是HTML要素字符串或者HTMLElement对象 |
| position | `{ longitude, latitude }` 或者 [LngLat](http://lbs.amap.com/api/javascript-api/reference/core#LngLat) | / | 信息窗体显示基点位置 |
| size | `{width, height}` 或者 [Size](http://lbs.amap.com/api/javascript-api/reference/core#Size)| / | 信息窗体尺寸（isCustom为true时，该属性无效） |
| offset | `[x, y]` 或者 [Pixel](http://lbs.amap.com/api/javascript-api/reference/core#Pixel) | / | 相对于基点的偏移量。默认情况是信息窗体的底部中心点(BOTTOM_CENTER) 和基点之间的偏移量 |


### 静态属性

| 属性 | 类型 | 默认取值 | 说明 |
|------|-----|------|-----|
| isCustom | `Boolean` | false | 是否自定义窗体。设为true时，信息窗体外框及内容完全按照content所设的值添加（默认为false，即在系统默认的信息窗体外框中显示content内容）|
| autoMove | `Boolean` | / | 是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）|
| closeWhenClickMap | `Boolean` | false | 控制是否在鼠标点击地图后关闭信息窗体 |
| showShadow | `Boolean` | false | 控制是否显示信息窗体阴影，取值false时不显示窗体阴影，取值true时显示窗体阴影 |

### 扩展属性

| 属性 | 类型 | 默认取值 | 说明 |
|------|-----|------|-----|
| visible | `Boolean` | false | 是否显示信息窗体。<br/>**在一个地图中同时最多只能显示一个信息窗体** |
| events | `Object` | / | 给窗体绑定事件，参考[事件绑定说明](/components/about#事件绑定)；信息窗体支持的事件有：`created`、`change`、`open`、`close` |


## 如何写信息窗体内容

react-amap 提供两种方式定义信息窗体的内容：
+ 按照高德原生的方式通过定义 content 属性（取值是一个字符串或者一个 DOM）；
+ 不设置 content 属性，直接以 JSX 语法在 InfoWindow 标签下写子元素，即 props.children;

**如果同时设置了 content 属性且有 children，children 将被忽略**



