---
order: 1
title: 基本用法
---

要创建的一个图标，最简单的方式只要设置 Marker 组件的 `position` 属性就可以；高德地图中 Marker 的所有原生属性你都是可以配置的。

```jsx
import { Map, Marker } from 'react-amap';
class App extends React.Component{
  render(){   
    return <div>
      <div style={{width: '100%', height: 400}}>
        <Map 
          plugins={['ToolBar']} 
          center={{longitude: 120, latitude: 35}} 
        >
          <Marker position={{longitude: 120, latitude: 35 }} />
        </Map>
      </div>
    </div>
  }
}

ReactDOM.render(
  <App/>, mountNode
)
```