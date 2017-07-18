---
category: Article
title: 更复杂的需求
order: 8
---

`react-amap` 是基于 React 对高德地图的进一步封装，有些时候你可能有更复杂的需求需要实现。

我们现在提供的[所有组件](/components/about)，你都可以通过`events.created`方法获得原始的高德实例，然后你可以按照高德的 API，对这些实例进行更复杂的操作。

```jsx
import { Map, Marker } from 'react-amap';
class App extends React.Component {
  constructor() {
    super();
    this.amapEvents = {
      created: (mapInstance) => {
        console.log('高德地图 Map 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
        console.log(mapInstance.getZoom());
      }
    };
    this.markerEvents = {
      created: (markerInstance) => {
        console.log('高德地图 Marker 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
        console.log(markerInstance.getPosition());
      }
    }
    this.markerPosition = { longitude: 120, latitude: 30 };
  }
  render() {
    return <div style={{ width: '100%', height: '400px' }}>
      <Map events={this.amapEvents}>
        <Marker position={this.markerPosition} events={this.markerEvents} />
      </Map>
    </div>
  }
}
ReactDOM.render(
  <App />,
  mountNode
);
```

对于我们尚未提供的组件，你也完全可以在地图的实例创建成功后，亲自调用高德的实例化方法进行创建；一个例子参考[如何使用AMap.Geocoder](https://github.com/ElemeFE/react-amap/issues/12)以及相应的 [jsfiddle 示例](https://jsfiddle.net/h4u8mdng/14/)。
或者在 [GitHub](https://github.com/ElemeFE/react-amap) 上给我们提交PR或者issue。

