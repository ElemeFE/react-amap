---
title: render 方法渲染标记的外观
order: 4
---

> 0.2.2 新增

`0.2.2` 更新了可以使用 render 属性和 render 方法来定义 Marker 的外观。
+ render 属性：即定义为 Marker 组件的 render 属性。值是一个 React 组件，或者一个方法，返回 React 组件。只在初始化的时候有效，而且会覆盖 `content`、`children` 等属性。
+ render 方法：我们在高德原生的 Marker 实例上挂载了一个 render 方法，可以使你随时调用从而来改变 Marker 外观。render 方法传入的参数跟上面 render 属性取值一样。可以参考下面的例子里`mouseover`和`mouseout`方法了的使用。

```jsx
import { Map, Marker } from 'react-amap';

const styleA = {
  border: '1px solid #000',
  color: '#fff',
  backgroundColor: '#000',
  padding: '6px',
}

const styleB = {
  border: '1px solid #fff',
  color: '#000',
  backgroundColor: '#fff',
  padding: '6px',
}

class App extends React.Component{
  constructor(){
    super();
    this.mapCenter = {longitude: 121, latitude: 34};
    this.markerExtData = { myLabel: 'A'}
    this.markerEvents = {
      mouseover:(e) => {
        const marker = e.target;
        marker.render(this.renderMarkerHover);
      },
      mouseout:(e) => {
        const marker = e.target;
        marker.render(this.renderMarker);
      }
    }
  }
  
  renderMarker(extData){
    return <div style={styleA}>{extData.myLabel}</div>
  }
  
  renderMarkerHover(extData){
    return <div style={styleB}>{extData.myLabel}</div>
  }
  
  render(){   
    return <div>
      <div style={{width: '100%', height: 400}}>
        <Map 
          plugins={['ToolBar']} 
          center={this.mapCenter} 
          zoom={6}
        >
          <Marker 
            position={this.mapCenter} 
            render={this.renderMarker}
            events={this.markerEvents}
            extData={this.markerExtData}
          />
        </Map>
      </div>
    </div>
  }
}

ReactDOM.render(
  <App/>, mountNode
)
```
