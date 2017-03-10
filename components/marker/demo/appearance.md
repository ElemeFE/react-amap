---
order: 3
title: 自定义 Marker 的外观
---

高德地图的图标 `content` 可以设置成一个 DOM，利用这个特性我们可以用 JSX 语法非常方便的定义图标的外观；当然，在 Marker 组件里不写子组件，默认就会用高德原生的图标外观。

```jsx
import AMap from 'react-amap';
const Marker = AMap.Marker;

class App extends React.Component{
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
            <div style={{width: '100%', height: 400}}>
                <AMap 
                    plugins={['ToolBar']} 
                    center={{longitude: 121, latitude: 34}} 
                    zoom={6}
                >
                    <Marker position={{longitude: 120, latitude: 35 }} />
                    <Marker position={{longitude: 121, latitude: 35 }} >
                        A
                    </Marker>
                    <Marker position={{longitude: 122, latitude: 35 }} >
                        <div style={styleB}>B</div>
                    </Marker>
                    <Marker position={{longitude: 120, latitude: 34 }} >
                        <div style={styleC}></div>
                    </Marker>
                    <Marker position={{longitude: 121, latitude: 34 }} >
                        <div>A MARKER</div>
                        <div>WITH A LOT OF TEXT IN</div>
                        <div>OBVIOUSLY NOT LIKE A MARKER</div>
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