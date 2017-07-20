---
title: 在 Map 下添加自定义 DOM 组件
order: 6
---

你可以在 Map 组件内部写其他的 DOM 组件，不过你需要自己给它定位；

可以把这个理解成一个自定义图层（Custom Layer），不过我们并没有专门定义一个 `CustomLayer` 组件，因为你完全可以用其他方式（比如`className="customLayer"`）来向你代码的阅读者表明这是一个自定义图层。更少的限制，才有更多的灵活性。

[JSFIDDLE 在线示例](https://jsfiddle.net/ioslh/mxc0h16p/7/)

```jsx
import { Map, Marker } from 'react-amap';
import { Button } from 'antd';
const styleA = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  padding: '5px 10px',
  border: '1px solid #d3d3d3',
  backgroundColor: '#f9f9f9'
}
const styleB = {
    position: 'absolute',
    right: '10px',
    bottom: '10px',
    padding: '10px',
    color: '#fff',
    backgroundColor: '#000'
}
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      center: null
    };
    this.mapEvents = {
      created: (map) => { 
        this.mapInstance = map;
        this.showCenter();
      },
      moveend: () => { this.showCenter() }
    };
    this.position = {
      longitude: 130,
      latitude: 30
    }
  }
  showCenter(){
    this.setState({
      center: `${this.mapInstance.getCenter()}`
    });
  }
  render(){
    return <div style={{width: '100%', height: '400px'}}>
      <Map events={this.mapEvents} center={this.position}>
        <Marker position={this.position} />
        <div className="customLayer" style={styleA}> 
          <h4>A Custom Layer</h4>
          <p>Current Center Is: {this.state.center}</p>
        </div>
        <div className="customLayer" style={styleB}>
          <p> Another Custom Layer</p>
          <Button onClick={()=>{alert('You Clicked!')}}>An Ant Design Button</Button>
        </div>
      </Map>
    </div>
  }
}
ReactDOM.render(
  <App/>,
  mountNode
)
```
