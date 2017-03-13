本节介绍如何在项目中接入 react-amap;

### npm 安装

    npm install --save react-amap


### 在项目中引入并使用

    import React from 'react';
    import AMap from 'react-amap';
    
    class MyApp extends React.Component{
        // ... Your other methods
        render() {
            return <div style={{width: '600px',height: '500px'}}>
                <AMap key={YOUR_AMAP_KEY}/>
            </div>
        }
    }
    
最简单的使用场景下这样就可以了；会在 div 中展示一个地图；需要注意的是：AMap 的父元素必须要高度和宽度。

### 关于 key

在上面的例子中需要在 AMap 传入 key 变量，这个是高德地图给开发者分配的开发者 key；你可以在[高德开放平台](http://lbs.amap.com/faq/account/key/67)申请你自己的key；

在 react-amap 中 key 的传入方式有两种；

+ 定义为 AMap 组件的属性，就像上文例子中一样；这样缺点是如果多个地方使用就要每次都要传入；
+ 直接把你的 key 定义在全局变量 `window.AMAP_KEY` 上，react-amap 在调用高德接口时会尝试从这里读取。


组件的使用请查看[组件文档](https://github.com/ElemeFE/react-amap)
