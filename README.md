<img src="https://cloud.githubusercontent.com/assets/3898898/23833571/e5c7ae68-0782-11e7-8590-cecf4f3c969f.png" width="118" height="118" />

# react-amap

[![Build Status](https://travis-ci.org/ElemeFE/react-amap.svg?branch=master)](https://travis-ci.org/ElemeFE/react-amap)
[![npm version](https://badge.fury.io/js/react-amap.svg?_t=20170411)](https://www.npmjs.com/package/react-amap)
[![npm downloads](https://img.shields.io/npm/dm/react-amap.svg)](https://www.npmjs.com/package/react-amap)

> react-amap 是一个基于 React 封装的高德地图组件；帮助你轻松的接入地图到 React 项目中。同时，如果你有更复杂的需求，我们在各个组件的接口中，会完全暴露高德的原生实例给你，方便你亲自对实例进行操作。

如何在项目中接入 react-amap;

### 安装
```sh
npm install --save react-amap
```

### npm 用法
```jsx
import React from 'react';
import { Map } from 'react-amap';

class MapApp extends React.Component {
  // ... Your other methods
  render() {
    return <div style={{ width: '600px', height: '500px' }}>
      <Map amapkey={YOUR_AMAP_KEY} />
    </div>
  }
}
```

也可以手工引入你需要的组件：

 ```jsx   
import Map from 'react-amap/lib/map';
import Marker from 'react-amap/lib/marker';
// ... your other code
```
    
以上为简单场景的应用。
tips: Map 组件的父元素须设置高度和宽度；关于代码中的 `Map` 组件的 `amapkey` 属性见下方的说明。


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
