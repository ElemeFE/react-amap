---
category: 地图
order: 1
title: AMap 组件
---

## 何时使用

- 需要显示地图时

---

## API



### 可响应式属性

| 属性 | 类型 | 取值 | 说明 |
|------|-----|------|
| layers |地图图层数组，数组可以是图层 中的一个或多个，默认为普通二维地图。当叠加多个图层时，普通二维地图需通过实例化一个TileLayer类实现|Array|
| zoom |地图显示的缩放级别，若center与level未赋值，地图初始化默认显示用户所在城市范围|Number|
| center |地图中心点坐标值|LngLat|
| labelzIndex |地图标注显示顺序，大于110即可将底图上的默认标注显示在覆盖物（圆、折线、面）之上。|Number|
| lang |地图语言类型,可选值：zh_cn：中文简体，en：英文，zh_en：中英文对照,默认为: zh_cn：中文简体,注：由于图面内容限制，中文、英文 、中英文地图POI可能存在不一致的情况|String|
| rotateEnable |地图是否可旋转，默认false|Boolean\|Object|
| mapStyle |设置地图显示样式。目前支持normal（默认样式）、dark（深色样式）、light（浅色样式）、fresh(osm清新风格样式)、blue_night|String|
| features |设置地图上显示的元素种类。支持'bg'（地图背景）、'point'（POI点）、'road'（道路）、'building'（建筑物）|Array|
| cursor |地图默认鼠标样式。参数cursor应符合CSS的cursor属性规范|String|
| defaultLayer |当前地图中默认显示的图层。默认图层可以是TileLayer.Satellite等切片地图，也可以是通过TileLayer自定义的切片图层|TileLayer|


### 不可响应属性
| 属性 | 说明 | 类型 |
|------|-----|------|
|view|地图视口，用于控制影响地图静态显示的属性，如：地图中心点“center”,推荐直接使用zoom、center属性为地图指定级别和中心点|[View2D](http://lbs.amap.com/api/javascript-api/reference/map#View2D)|
|zooms|地图显示的缩放级别范围。在PC上，默认为[3,18]，取值范围[3-18]；在移动设备上，默认为[3,19],取值范围[3-19]|Array|
|crs|地图显示的参考坐标系，取值：'EPSG3857','EPSG3395','EPSG4326',自V1.3.0移入view对象中|String|
|animateEnable|||
|isHotspot|||
|resizeEnable|||
|showIndoorMap|||
|indoorMap|||
|expandZoomRange|||
|dragEnable|||
|zoomEnable|||
|doubleClickZoom|||
|keyboardEnable|||
|jogEnable|||
|scrollWheel|||
|touchZoom|||
|showBuildingBlock|||