---
title: 事件绑定
order: 3
---

可以通过`events`属性给地图绑定事件；

```jsx
import AMap from 'react-amap';
class App extends React.Component{
  render(){
    const events = {
      created: (ins) => {console.log(ins)},
      click: () => {console.log('You Clicked The Map')}
    }
    return <div style={{width: '100%', height: '400px'}}>
      <AMap events={events}/>
    </div>
  }
}
ReactDOM.render(
  <App/>,
  mountNode
)
```