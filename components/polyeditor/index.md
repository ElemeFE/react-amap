---
category: 覆盖物
order: 5
title: PolyEditor 插件
---


## 何时使用

在给 Polygon 和 Polyline 组件提供可编辑功能时使用

## API

### 属性

| 属性  | 类型 | 默认取值 | 说明 |
|-------|-----|------|-----|
| `active` | `Boolean` | true | 是否开启编辑功能 |
| `events` | Object  | / | 监听编辑插件的事件 |


#### 编辑插件的事件

高德地图中，Polygon 和 Polyline 的编辑功能是以独立的插件来提供的；他们也有自己的实例和事件；因为数量较少在下面列举出来。详情参考[AMap.PolyEditor 插件](http://lbs.amap.com/api/javascript-api/reference/plugin#AMap.PolyEditor)。

| 事件名称  | 参数 | 说明 |
|-------|-----|------|
| created | target | target为创建后的折线/多边形实例, 如果你需要亲自对实例操作，可以从这里开始 |
| addnode | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event#MapsEvent) | 通过鼠标在折线上增加一个节点或在多边形上增加一个顶点时触发此事件 |
| adjust | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event#MapsEvent) | 鼠标调整折线上某个节点或多边形上某个顶点的位置时触发此事件 |
| removenode | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event#MapsEvent) | 通过鼠标在折线上删除一个节点或在多边形上删除一个顶点时触发此事件 |
| end | `{type,target}` | 在调用close方法时，触发该事件，target即为编辑后的折线/多边形实例 |