---
title: Marker 的使用
---


```jsx
import AMap from 'react-amap';
const Marker = AMap.Marker;

// console.log(window);
class App extends React.Component{
    constructor(){
        super();        
    }
    render(){   
        return <div style={{width: 500, height: 400}}>
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