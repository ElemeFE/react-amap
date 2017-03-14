---
title: useCluster 属性的使用
order: 2
---

在上一个例子中，需要在地图添加大量标记点，显示起来非常拥挤。高德提供了一个叫做 [AMap.MarkerClusterer](http://lbs.amap.com/api/javascript-api/reference/plugin#AMap.MarkerClusterer) 的聚合坐标点插件；在`react-amap` 组件中，你可以切换`useCluster`的值来选择是否启用这个插件。可以通过下面这个例子查看效果；记得放大地图查看聚合点是怎么展开的。

```jsx
import { Map, Markers } from 'react-amap';

const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
  }))
);
class App extends React.Component{
  constructor(){
    super();
    this.markers = randomMarker(1000);
    this.center = {longitude: 115, latitude: 40};
    this.state = {
      useCluster: true,
    }
  }
  toggleCluster(){
    this.setState({
      useCluster: !this.state.useCluster,
    });
  }
  render(){   
    return <div>
      <div style={{width: '100%', height: 370}}>
        <Map plugins={['ToolBar']} center={this.center} zoom={5}>
          <Markers 
            markers={this.markers}
            useCluster={this.state.useCluster}
          />
        </Map>
      </div>
      <button onClick={ () => { this.toggleCluster() } }> Toggle Cluster</button>
    </div>
  }
}

ReactDOM.render(
  <App/>, mountNode
)
```