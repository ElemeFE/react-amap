---
title: 地图加载过渡样式
order: 7
---

Map 组件现在还支持配置 loading 属性，在地图加载完成之前渲染。

[JSFIDDLE 在线示例](https://jsfiddle.net/ioslh/y9cv20cv/3/)

```jsx
import { Map } from 'react-amap';

const loadingStyle = {
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}
const Loading = <div style={loadingStyle}>Loading Map...</div>

class App extends React.Component{
  render(){
    return <div style={{width: '100%', height: '400px'}}>
      <Map loading={Loading}/>
    </div>
  }
}
ReactDOM.render(
  <App/>,
  mountNode
)
```
