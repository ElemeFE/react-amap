---
category: Article
title: 快速开始
order: 1
---


本节介绍如何在项目中接入 react-amap;

### npm 安装

    npm install --save react-amap


### 在项目中引入并使用

    import React from 'react';
    import { Map } from 'react-amap';
    
    class MyApp extends React.Component{
        // ... Your other methods
        render() {
            return <div style={{width: '600px',height: '500px'}}>
                <Map key={YOUR_AMAP_KEY}/>
            </div>
        }
    }
    
最简单的使用场景下这样就可以了；会在 div 中展示一个地图；需要注意的是：Map 的父元素必须要高度和宽度。


### CDN 使用

在 HTML 页面中加入 react-amap 库的 CDN 地址，插件会暴露在 window.ReactAMAP 变量下；然后即可使用。如：

```html
<script src="path/to/react.js"></script>
<script src="path/to/react-dom.js"></script>
<script src="path/to/react-amap.js"></script>
<script>
  var Map = ReactAMAP.Map;
  var Marker = ReactAMAP.Marker;
  
  var pos = {longitude: 120, latitude: 30};
  var YourApp = React.createElement(
    Map, 
    {center: pos}, 
    React.createElement(
      Marker, 
      {position: pos}, 
      null
    )
  );
  ReactDOM.render(YourApp, document.getElementById('root'));
</script>
```

##### CDN 地址
+ https://unpkg.com/react-amap@0.1.0/dist/react-amap.js
+ https://unpkg.com/react-amap@0.1.0/dist/react-amap.min.js

### 关于 key

在上面的例子中需要在 Map 传入 key 变量，这个是高德地图给开发者分配的开发者 key；你可以在[高德开放平台](http://lbs.amap.com/faq/account/key/67)申请你自己的key；

在 react-amap 中 key 的传入方式有两种；

+ 定义为 Map 组件的属性，就像上文例子中一样；这样缺点是如果多个地方使用就要每次都要传入；
+ 直接把你的 key 定义在全局变量 `window.AMAP_KEY` 上，react-amap 在调用高德接口时会尝试从这里读取。

    
组件的使用请查看[组件文档](/components/about)


