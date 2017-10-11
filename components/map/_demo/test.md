---
title: 开发测试用
order: 0
---

这个示例用于开发测试

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
