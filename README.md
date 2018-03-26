<img src="https://cloud.githubusercontent.com/assets/3898898/23833571/e5c7ae68-0782-11e7-8590-cecf4f3c969f.png" width="118" height="118" />

# react-amap

[![Build Status](https://travis-ci.org/ElemeFE/react-amap.svg?branch=master)](https://travis-ci.org/ElemeFE/react-amap)
[![npm version](https://badge.fury.io/js/react-amap.svg?_t=20170411)](https://www.npmjs.com/package/react-amap)
[![npm downloads](https://img.shields.io/npm/dm/react-amap.svg)](https://www.npmjs.com/package/react-amap)

> react-amap 是一个基于 React 封装的高德地图组件；帮助你轻松的接入地图到 React 项目中。除了必须引用的 Map 组件外，我们目前提供了最常用的 10 个地图组件，能满足大部分简单的业务场景；如果你有更复杂的需求，或者觉得默认提供的组件功能不够，你完全可以自定义一个地图组件，然后根据高德原生 API 做高德允许你做的一切事情。

### 最近更新

react-amap 升级到 1.1.1，支持加载 [AMapUI 组件库](http://lbs.amap.com/api/javascript-api/guide/amap-ui/intro)。加载方式参考 [Map 组件](/components/map) 关于 **加载 AMapUI 组件库** 的说明。（2017-11-13）


### 扩展组件

从版本 [1.0.0](https://www.npmjs.com/package/react-amap) 开始，react-amap 拥有了组件的扩展能力。如果 react-amap 中已有的组件不能满足你的业务需求，你可以使用自己写的地图组件；

在你的组件中，可以通过 props 访问到创建好的高德地图实例，以及地图的 div 容器；拥有访问这两个属性的能力后，你可以根据高德原生 API 做高德允许你做的一切事情。实际上，react-amap 中的其他组件就是这么做的。文档内容请参考[自定义地图组件](https://elemefe.github.io/react-amap/articles/extend)。

目前已有的一些组件：

1. [react-amap-plugin-heatmap](https://www.npmjs.com/package/react-amap-plugin-heatmap)，热力图组件。
2. [react-amap-plugin-geolocation](https://www.npmjs.com/package/react-amap-plugin-geolocation)，定位组件。
3. [react-amapui-wrapper](https://github.com/Croash/react-amapui-wrapper)，可自定义的AMapUI组件。

如果你有写好的组件愿意开源出来的，欢迎提一个 PR 扩展这个列表。

### 在线实时演示

https://jsfiddle.net/ioslh/h4u8mdng/25/

---

如何在项目中接入 react-amap;

### 安装
```sh
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
**tips:** Map 组件的父元素须设置高度和宽度；关于代码中的 `Map` 组件的 `amapkey` 属性见下方的说明。


### CDN 用法

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

### 关于 Key

在上面的例子中需要给 Map 组件传入 `amapkey` 属性，这个是高德地图给开发者分配的开发者 Key；你可以在[高德开放平台](http://lbs.amap.com/faq/account/key/67)申请你自己的 Key。

在 react-amap 中 Key 的传入方式有两种:

+ 给 Map 组件传入 `amapkey` 属性（因为 React 框架本身对 `key` 属性有其他作用，所以不能用 `key`，所以我们用 `amapkey`），这样的缺点是如果多个地方使用就要每次都要传入；
+ 你也可以定义一个纯组件,把 Map 组件的 amapkey 属性写好后返回新组件。
+ 直接把你的 Key 定义在全局变量 `window.amapkey` 上，react-amap 在调用高德接口时会尝试从这里读取。（不推荐）

组件的使用请移步[组件文档](https://elemefe.github.io/react-amap/components/about)。

### 贡献指南

首先感谢你使用 react-amap，react-amap 是一个基于 React 封装的高德地图组件库。

react-amap 的成长离不开大家的支持，如果你愿意为 react-amap 贡献代码或提供建议，请阅读以下内容。

#### 开发

```shell
npm install
npm start # http://localhost:9001
```

#### Issue 规范

- issue 仅用于提交 Bug 或 Feature，其它内容可能会被直接关闭。
- 在提交 issue 之前，请搜索相关内容是否已被提出。
- 在提交issue时，请说明 react-amap 的版本号，并提供操作系统和浏览器信息。推荐使用 [JSFiddle](https://jsfiddle.net/ioslh/mxc0h16p/5/) 生成在线 demo，这能够更直观地重现问题。

#### Pull Request 规范

- 请先 fork 一份到自己的项目下，不要直接在仓库下建分支。

- **不要提交 `dist` 里面打包的文件**。

- 提交 PR 前请 rebase，确保 commit 记录的整洁。

- 如果是修复 bug，请在 PR 中给出描述信息。

- 合并代码需要两名维护人员参与：一人进行 review 后 approve，另一人再次 review，通过后即可合并。

### 代码规范

遵循饿了么前端的 [ESLint](https://github.com/ElemeFE/eslint-config-elemefe) 即可。

### License

[MIT License](https://github.com/ElemeFE/react-amap/blob/master/COPYING)

Copyright (c) 2017 ElemeFE
