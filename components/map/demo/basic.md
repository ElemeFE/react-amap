---
title: 基本用法
order: 1
---

Map 的父组件必须具有宽度和高度；

```jsx
import { Map } from 'react-amap';
class App extends React.Component{
  render(){
    return <div style={{width: '100%', height: '400px'}}>
      <Map />
    </div>
  }
}
ReactDOM.render(
  <App/>,
  mountNode
)
```