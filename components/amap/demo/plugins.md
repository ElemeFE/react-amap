---
title: AMap 中 plugins 的使用
order: 2
---

高德地图中有一些[地图控件](http://lbs.amap.com/api/javascript-api/reference/map-control)以插件的形式加载；

```jsx
import AMap from 'react-amap';
class App extends React.Component{
  render(){
    const plugins = [
      'MapType',
      'Scale',
      'OverView',
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
      <AMap
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