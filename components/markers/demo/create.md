---
title: Markers 的使用
order: 1
---

本及介绍创建大量标记的基本用法

```jsx
import { Map, Markers } from 'react-amap';

const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 100 + Math.random() * 20,
      latitude: 30 + Math.random() * 20,
    }
  }))
);
class App extends React.Component{
  constructor(){
    super();
    this.markers = randomMarker(100);
  }
  render(){   
    return <div style={{width: '100%', height: 400}}>
      <Map plugins={['ToolBar']} center={{longitude: 110, latitude: 40}} zoom={6}>
        <Markers 
          markers={this.markers}
        />
      </Map>
    </div>
  }
}

ReactDOM.render(<App/>, mountNode)
```