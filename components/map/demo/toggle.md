---
title: 地图销毁
order: 17
---

卸载 Map 组件时自动销毁实例，清空容器。

```jsx
import { Map } from 'react-amap';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      text: ''
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const nextDisplay = !this.state.display;
    this.setState({
      display: nextDisplay,
      text: nextDisplay ? '' : '高德地图对象已销毁，容器清空'
    });
  }

  render() {
    return <div style={{width: '100%', height: '400px'}}>
      <div style={{height: '370px'}}>
        { this.state.display ? <Map/> : null }
      </div>
      <button onClick={this.toggle}>地图切换显示</button>
      <span>{this.state.text}</span>
    </div>
  }
}

ReactDOM.render(
  <App/>,
  mountNode
)
```
