---
title: 更好的 Markers 组件测试 
order: 0
---

临时测试

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

const style = {
  padding: '8px',
  backgroundColor: '#000',
  color: '#fff',
};

class App extends React.Component{
  constructor(){
    super();
    this.markers = randomMarker(10);
    this.center = {longitude: 115, latitude: 40};
    this.state = {
      // useCluster: true,
    }
  }
  
  renderMarkerLayout(raw, idx){
    if (idx === 3){
      return false;
    }
    return <div style={style}>{idx + 1}</div>
  }
  
  render(){   
    return <div>
      <div style={{width: '100%', height: 370}}>
        <Map plugins={['ToolBar']} center={this.center} zoom={4}>
          <Markers 
            markers={this.markers}
            useCluster
            render={(raw, idx) => {return this.renderMarkerLayout(raw, idx);}}
          />
        </Map>
      </div>
      <button onClick={ () => { this.toggleCluster() } }> Toggle Cluster</button>
    </div>
  }
}

ReactDOM.render(<App/>, mountNode);
```