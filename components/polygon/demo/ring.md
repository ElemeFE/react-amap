---
title: 环多边形示例
order: 2
---


```jsx
import { Map, Polygon } from 'react-amap';

class App extends React.Component{
  constructor(){
    super();
    const outPath = [
      [100, 40],
      [123, 40],
      [123, 28],
      [100, 28]
    ]
    const innerRing1 = [
      [101, 39],
      [111, 39],
      [111, 29],
      [101, 29]
    ]
    const innerRing2 = [
      [112, 39],
      [122, 39],
      [122, 29],
      [112, 29]
    ]
    this.path = [
      outPath,
      innerRing1,
      innerRing2
    ]   
    this.mapCenter = [112, 34]
  }

  render(){
    return <div style={{width: '100%', height: 400}}>
      <Map zoom={4} center={this.mapCenter}>
        <Polygon path={this.path} />
      </Map>
    </div>
  }
}

ReactDOM.render(
  <App/>, mountNode
)
```
