---
category: 覆盖物
order: 2
title: Markers 组件
---


## 何时使用

显示大量标记的时候使用；注意与 [Marker](/components/marker) 的区别。这个插件专门针对需要显示大量标记的场景进行过优化，但是无法大部分属性是静态的；详见示例以及 API 部分说明。


## API

### 动态属性

| 属性 | 类型 | 默认取值 | 说明 |
|------|-----|------|-----|
| useCluster | `Boolean` | `true` | 是否启用标记点聚合插件 |
| markers  | [CustomMarkerOption\[\]](#CustomMarkerOption-配置) | `[]` | 需要渲染的标记原始数据数组 |
| events  | `Object` | / | 同 Marker 的事件绑定，但是传入的参数稍有不同，查看[Markers的events属性](#Markers-events-事件) |


#### CustomMarkerOption 配置

| 属性 | 类型 | 默认取值 | 说明 |
|------|-----|------|-----|
| label | `String` | `''`（空字符串） | 一个长度的字符，显示在标记点内 |
| id  |`Number` | / | 用来识别标记点的 id，每一个地图中必需唯一 |
| position  | `{ longitude, latitude }` | / | 标记点的坐标位置 |


### 静态属性

| 属性 | 类型 | 默认取值 | 说明 |
|------|-----|------|-----|
| events | Object | / | 这个属性用来绑定事件 |
|  |||

其他的[高德 Marker 组件](http://lbs.amap.com/api/javascript-api/reference/overlay#Marker)的属性都是可以在这里作为静态属性使用的；
也可以在 markers 属性中作为原始数据设置好。


### 标记点的外观

根据高德官方的文档，我们还可以设定`content`,`icon`,`label`等属性来设定标记的外观；但是，如果你定义了 `render` 函数，`render`函数执行的结果（返回一个 React 组件）会作为最终外观覆盖其他的属性设定。


### Markers events 事件说明

事件有两类：

##### 一、[高德原生提供的事件](http://lbs.amap.com/api/javascript-api/reference/overlay#Marker)；

```jsx
events.click = (originalMapsEvents, originalMarkerData) => { /* do something */}
```
其中，originalMapsEvents 就是高德提供的，用于表示地图、覆盖物、叠加层上的各种鼠标事件返回，参考[MapsEvent 对象规范](http://lbs.amap.com/api/javascript-api/reference/event#MapsEvent);
而 originalMarkerData 就是在创建 Markers 组件时，提供的 markers 数组中的一个，取决于你点击的那个点。

在启用了聚合插件后，用户有可能点击的是弹窗中的标记点，这时候第一个参数是 `null`。弹窗中的标记点目前只支持触发少量的几个事件，包括：

+ `click`
+ `mouseover` 
+ `mouseout`
  
  
##### 二、扩展的`created`事件

在标记点批量创建完成后，会执行`events.created`这个方法传入创建的所有标记点实例；

如果刷新了坐标点，这个方法可能会重复执行。（所以不建议在使用 Markers 组件时频繁刷新点）


## 用Marker还是Markers？

Markers 目前是一个功能受限的组件，虽然可以定义全部事件，有比较好的聚合展示效果（启用了聚合插件），但是能配置的属性很少。下一步我们会优化这个组件。

+ 如果仅在地图上展示坐标点，使用 [Markers](/components/markers)
+ 如果想使用聚合插件，目前只能使用 [Markers](/components/markers)
+ 如果需要对点进行比较复杂的操作，并且需要自定义外观，使用 [Marker]((/components/marker))

不过，借助于`events.created`，你可以在获得标记点的实例后，按照高德原生的方式对标记进行操作。