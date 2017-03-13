---
title: 环多边形示例
order: 2
---


```jsx
import { Map, Polygon } from 'react-amap';

class App extends React.Component{
  constructor(){
    super();
    this.path = [
      [
        {longitude: 110, latitude: 30},
        {longitude: 115, latitude: 30},            
        {longitude: 120, latitude: 20},
        {longitude: 110, latitude: 20},

      ],[
        {longitude: 113, latitude: 28},
        {longitude: 118, latitude: 22},            
        {longitude: 112, latitude: 22}
      ]
    ]   
    this.mapCenter = { longitude: 115, latitude: 25 }
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