---
title: Circle 插件
---


# Circle 插件的使用

```jsx
import AMap from 'react-amap';
const Circle = AMap.Circle;

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            center: {longitude: 140, latitude: 10},
            radius: 15000,
        }
    }
    
    render(){
        return <div style={{width: '400px', height: '300px'}}>
            <AMap plugins={['toolbar']} center={this.state.center}>
                <Circle center={ this.state.center } radius={ this.state.radius }/>
            </AMap>
        </div>
    }
}

ReactDOM.render(
    <App/>,
    mountNode
)
```