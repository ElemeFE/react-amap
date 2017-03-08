---
order: 1
title: visible 属性切换
---

这个例子里展示 visible 属性切换

```jsx
import AMap from 'react-amap';
const Marker = AMap.Marker;

// console.log(window);
class App extends React.Component{
    constructor(){
        super();        
    }
    render(){   
        return <div style={{width: 400, height: 300}}>
            <AMap plugins={['ToolBar']} center={{longitude: 120, latitude: 35}} zoom={12}>
                <Marker 
                    position={{longitude: 120, latitude: 35 }} 
                    offset={[0, -5]}
                >
                    <div>AN ICON HERE</div>
                    <span>ANOTHER HERE</span>
                </Marker>
            </AMap>
        </div>
    }
}

ReactDOM.render(
    <App/>, mountNode
)
```