---
title: 基本用法
order: 1
---

这个例子演示如何创建一个圆形，并且动态改变属性；

```jsx
import { Map, Circle } from 'react-amap';
const randomIndex = (len) => (Math.floor(Math.random() * len));
const randomColor = () => {
  const chars = '0123456789abcdef'.split('');
  const len = chars.length;
  return `#${chars[randomIndex(len)]}${chars[randomIndex(len)]}` 
  + `${chars[randomIndex(len)]}${chars[randomIndex(len)]}` 
  + `${chars[randomIndex(len)]}${chars[randomIndex(len)]}`;
};

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      center: {longitude: 120, latitude: 20},
      radius: 15000,
      visible: true,
      style: {strokeColor: '#f00'},
      draggable: true,
    };
    this.circleEvents = {
      created: (ins) => {console.log(window.circle = ins)},
      click: () => {console.log('clicked')},
      mouseover: () => {console.log('mouseover')},
    }
  }
  
  toggleVisible(){
    this.setState({
      visible: !this.state.visible,
    });
  }
  
  toggleDraggable(){
    this.setState({
      draggable: !this.state.draggable,
    })
  }
  
  changeCenter(){
    this.setState({
      center: {
        longitude: 120 + Math.random() * 20,
        latitude: 20 + Math.random() * 10,
      }
    })
  }
  
  changeStyle(){
    this.setState({
      style: {strokeColor: randomColor() }
    });
  }
  
  changeRadius(){
    this.setState({
      radius: 15000 + Math.random() * 15000
    });
  }
  
  render(){
    return <div>
      <div style={{width: '100%', height: '370px'}}>
        <Map plugins={['ToolBar']} center={this.state.center}>
          <Circle 
            center={ this.state.center } 
            radius={ this.state.radius }
            events={ this.circleEvents }
            visible={ this.state.visible }
            style={ this.state.style }
            draggable={ this.state.draggable }
          />
        </Map>
      </div>
      <button onClick={() => { this.changeCenter() }}>Random Center</button>
      <button onClick={() => { this.changeRadius() }}>Change Radius</button>
      <button onClick={() => { this.toggleVisible() }}>Toggle Visible</button>
      <button onClick={() => { this.toggleDraggable() }}>Toggle Draggable</button>
      <button onClick={() => { this.changeStyle() }}>Change Style</button>
    </div>
  }
}

ReactDOM.render(
  <App/>,
  mountNode
)
```