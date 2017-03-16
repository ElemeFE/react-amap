---
order: 5
title: 给 Marker 绑定事件
---

通过设置`events`属性可以方便的给图标绑定事件；高德 Marker 中所有原生的事件都可以；此外如果你有更高级的需求，我们还定义了`created`事件，在 Marker 组件实例创建成功时，让你获取原生的高德 Marker 实例，方便你直接调用高德的接口。
```jsx
import { Map, Marker } from 'react-amap';

class App extends React.Component{
  constructor(){
    super(); 
    this.markerEvents = {
      created: (instance) => {
        console.log('Marker 实例创建成功；如果你需要对原生实例进行操作，可以从这里开始；');
        console.log(instance);
      },
      click: (e) => {
        console.log("你点击了这个图标；调用参数为：");
        console.log(e);
      },
      dblclick: (e) => {
        console.log("你刚刚双击了这个图标；调用参数为：");
        console.log(e);
      },
      // ... 支持绑定所有原生的高德 Marker 事件
    }
  }
  
  render(){
    return <div style={{width: '100%', height: 400}}>
      <Map 
        plugins={['ToolBar']} 
        center={{longitude: 120, latitude: 35}} 
      >
        <Marker
          position={{longitude: 120, latitude: 35 }} 
          clickable
          events={this.markerEvents}
        />
      </Map>
     </div>
  }
}

ReactDOM.render(
  <App/>, mountNode
)
```