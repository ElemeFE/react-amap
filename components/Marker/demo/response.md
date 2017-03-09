---
order: 2
title: 响应式更改 Marker 属性
---

这个例子里展示用 state 管理实例的状态

```jsx
import AMap from 'react-amap';
const Marker = AMap.Marker;

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            visible: true,
            position: {longitude: 120, latitude: 35 },
            clickable: true,
            draggable: true,
        };  
    }
    
    toggleVisible() {
        this.setState({
            visible: !this.state.visible,
        });
    }
    
    randomPosition(){
        this.setState({
            position: { 
                longitude: 120 + Math.random() * 10 , 
                latitude: 35 + Math.random() * 10 
            }
        });
    }
    
    toggleClickable() {
        this.setState({
            clickable: !this.state.clickable,
        });
    }
    
    toggleDraggable() {
        this.setState({
            draggable: !this.state.draggable,
        });
    }
    
    
    render(){   
        return <div>
            <div style={{width: '100%', height: 300}}>
                <AMap plugins={['ToolBar']} center={this.state.position} zoom={6}>
                    <Marker 
                        events={{click:() => {console.log('marker clicked!')}}}
                        position={this.state.position} 
                        visible={this.state.visible} 
                        clickable={this.state.clickable}  
                        draggable={this.state.draggable}
                    />
                </AMap>
            </div>
            <button onClick={() => {this.toggleVisible() }}>Visible</button>
            <button onClick={() => {this.randomPosition() }}>Position</button>
            <button onClick={() => {this.toggleClickable() }}>Clickable</button>
            <button onClick={() => {this.toggleDraggable() }}>Draggable</button>
        </div>
    }
}

ReactDOM.render(
    <App/>, mountNode
)
```