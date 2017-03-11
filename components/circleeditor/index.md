---
category: 覆盖物
order: 7
title: CircleEditor 组件
---


## 何时使用

在给 Circle 组件提供可编辑功能时使用

## API


### 属性

| 属性  | 类型 | 默认取值 | 说明 |
|-------|-----|------|-----|
| `active` | `Boolean` | true | 是否开启编辑功能 |
| `events` | Object  | / | 监听编辑插件的事件 |


#### 编辑插件的事件

高德地图中，Circle 的编辑功能是以独立的插件来提供的；他们也有自己的实例和事件；因为数量较少在下面列举出来。详情参考[AMap.CircleEditor 插件](http://lbs.amap.com/api/javascript-api/reference/plugin#AMap.CircleEditor)。

| 事件名称  | 参数 | 说明 |
|-------|-----|------|
| created | target | target为创建后的圆形实例, 如果你需要亲自对实例操作，可以从这里开始 |
| move | `{type, target, lnglat}` | 拖拽圆心调整圆形位置时触发此事件<br/>type: 事件类型<br/>target: 发生事件的目标对象<br/>[LngLat](http://lbs.amap.com/api/javascript-api/reference/core#LngLat): 调整后圆的圆心坐标 |
| adjust | `{type, target, radius}` | 鼠标调整圆形半径时，触发此事件<br/>type: 事件类型<br/>target: 发生事件的目标对象<br/>radius: 调整后圆的半径，单位：米 |
| end | `{type,target}` | 在调用close方法时，触发该事件，target即为编辑后的圆形实例 |