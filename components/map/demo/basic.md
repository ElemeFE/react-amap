---
title: 基本用法
order: 1
---

Map 的父组件必须具有宽度和高度；

[JSFIDDLE 在线示例](https://jsfiddle.net/ioslh/y9cv20cv/)

```jsx
import { Map } from 'react-amap';
class App extends React.Component{
  render(){
    return <div style={{width: '100%', height: '400px'}}>
      <Map amapkey={'788e08def03f95c670944fe2c78fa76f'}/>
    </div>
  }
}
ReactDOM.render(
  <App/>,
  mountNode
)
```
