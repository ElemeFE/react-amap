---
category: 覆盖物
order: 2
title: Markers 组件
---


## 何时使用

显示大量标记的时候使用；注意与 [Marker](/components/marker) 的区别。

Markers 组件大部分属性是静态属性；对坐标点的增加和删除会导致所有的标记点刷新，在点数量较大的情况下比较慢。

不过 Markers 有比较好的聚合展示效果（启用了聚合插件）；虽然是静态属性，但是如果面临复杂的需求你仍然可以在获得高德实例后，参照高德接口自己对实例进行操作。
而且还提供了两种 `render` 方法让你直接以 React 的方式写标记点的外观。



## API

> 在阅读以下文档时记得区分 react-amap 创建的 Markers 实例，和高德地图原生的 Marker 实例。

### 动态属性

| 属性       | 类型 | 默认取值 | 说明 |
|------------|-----------|---------|---------------------|
| useCluster | `Boolean` 或者 [MarkerClustererOptions](http://lbs.amap.com/api/javascript-api/reference/plugin#AMap.MarkerClusterer) | `false` | 是否启用标记点聚合插件；如果是MarkerClustererOptions对象，表明启用 |
| markers  | [MarkerOption\[\]](#MarkerOption-配置) | `[]` | 数组每一项都是都应标记点的属性或者其他自定义数据配置 |

> 对 markers 属性的更新必须是引用更新才能引起标记点的刷新；不过如果标记点过多，会影响性能。

### 静态属性

| 属性 | 类型 | 默认取值 | 说明 |
|------|-----|------|-----|
| render | `Function` | /  | 根据传入的 [MarkerOption](#MarkerOption-配置) 返回一个 React 组件，或者返回`false`  |
| events  | `Object` | / | 同 Marker 的事件绑定，但是传入的参数稍有不同，查看[Markers的events属性](#Markers-events-事件) |
| 其他高德原生 Marker 属性 | 1. 所需属性对应类型<br/>2. 或者一个函数，返回相应类型 | / | 除`extData`外的[其他高德原生 Marker 组件可以配置的属性](http://lbs.amap.com/api/javascript-api/reference/overlay#Marker)；  |

> + 如果设定了 `render` 则设置的其他会影响外观的属性（如`icon`,`content`）会被覆盖。

> + extData 会被赋值为[MarkerOption](#MarkerOption-配置)。


#### MarkerOption 配置

| 属性 | 类型 | 默认取值 | 说明 |
|------|-----|------|-----|
| 任何你的自定义属性 | / | / | / |
| 其他高德原生 Marker 属性 | 所需属性对应类型 | / | 除`extData`外的[其他高德原生 Marker 组件可以配置的属性](http://lbs.amap.com/api/javascript-api/reference/overlay#Marker)；  |

你可以把这里的 MarkerOption 理解成你需要构建标记点的原始数据；由于我们把 MarkerOption 赋值到高德原生 Marker 实例的 extData 上面，你在任何时候，都可以通过高德原生 Marker 实例的`getExtData`方法获得这个原始数据。


### 标记点的外观

根据高德官方的文档，我们可以设定`content`,`icon`,`label`等属性来设定标记的外观；

但是，如果你在 Markers 组件的属性上定义了 `render` 函数，`render`函数执行的结果会作为最终外观覆盖其他的属性设定。

同时，我们也在创建后的高德原生 Marker 实例上加载了一个`render`方法，传入一个 React 组件，或者返回 React 组件的函数，就可以刷新标记点的外观。


### Markers events 事件

事件有两类：

##### 一、高德原生提供的事件；

```jsx
const events = {
  click: (originalMapsEvents, originalMarkerInstance) => { /* do something */}
}
```

其中，originalMapsEvents 就是高德提供的，用于表示地图、覆盖物、叠加层上的各种鼠标事件返回，参考[MapsEvent 对象规范](http://lbs.amap.com/api/javascript-api/reference/event#MapsEvent);
而 originalMarkerInstance 就是高德原生的 Marker 实例；


在启用了聚合插件(`useCluster = true`)后，用户如果点击的是弹窗中的标记点，这时候第一个参数是 `null`。弹窗中的标记点目前只支持触发少量的几个事件，包括：

+ `click`
+ `mouseover` 
+ `mouseout`

直接坐落在地图上的标记点则没有限制，可以绑定[高德能提供的全部事件](http://lbs.amap.com/api/javascript-api/reference/overlay#Marker)。
  
  
##### 二、扩展的`created`事件

在标记点批量创建完成后，会执行`events.created`这个方法传入创建的所有标记点实例；

如果对坐标点进行了增删操作，这个方法会重复执行。
