---
title: Map 中 plugins 的使用
order: 2
---

高德地图中有一些[地图控件](http://lbs.amap.com/api/javascript-api/reference/map-control)以插件的形式加载；
注意：[react-amap 对插件的默认配置与高德官方的默认配置并不一致](https://github.com/ElemeFE/react-amap/issues/21)；

[JSFIDDLE 在线示例](https://jsfiddle.net/ioslh/mxc0h16p/8/)


```jsx
import { Map } from 'react-amap';
class App extends React.Component{
  render(){
    const plugins = [
      'MapType',
      'Scale',
      'OverView',
      'ControlBar', // v1.1.0 新增
      {
        name: 'ToolBar',
        options: {
          visible: true,  // 不设置该属性默认就是 true
          onCreated(ins){
            console.log(ins);
          },
        },
      }
    ]
    return <div style={{width: '100%', height: '400px'}}>
      <Map
        plugins={plugins}
      />
    </div>
  }
}
ReactDOM.render(
  <App/>,
  mountNode
)
```
