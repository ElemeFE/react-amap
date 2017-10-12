---
title: 3D 模式地图
order: 6
---

高德官方的 JSSDK 新版本升级到 V1.4.0，增加了 3D 模式。开启方式是设置`viewMode`属性为`3D`；同时，为配合对 3D 地图进行控制，还提供了地图插件`ControlBar`，使用方式见示例。

不过目前开启 3D 模式后，切换地图语言，以及画环形 Polygon 会有问题。

```jsx
import { Map } from 'react-amap';
class App extends React.Component{
  constructor(){
    super();
    this.toggleCtrlBar = this.toggleCtrlBar.bind(this);
    this.state = {
      plugins: ['ControlBar']
    }
  }

  toggleCtrlBar(){
    if (this.state.plugins.indexOf('ControlBar') === -1) {
      this.setState({
        plugins: ['ControlBar']
      });
    } else {
      this.setState({
        plugins: []
      });
    }
  }

  render(){
    return <div>
      <div style={{width: '100%', height: '370px'}}>
        <Map viewMode="3D" plugins={this.state.plugins}/>
      </div>
      <button onClick={this.toggleCtrlBar}>Toggle Control Bar</button>
    </div>
  }
}
ReactDOM.render(
  <App/>,
  mountNode
)
```
