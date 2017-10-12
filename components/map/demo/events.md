---
title: 事件绑定
order: 3
---

可以通过`events`属性给地图绑定事件；

[JSFIDDLE 在线示例](https://jsfiddle.net/ioslh/mxc0h16p/6/)

```jsx
import { Map } from 'react-amap';
class App extends React.Component{
  render(){
    const events = {
      created: (ins) => {console.log(ins)},
      click: () => {console.log('You Clicked The Map')}
    }
    return <div style={{width: '100%', height: '400px'}}>
      <Map events={events}/>
    </div>
  }
}
ReactDOM.render(
  <App/>,
  mountNode
)
```
