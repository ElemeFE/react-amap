---
order: 1
title: 基本用法
---

要创建的一个图标，最简单的方式只要设置 Marker 组件的 `position` 属性就可以；高德地图中 Marker 的所有原生属性你都是可以配置的。

```jsx
import { Map, Marker } from 'react-amap';
class App extends React.Component{
  constructor(){
    super();
    this.toolEvents = {
      created: (tool) => {
        this.tool = tool;
      }
    }
    this.mapPlugins = ['ToolBar'];
    this.mapCenter = {longitude: 120, latitude: 35};
    this.markerPosition = {longitude: 121, latitude: 36};
  }

  render(){
    return <div>
      <div style={{width: '100%', height: 400}}>
        <Map 
          plugins={this.mapPlugins}
          center={this.mapCenter}
          zoom={6}
        >
          <Marker position={this.markerPosition} />
        </Map>
      </div>
    </div>
  }
}

ReactDOM.render(
  <App/>, mountNode
)
```
