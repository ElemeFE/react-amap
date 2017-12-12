---
title: 基本用法及事件绑定
order: 1
---


```jsx
import { Map, Polygon } from 'react-amap';
const randomPath = () => ({
   longitude: 100 + Math.random() * 50,
   latitude: 10 + Math.random() * 40,
 })
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      visible: true,
      draggable: true,
      path: Array(4).fill(true).map(randomPath),
    }
    this.events = {
      click: () => {console.log('clicked')},
      created: (ins) => {console.log(ins)},
      mouseover: () => {console.log('mouseover')},
      dblclick: () => {console.log('dbl clicked')}
    };
    this.mapCenter = {longitude: 125, latitude: 20}
  }
  
  toggleDraggable(){
    this.setState({
      draggable: !this.state.draggable,
    });
  }
  
  toggleVisible(){
    this.setState({
      visible: !this.state.visible,
    });
  }
  
  randomPath(){
    this.setState({
      path: Array(4).fill(true).map(randomPath),
    });
  }
  
  render(){
    return <div>
      <div style={{width: '100%', height: 372}}>
        <Map zoom={3} center={this.mapCenter}>
          <Polygon
            events={this.events}
            path={this.state.path}
            draggable={this.state.draggable}
            visible={this.state.visible}
          />
        </Map>
        <button onClick={() => { this.toggleVisible() }}>Toggle Visible</button>
        <button onClick={() => { this.toggleDraggable() }}>Toggle Draggable</button>
        <button onClick={() => { this.randomPath() }}>Change Path</button>
      </div>
    </div>
  }
}

ReactDOM.render(
  <App/>, mountNode
)
```
