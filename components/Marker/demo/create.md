---
order: 1
title: 创建一个 Marker 图标
---

要创建的一个图标，最简单的方式只要设置 AMap.Marker 组件的 position 属性就可以；高德地图中 Marker 的所有原生属性你都是可以配置的。

不过需要注意的是，在高德地图中有很多属性只能在创建 Marker 实例时可以设置，创建实例成功后是不可修改的，所以无法响应式更改；虽然不够 Reactive，但是我们也没办法。


```jsx
import AMap from 'react-amap';
const Marker = AMap.Marker;

class App extends React.Component{
    render(){   
        const markerOptions = {
            draggable: true,
            visible: true,
            position: {longitude: 120, latitude: 35},
        }
        return <div>
            <div style={{width: '100%', height: 300}}>
                <AMap 
                    plugins={['ToolBar']} 
                    center={{longitude: 120, latitude: 35}} 
                >
                    <Marker 
                        position={{longitude: 120, latitude: 35 }} 
                    >
                    </Marker>
                </AMap>
            </div>
        </div>
    }
}

ReactDOM.render(
    <App/>, mountNode
)
```