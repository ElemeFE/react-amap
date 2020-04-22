<img src="https://cloud.githubusercontent.com/assets/3898898/23833571/e5c7ae68-0782-11e7-8590-cecf4f3c969f.png" width="118" height="118" />

# react-amap

[![Build Status](https://travis-ci.org/ElemeFE/react-amap.svg?branch=master)](https://travis-ci.org/ElemeFE/react-amap)
[![npm version](https://badge.fury.io/js/react-amap.svg?_t=20170411)](https://www.npmjs.com/package/react-amap)
[![npm downloads](https://img.shields.io/npm/dm/react-amap.svg)](https://www.npmjs.com/package/react-amap)

> react-gaode-amap fork 自 https://github.com/ElemeFE/react-amap 项目，增加对高德海外地图的支持

如何在项目中接入 react-amap;

### 安装
```sh
npm install --save react-gaode-amap
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
import { Map } from 'react-gaode-amap';

ReactDOM.render(
  <Map amapkey={YOUR_AMAP_KEY} version={VERSION} />,
  document.querySelector('#app')
)
```

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

### 说明

其他说明参见 https://github.com/ElemeFE/react-amap 的说明，本项目仅增加海外支持，其他没有差别。
