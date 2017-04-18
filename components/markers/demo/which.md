---
title: 确定点击的是哪个坐标？
order: 12
---

在使用 Markers 组件往地图上批量添加坐标点时，很常见的需求是：在事件触发时，比如点击事件，需要确定点击的是哪个坐标点。在提供原始数据来构造坐标点时（如下例中的 `this.markers`），我们可以在原始数据里注入自己的变量；当事件发生后，在回调里我们可以获得全部的原始数据，从而可以识别出点击的那个坐标点，及对应属性。


```jsx
import { Map, Markers } from 'react-amap';
// 辅助函数，随机生成一个坐标
const randomPosition = () => ({
  longitude: 120 + Math.random() * 20,
  latitude: 30 + Math.random() * 20
});

class App extends React.Component{
  constructor() {
    super();
    var _this = this;
    // 随机生成 10 个标记点的原始数据
    this.mapCenter = {longitude: 130, latitude: 40};
    this.markers = Array(10).fill(true).map(function(e, i){
      var position = randomPosition();
      return {
        position,
        // 这个属性就可以用来确定点击的是哪个坐标点
        myIndex: i
      }
    });
    this.markersEvents = {
      click(e, marker){
        // 通过高德原生提供的 getExtData 方法获取原始数据
        const extData = marker.getExtData();
        const index = extData.myIndex;
        alert(`点击的是第${index}号坐标点`);
        console.log(extData === _this.markers[index]);
      }
    }
    const markerStyle = {
      padding: '5px',
      border: '1px solid #ddd',
      background: '#fff',
    };
    this.renderMarkerFn = (extData) => (
      <div style={markerStyle}>{extData.myIndex}</div>
    );
  }

  render() {
    return <div style={{width: '100%', height: 400}}>
      <Map plugins={['ToolBar']} center={this.mapCenter} zoom={4}>
        <Markers 
          render={this.renderMarkerFn}
          markers={this.markers}
          events={this.markersEvents}
          useCluster
        />
      </Map>
    </div>
  }
}

ReactDOM.render(<App/>, mountNode);
```