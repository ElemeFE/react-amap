---
title: 基本用法及事件绑定
order: 1
---


```jsx
import AMap from 'react-amap';

const Polygon = AMap.Polygon;

class App extends React.Component{
  constructor(){
    super();
    this.path = [
      {longitude: 120, latitude: 10},
      {longitude: 130, latitude: 10},            
      {longitude: 120, latitude: 30},            
    ]
    this.events = {
      click: () => {console.log('clicked')},
      created: () => {console.log('created')},
      mouseover: () => {console.log('mouseover')},
      dblclick: () => {console.log('dbl clicked')}
    };
    this.mapCenter = {longitude: 125, latitude: 20}
  }
  
  render(){

    return <div style={{width: '100%', height: 400}}>
      <AMap zoom={4} center={this.mapCenter}>
        <Polygon
          events={this.events}
          path={this.path}
        />
      </AMap>
    </div>
  }
}

ReactDOM.render(
  <App/>, mountNode
)
```