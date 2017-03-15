---
title: 事件绑定
order: 4
---

Markers 组件的事件绑定方式与 Marker 类似，都是定义 events 属性；但是调用的参数不一样；

首先是扩展的 created 事件，参数是创建的所有高德标记点的实例（即[高德的 Marker](http://lbs.amap.com/api/javascript-api/reference/overlay#Marker) 实例）数组；

尝试点击例子中的坐标点，以及弹窗中的坐标点，在控制台查看输出。


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
    this.markers = randomMarker(10);
    this.mapCenter = {longitude: 115, latitude: 40};
    this.markersEvents = {
      created:(allMarkers) => { 
        console.log('All Markers Instance Are Below');
        console.log(allMarkers);
      },
      click: (MapsOption, marker) => {
        console.log('MapsOptions:');
        console.log(MapsOption);
        console.log('marker:');
        console.log(marker);
      },
      dragend: (MapsOption, marker) => { /* ... */ }
    }
  }

  render(){   
    return <div>
      <div style={{width: '100%', height: 400}}>
        <Map plugins={['ToolBar']} center={this.mapCenter} zoom={4}>
          <Markers 
            markers={this.markers}
            events={this.markersEvents}
            useCluster
          />
        </Map>
      </div>
    </div>
  }
}

ReactDOM.render(
  <App/>, mountNode
)
```