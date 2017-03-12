---
title: 动态改变属性
order: 5
---

地图的**动态属性**在地图创建成功后可以动态的改变；

```jsx
import AMap from 'react-amap';
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      center: { longitude: 115, latitude: 30 }
    };
  }
  changeCenter(){
    this.setState({
      center: {
        longitude: 115 + Math.random() * 10,
        latitude: 30 + Math.random() * 10,
      }
    });
  }
  render(){
    return <div>
      <div style={{width: '100%', height: '360px'}}>
        <AMap center={this.state.center}/>
      </div>
      <button onClick={() => { this.changeCenter() }}>Random Change Center</button>
    </div>
  }
}
ReactDOM.render(
  <App/>,
  mountNode
)
```