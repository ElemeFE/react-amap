---
order: 3
title: 自定义 Marker 的外观
---

高德地图的图标 `content` 可以设置成一个 DOM，利用这个特性我们可以用 JSX 语法非常方便的定义图标的外观；当然，在 Marker 组件里不写子组件，默认就会用高德原生的图标外观；或者你自己配置 content 属性，定制图标的外观。

除此之外，还可以使用 render 属性和 render 方法来定义 Marker 外观（0.2.2更新），参考下一个示例。

```jsx
import { Map, Marker } from 'react-amap';

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      value: 1
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      value: this.state.value + 1
    })
  }

  render(){   
    const styleB = {
      background: '#000',
      color: '#fff',
      padding: '5px'
    }
    const styleC = {
      background: `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '30px',
      height: '40px',
      color: '#000',
      textAlign: 'center',
      lineHeight: '40px'
    }
    return <div>
      <div style={{width: '100%', height: 372}}>
        <Map 
          plugins={['ToolBar']} 
          center={{longitude: 121, latitude: 34}} 
          zoom={6}
        >
          <Marker position={{longitude: 120, latitude: 35 }} />
          <Marker position={{longitude: 121, latitude: 35 }} >
            A{this.state.value}
          </Marker>
          <Marker position={{longitude: 122, latitude: 35 }} >
            <div style={styleB}>B{this.state.value}</div>
          </Marker>
          <Marker position={{longitude: 120, latitude: 34 }} >
            <div style={styleC}>{this.state.value}</div>
          </Marker>
          <Marker position={{longitude: 121, latitude: 34 }} >
            <div>{this.state.value} MARKER</div>
            <div>WITH A LOT OF TEXT IN</div>
            <div>OBVIOUSLY NOT LIKE A MARKER</div>
          </Marker>
        </Map>
      </div>
      <button onClick={this.toggle}>Toggle</button>
    </div>
  }
}

ReactDOM.render(
  <App/>, mountNode
)
```
