---
title: 事件绑定
order: 2
---

Markers 组件的事件绑定方式与 Marker 类似，都是定义 events 属性；但是调用的参数不一样；

```jsx
import { Map, Markers } from 'react-amap';

const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    label: idx + 1,
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
    id: idx,
  }))
);
class App extends React.Component{
  constructor(){
    super();
    this.markers = randomMarker(10);
    this.center = {longitude: 120, latitude: 30};
    this.markersEvents = {
      created:(allMarkers) => {console.log(allMarkers)},
      click: () => { console.log('clicked')},
      dragend: () => { console.log('dragend')}
    }
  }

  render(){   
    return <div>
      <div style={{width: '100%', height: 370}}>
        <Map plugins={['ToolBar']} center={this.center} zoom={12}>
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