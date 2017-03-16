---
title: 标记点的属性如何配置
order: 2
---

Markers 组件在创建高德坐标点时，属性的设定非常灵活。
+ 直接在 markers 属性中提供原始数据时提供；如下例子中的 `position` 和 `draggable`；
+ 定义在 Markers 的 props 属性，值就是要设定的属性值；如下例子中的`bubble`；
+ 定义在 Markers 的 props 属性，值是一个函数；在创建标记时，会将函数的执行结果作为属性值；如下例子中的`angle`；函数传入的参数为 `markers` 属性提供的原始数据项及该项的索引；

```jsx
import { Map, Markers } from 'react-amap';

const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
    draggable: true,
    someProperty: parseInt(Math.random() * 100),
  }))
);

class App extends React.Component{
  constructor(){
    super();
    this.markers = randomMarker(10);
    this.mapCenter = {longitude: 115, latitude: 40};
  }

  
  randomAngle(extData, index){
    if (extData.someProperty % 3 === 0){
      return 45;
    }
    return 0;
  }
  
  render(){   
    return <div>
      <div style={{width: '100%', height: 400}}>
        <Map plugins={['ToolBar']} center={this.mapCenter} zoom={5}>
          <Markers 
            markers={this.markers}
            bubble={false}
            angle={(extData, index) => { return this.randomAngle(extData, index)}}
            useCluster={false}
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