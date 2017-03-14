---
title: 使用 render 属性定义坐标点的外观
order: 11
---

如果你不满足于原生的坐标点的样式，你可以定义 `render` 属性来设定坐标点的外观；
如果没有定义`render`函数（如前述例子所示），或者函数的执行结果为`false`（如下例所示），都是采用高德地图默认的外观。


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
  }))
);

const style = {
  padding: '8px',
  backgroundColor: '#000',
  color: '#fff',
};

class App extends React.Component{
  constructor(){
    super();
    this.markers = randomMarker(10);
    this.mapCenter = {longitude: 115, latitude: 40};
    this.state = {
      useCluster: true,
    }
  }
  
  toggleCluster(){
    this.setState({
      useCluster: !this.state.useCluster,
    })
  }
  
  renderMarkerLayout(raw, idx){
    if (idx === 3){
      return false;
    }
    return <div style={style}>{raw.myLabel}</div>
  }
  
  render(){   
    return <div>
      <div style={{width: '100%', height: 370}}>
        <Map plugins={['ToolBar']} center={this.mapCenter} zoom={4}>
          <Markers 
            markers={this.markers}
            useCluster={this.state.useCluster}
            render={(raw, idx) => {return this.renderMarkerLayout(raw, idx);}}
          />
        </Map>
      </div>
      <button onClick={()=>{ this.toggleCluster() }}>Toggle Cluster</button>
    </div>
  }
}

ReactDOM.render(<App/>, mountNode);
```