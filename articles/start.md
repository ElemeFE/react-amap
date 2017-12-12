---
category: Article
title: 快速开始
order: 1
---

[![Build Status](https://travis-ci.org/ElemeFE/react-amap.svg?branch=master)](https://travis-ci.org/ElemeFE/react-amap)
[![npm version](https://badge.fury.io/js/react-amap.svg?_t=20170411)](https://www.npmjs.com/package/react-amap)
[![npm downloads](https://img.shields.io/npm/dm/react-amap.svg)](https://www.npmjs.com/package/react-amap)


> react-amap 是一个基于 React 封装的高德地图组件；帮助你轻松的接入地图到 React 项目中。除了必须引用的 Map 组件外，我们目前提供了最常用的 10 个地图组件，能满足大部分简单的业务场景；如果你有更复杂的需求，或者觉得默认提供的组件功能不够，你完全可以自定义一个地图组件，然后根据高德原生 API 做高德允许你做的一切事情。


### 最近更新

react-amap 升级到 1.1.1，支持加载 [AMapUI 组件库](http://lbs.amap.com/api/javascript-api/guide/amap-ui/intro)。（2017-11-13）

### 扩展组件

版本 [1.0.0](https://www.npmjs.com/package/react-amap) 中，react-amap 拥有了组件的扩展能力。如果 react-amap 中已有的组件不能满足你的业务需求，你可以使用自己写的地图组件；

在你的组件中，可以通过 props 访问到创建好的高德地图实例，以及地图的 div 容器；拥有访问这两个属性的能力后，你可以根据高德原生 API 做高德允许你做的一切事情。实际上，react-amap 中的其他组件就是这么做的。文档内容请参考[自定义地图组件](https://elemefe.github.io/react-amap/articles/extend)。

目前已有的一些组件：

1. [react-amap-plugin-heatmap](https://www.npmjs.com/package/react-amap-plugin-heatmap)，热力图组件。
2. [react-amap-plugin-geolocation](https://www.npmjs.com/package/react-amap-plugin-geolocation)，定位组件。

如果你有写好的组件愿意开源出来的，欢迎在 [GitHub](https://github.com/ElemeFE/react-amap) 上提一个 PR 扩展这个列表。

---

本节介绍如何在项目中接入 react-amap;

### 安装

```bash
npm install --save react-amap
```

### npm 用法

```html
<div id="app"></div>
```

```css
#app {
  width: 600px;
  height: 400px;
}
```

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'react-amap';

ReactDOM.render(
  <Map amapkey={YOUR_AMAP_KEY} version={VERSION} />,
  document.querySelector('#app')
)
```

amapkey 说明见下文
version 指定高德地图版本 不填则使用默认值: 1.4.0

也可以手工引入你需要的组件：
    
```jsx
import Map from 'react-amap/lib/map';
import Marker from 'react-amap/lib/marker';
// ... your other code
```
    
以上为简单场景的应用。
tips: Map 组件的父元素须设置高度和宽度；关于代码中的 `Map` 组件的 `amapkey` 属性见下方的说明。

### CDN 用法

> jsfiddle 快速体验： https://jsfiddle.net/h4u8mdng/

在 HTML 页面中加入 react-amap 库的 CDN 地址，插件会在 `window` 下暴露 `ReactAMAP` 变量。

```html
<script src="path/to/react.js"></script>
<script src="path/to/react-dom.js"></script>
<script src="path/to/dist/react-amap.js"></script>
<script>
  var Map = ReactAMAP.Map;
  var Marker = ReactAMAP.Marker;
  
  var pos = { longitude: 120, latitude: 30 };
  var YourApp = React.createElement(
    Map, 
    { center: pos }, 
    React.createElement(
      Marker, 
      { position: pos }, 
      null
    )
  );
  ReactDOM.render(YourApp, document.getElementById('root'));
</script>
```

##### CDN 地址

实际应用中你可以使用下面的 CDN 地址，也可以把脚本下载下来本地部署。

tips: 记得将其中的 `VERSION` 替换为真实版本号，查看历史版本[更新日志](https://elemefe.github.io/react-amap/articles/changelog)。

+ https://unpkg.com/react-amap@VERSION/dist/react-amap.js
+ https://unpkg.com/react-amap@VERSION/dist/react-amap.min.js

当前最新版本 `1.2.0`：

+ https://unpkg.com/react-amap@1.2.0/dist/react-amap.js
+ https://unpkg.com/react-amap@1.2.0/dist/react-amap.min.js

### 关于 Key

在上面的例子中需要给 Map 组件传入 `amapkey` 属性，这个是高德地图给开发者分配的开发者 Key；你可以在[高德开放平台](http://lbs.amap.com/faq/account/key/67)申请你自己的 Key。

在 react-amap 中 Key 的传入方式有两种:

+ 给 Map 组件传入 `amapkey` 属性（因为 React 框架本身对 `key` 属性有其他作用，所以不能用 `key`，所以我们用 `amapkey`），这样的缺点是如果多个地方使用就要每次都要传入；
+ 你也可以定义一个纯组件,把 Map 组件的 amapkey 属性写好后返回新组件。
+ 直接把你的 Key 定义在全局变量 `window.amapkey` 上，react-amap 在调用高德接口时会尝试从这里读取。（不推荐）

组件的使用请查看[组件文档](/components/about)
