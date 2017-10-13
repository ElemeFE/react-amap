---
title: 自定义地图组件
order: 2
---


### 如何写一个自定义的地图组件

react-amap 组件库目前包含的组件是有限的，所以最常碰到的疑问是：

> 如果我想要的地图组件在 react-amap 中没有怎么办？

现在，1.0.0 版本的 react-amap 拥有了扩展能力，你现在可以自己写一个地图组件了。然后，你就可以像这样使用你的组件，比如：

```jsx
const MyMapComponent = (props) => {
  // props.__ele__;
  // props.__map__;
  // your code here
};

// render here
<Map>
  <MyMapComponent />
</Map>
```

我们会给 Map 组件的所有子组件注入两个属性：地图实例，和地图容器；在你的组件内部，你可以:

1. 通过 props 的 `__map__` 属性访问创建好的高德地图实例；
2. *[Deprecated]* 原有通过 `__ele__` 属性访问地图容器方式不推荐，可以直接使用地图的 `getContainer` 方法获取。

拥有访问这两个属性的能力后，你可以根据高德原生 API 做高德允许你做的一切事情。实际上，react-amap 中的其他组件就是这么做的。

下面的例子中，我们写了一个自定义的 `ZoomCtrl` 组件，来定义一个自己的地图 zoom 控制器。在线的示例请访问 [jsfiddle](https://jsfiddle.net/ioslh/h4u8mdng/25/)。

```jsx
import { Map } from 'react-amap';

const ZoomCtrl = (props) => {
  const map = props.__map__;
  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }
  const style = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#fff',
    padding: '10px'
  }
  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();

  return (<div style={style}>
    <button onClick={zoomIn}>zoom in</button>
    <button onClick={zoomOut}>zoom out</button>
  </div>);
};

class App extends React.Component {
  render() {
    return <div style={{width: '100%', height: '400px'}}>
      <Map>
        <ZoomCtrl />
      </Map>
    </div>
  }
}

ReactDOM.render(
  <App/>,
  mountNode
)
```

默认情况下， react-amap 会给所有 Map 的子组件注入 `__ele__`, `__map__` 这两个属性，如果你明确不需要注入（比如跟你自己的属性名有冲突），可以设置组件的 `preventAmap` 属性为 `true`。不过即便注入了只要不使用并且也不存在属性名冲突的问题，也没有什么副作用。

```jsx
const MyNormalComponent = (props) => {
  // props.__ele__ 和 props.__map__ 都是 undefined
  // your code here
};

MyNormalComponent.preventAmap = true;

// render here
<Map>
  <MyNormalComponent />
</Map>
```
