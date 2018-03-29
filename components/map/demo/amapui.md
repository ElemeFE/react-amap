---
title: 加载 AMapUI 组件库
order: 13
---

现在 react-amap 的 Map 组件中，你可以指定 `useAMapUI` 属性为 true,这样可以加载 [AMapUI 组件库](http://lbs.amap.com/api/javascript-api/guide/amap-ui/intro)。使用参考下方示例。


其实 react-amap 本身以另一种更便捷的方式实现了 AMapUI 组件库的大部分 UI 强化功能，包括增强的标注、增强的信息窗体。如一个展现高度可定制化的 Marker，在 react-amap 中可以这么写：`<Marker><img src="..."/></Marker>`。
详情参考[Marker 组件](/components/marker)的 **自定义 Marker 的外观** 部分和 **render 方法渲染标记的外观** 部分，以及[InfoWindow 组件](/components/infowindow)的 **如何写信息窗体内容** 部分。


[JSFIDDLE 在线示例](https://jsfiddle.net/y9cv20cv/8/)

```jsx
import { Map } from 'react-amap';

class UIMarker extends React.Component {
  constructor() {
    super();
    this.loadUI();
  }

  loadUI() {
    window.AMapUI.loadUI(['overlay/SimpleMarker'], (SimpleMarker) => {
      this.initPage(SimpleMarker);
    })
  }

  initPage(SimpleMarker) {
    const map = this.props.__map__;
    // 这个例子来自官方文档 http://lbs.amap.com/api/javascript-api/guide/amap-ui/intro
    new SimpleMarker({
        //前景文字
        iconLabel: 'A',
        //图标主题
        iconTheme: 'default',
        //背景图标样式
        iconStyle: 'red',
        //...其他Marker选项...，不包括content
        map: map,
        position: [120, 31]
    });

    //创建SimpleMarker实例
    new SimpleMarker({
        //前景文字
        iconLabel: {
            innerHTML: '<i>B</i>', //设置文字内容
            style: {
                color: '#fff' //设置文字颜色
            }
        },
        //图标主题
        iconTheme: 'fresh',
        //背景图标样式
        iconStyle: 'black',
        //...其他Marker选项...，不包括content
        map: map,
        position: [120, 29]
    });
  }

  render() {
    return null;
  }
}

const initCallback = () => {
  console.log("AMapUI Loaded Done")
}

const MyApp = (<div style={{width: '100%', height: '400px'}}>
      <Map zoom={6} center={[120, 30]} useAMapUI={initCallback} >
        <UIMarker/>
      </Map></div>);

ReactDOM.render(
  MyApp,
  mountNode
)
```
