---
title: 基本用法
order: 1
---

AMap 的父组件必须具有宽度和高度；

```jsx
import AMap from 'react-amap';
class App extends React.Component{
  render(){
    return <div style={{width: '100%', height: '400px'}}>
      <AMap />
    </div>
  }
}
ReactDOM.render(
  <App/>,
  mountNode
)
```