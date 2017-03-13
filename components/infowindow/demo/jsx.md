---
title: 如何写信息窗体内容
order: 3
---

react-amap 提供两种方式定义信息窗体的内容：
+ 按照高德原生的方式通过定义 content 属性（取值是一个字符串或者一个 DOM）；
+ 不设置 content 属性，直接以 JSX 语法在 InfoWindow 标签下写子元素，即 props.children;

**如果同时设置了 content 属性且有 children，children 将被忽略**


```jsx 
import { Map, InfoWindow } from 'react-amap';

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      curVisibleWindow: null,
      count: 1,
      positionA: {
        longitude: 120,
        latitude: 30
      },
      positionB: {
        longitude: 130,
        latitude: 30
      },
      positionC: {
        longitude: 120,
        latitude: 20
      },
      positionD: {
        longitude: 130,
        latitude: 20
      },
    }
  }

  showWindow(id) {
    this.setState({
      curVisibleWindow: id,
    });
  }
  
  closeWindow(){
    this.setState({
      curVisibleWindow: null,
    })
  }
  
  changeCount() {
    this.setState({
      count: this.state.count + 1,
    })
  }

  render(){
    const html2 = `<div><h3>Window 2</h3><p>This is a window</p><p>Changing Value: ${this.state.count}</p></div>`;
    const html4 = `<div><h3>Window 4</h3><p>This is a window</p><p>Changing Value: ${this.state.count}</p></div>`;
    return <div>
      <div style={{width: '100%', height: '350px'}}>
        <Map zoom={3}>
          <InfoWindow
            position={this.state.positionA}
            visible={this.state.curVisibleWindow === 1}
            isCustom
          >
            <h3>Window 1</h3>
            <p>This is a window</p>
            <p>Changing Value: {this.state.count}</p>
            <button onClick={() => {this.closeWindow()}}>Close Window</button>
          </InfoWindow>
          
          <InfoWindow
            position={this.state.positionB}
            visible={this.state.curVisibleWindow === 2}
            content={html2}
            isCustom
          />
          
          <InfoWindow
            position={this.state.positionC}
            visible={this.state.curVisibleWindow === 3}
            isCustom={false}
          >
            <h3>Window 3</h3>
            <p>This is a window</p>
            <p>Changing Value: {this.state.count}</p>
            <button onClick={() => {this.closeWindow()}}>Close Window</button>
          </InfoWindow>
          
          <InfoWindow
            position={this.state.positionD}
            visible={this.state.curVisibleWindow === 4}
            content={html4}
            isCustom={false}
          />
        </Map>
      </div>
      <button onClick={() => { this.showWindow(1) }}>Show Window 1</button>
      <button onClick={() => { this.showWindow(2) }}>Show Window 2</button>
      <button onClick={() => { this.showWindow(3) }}>Show Window 3</button>
      <button onClick={() => { this.showWindow(4) }}>Show Window 4</button>
      <button onClick={() => { this.changeCount() }}>Change Value</button>
    </div>
  }
}

ReactDOM.render(
  <App/>, mountNode
)
```