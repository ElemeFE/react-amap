---
category: 地图
order: 2
title: MouseTool 组件
---


## 何时使用

需要在地图上启用鼠标工具插件时使用；启用该插件可以进行鼠标画标记点、线、多边形、矩形、圆、距离量测、面积量测、拉框放大、拉框缩小等功能。


## API

这个插件的最佳使用方法就是通过绑定`created`事件获得实例后，对实例调用不同方法，从而可以实现不同的鼠标操作。

详情请参考[高德官方文档](http://lbs.amap.com/api/javascript-api/reference/plugin#AMap.MouseTool)。


### 静态属性

| 属性       |  类型 | 默认取值 | 说明     |
|-----------|-----------|-------|-----|
| events    | `Object`  |  / | 就像其他组件的 events 属性一样绑定事件 |

> 当前可以绑定的事件只有两个：`created`（MouseTool 实例创建完成后调用）,`draw`（鼠标工具绘制覆盖物结束时触发此事件）。