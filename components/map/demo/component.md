---
title: 在 Map 下添加自定义地图组件
order: 7
---

react-amap 组件库目前包含大概十个子组件，如果这些子组件的实现与你的需求不符合，或者没有你想要的组件，你可以写一个自定义的地图组件。这部分内容参考[自定义地图组件](/articles/extend)。

[JSFIDDLE 在线示例](https://jsfiddle.net/ioslh/h4u8mdng/25/)

```jsx
import { Map } from 'react-amap';

const MyMapComponent = (props) => {
  const map = props.__map__;
  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }
  const wrapperStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#fff',
    padding: '5px',
    border: '1px solid #333'
  }
  const spanStyle = {
    display: 'inline-block',
    height: '30px',
    lineHeight: '30px',
    width: '30px',
    textAlign: 'center',
    borderRadius: '50%',
    margin: '0 5px',
    cursor: 'pointer',
    background: '#333',
    color: '#fff',
    fontSize: '16px',
    border: '1px solid #333'
  }
  const zoomIn = () => map.zoomIn()
  const zoomOut = () => map.zoomOut()

  return (<div style={wrapperStyle} id="zoom-ctrl">
    <span style={spanStyle} onClick={zoomIn}>+</span>
    <span style={spanStyle} onClick={zoomOut}>-</span>
  </div>);
}

class App extends React.Component{
  render(){
    return <div style={{width: '100%', height: '400px'}}>
      <Map amapkey={'788e08def03f95c670944fe2c78fa76f'}>
        <MyMapComponent />
      </Map>
    </div>
  }
}
ReactDOM.render(
  <App/>,
  mountNode
)
```
