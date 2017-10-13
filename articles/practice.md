---
category: Article
title: react-amap 最佳实践
order: 9
---

> ** 简单的说就是：在 React 组件的生命周期中，最好在 `constructor` 和 `componentWillMount` 方法中定义 react-amap 组件的引用类型属性，如 `center`。**

---

react-amap 的组件接收的属性中，有的是基本类型值，有的是引用类型值；如 Map 组件的 `zoom` 属性是数字类型，`center` 属性需要是一个对象。

如果是一个引用类型的属性，最好在 `constructor` 和 `componentWillMount` 阶段声明；然后在组件里引用这个变量。举例说明如下：

```jsx
class MapApp extends React.Component {
  constructor() {
    super();
    // Good Practice
    this.mapCenter = { longitude: 120, latitude: 30 };
  }

  render() {
    return <div style={{ width: 600, height: 400 }}>
      <Map zoom={5} center={this.mapCenter}/>
    </div>
  }
}
```

React 组件的生命周期有三个阶段：

```
Mounting
|- constructor()
|- componentWillMount()
|- render()
|- componentDidMount()

Updating
|- componentWillReceiveProps()
|- shouldComponentUpdate()
|- componentWillUpdate()
|- render()
|- componentDidUpdate()

Unmounting
|- componentWillUnmount()
```

React 组件状态有任何改变时，Updating 阶段的方法都会全部重新执行一遍；在此阶段声明的属性都会重新声明；在 react-amap 内部，就会发现属性是不同的引用，会强制修改；这样会造成地图组件没必要的刷新。

比如下面这种情况：

```jsx

class MapApp extends React.Component {
  render() {
    return <div style={{ width: 600, height: 400 }}>
      { /* Bad Practice */ }
      <Map zoom={5} center={{ longitude: 120, latitude: 30 }}/>
    </div>
  }
}
```

每次组件有任何一个属性更新时， render 方法重新执行，由于 center 是一个字面量对象，每一次跟之前的 center 属性都是不同的引用；如果你用鼠标移动了地图，其他属性的更新也会造成地图强行移回 center 定义的中心点。请参考这个 JSFIDDLE 示例的效果：https://jsfiddle.net/ioslh/y9cv20cv/4/

因此，**最好在 `constructor` 和 `componentWillMount` 方法中定义 react-amap 组件的引用类型属性**。只有当你明确需要改变地图的中心点时，才可以去修改 `center` 属性的引用。如下：

```jsx
// Good Practice

const randomPosition = () => ({
  longitude: 120 + Math.random() * 20,
  latitude: 30 + Math.random() * 10,
});

class MapApp extends React.Component {
  constructor() {
    super();
    this.state = {
      mapCenter: randomPosition()
    }
  }

  changeCenter() {
    this.setState({
      mapCenter: randomPosition()
    })
  }

  render() {
    return <div>
      <div style={{ width: 600, height: 400 }}>
        <Map zoom={5} center={this.state.mapCenter}/>
      </div>
      <button onClick={() => { this.changeCenter() }}>Move Map To A Random Center</button>
    </div>
  }
}
```

> 在本站的组件文档中，有一些例子并没有按照严格按照上述的方式来写，因为例子比较简单，且没有涉及到属性的变化。比如 `<Map plugins={['ToolBar']} />`。



