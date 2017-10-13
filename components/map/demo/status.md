---
title: status 属性
order: 6
---

通过 status 属性可以统一配置其他几个布尔值属性，[这些属性](https://github.com/ElemeFE/react-amap/blob/master/components/map/index.js#L46)包括：
> `animateEnable`,  `doubleClickZoom`,  `dragEnable`,  `isHotspot`,  `jogEnable`,  `keyboardEnable`,  `resizeEnable`,  `rotateEnable`,  `scrollWheel`,  `touchZoom`, `zoomEnable`

它们既可以通过 status 属性提供对象统一配置，也可以单独提供属性配置。注意， status 会覆盖其他的，即，如果既配置了 `animateEnable` 属性，又配置了 status 为 `{ animateEnable }`，后者会覆盖前者的取值。

[JSFIDDLE 在线示例](https://jsfiddle.net/ioslh/y9cv20cv/2/)

```jsx
import { Map } from 'react-amap';
class App extends React.Component{
  constructor() {
    super();
    this.state = {
      status: {
        zoomEnable: true
      },
      zoomEnable: false,  // 这个配置会被 status 中的 zoomEnable 覆盖，请不要这样同时配置两者
      tip: '可以缩放'
    };
    this.toggleZoom = this.toggleZoom.bind(this);
  }

  toggleZoom() {
    const nextEnable = !this.state.status.zoomEnable;
    const tip = nextEnable ? '缩放已启用' : '缩放已禁用' ;
    this.setState({
      status: {
        zoomEnable: nextEnable
      },
      tip
    });
  }

  render(){
    return <div>
      <div style={{width: '100%', height: '370px'}}>
        <Map 
          plugins={['ToolBar']}
          status={ this.state.status }
          zoomEnable={this.state.zoomEnable}
        />
      </div>
      <button onClick={this.toggleZoom}>Toggle Zoom Enable</button>
      <span>{this.state.tip}</span>
    </div>
  }
}
ReactDOM.render(
  <App/>,
  mountNode
)
```
