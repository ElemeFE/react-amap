---
title: 使用 render 方法定义坐标点的外观
order: 11
---

如果你不满足于原生的坐标点的样式，你可以定义 `props.render` 属性来设定坐标点的外观；`props.render`是一个函数，返回一个 React组件。

如果没有定义`props.render`函数（如这之前的例子所示），或者函数的执行结果为`false`（如下例`renderMarkerLayout`方法所示），都是采用高德地图默认的外观。

同时，我们也在生成的高德 Marker 实例中，挂载了一个 `render`方法，
你可以使用这个来方便的动态修改标记的外观；这个`render`方法接收一个 React 组件作为参数，
或者一个函数，返回一个 React 组件；
这个组件会被渲染为标记的外观。参考下面`mouseover`和`mouseout`中的使用。


```jsx
import { Map, Markers } from 'react-amap';

const alphabet = 'ABCDEFGHIJKLMNOP'.split('');
const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
    myLabel: alphabet[idx],
    myIndex: idx + 1,
  }))
);

const style = {
  padding: '8px',
  backgroundColor: '#000',
  color: '#fff',
  border: '1px solid #fff',
};

const mouseoverStyle = {
  padding: '8px',
  backgroundColor: '#fff',
  color: '#000',
  border: '1px solid #000',
}

class App extends React.Component{
  constructor(){
    super();
    this.markers = randomMarker(10);
    this.mapCenter = {longitude: 115, latitude: 40};
    this.state = {
      useCluster: false,
    };
    this.markerEvents = {
      mouseover:(e, marker) => {
        marker.render(this.renderMouseoverLayout);
      },
      mouseout: (e, marker) => {
        marker.render(this.renderMarkerLayout);
      }
    }
  }
  
  toggleCluster(){
    this.setState({
      useCluster: !this.state.useCluster,
    })
  }
  
  renderMouseoverLayout(extData){
    if (extData.myIndex === 3){
      return false;
    }
    return <div style={mouseoverStyle}>{extData.myLabel}</div>
  }
  
  renderMarkerLayout(extData){
    if (extData.myIndex === 3){
      return false;
    }
    return <div style={style}>{extData.myLabel}</div>
  }
  
  render(){   
    return <div>
      <div style={{width: '100%', height: 370}}>
        <Map plugins={['ToolBar']} center={this.mapCenter} zoom={4}>
          <Markers 
            events={this.markerEvents}
            markers={this.markers}
            useCluster={this.state.useCluster}
            render={this.renderMarkerLayout}
          />
        </Map>
      </div>
      <button onClick={()=>{ this.toggleCluster() }}>Toggle Cluster</button>
    </div>
  }
}

ReactDOM.render(<App/>, mountNode);
```