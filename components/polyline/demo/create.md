---
title: Polyline 的使用
---



```jsx 
import AMap from 'react-amap';
const Polyline = AMap.Polyline;
const PolyEditor = AMap.PolyEditor;

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            visible: true,
        }
    }
    
    toggleVisible(){
        this.setState({
            visible: !this.state.visible,
        });
    }
    
    render(){
        const path = [
            {longitude: 120, latitude: 30 },
            {longitude: 130, latitude: 30 },
            {longitude: 120, latitude: 40 },
        ]
        const events = {
            created: (ins) => {console.log(ins)},
            show: () => {console.log('line show')},
            hide: () => {console.log('line hide')},
            click: () => {console.log('line clicked')},
        }
        return <div>
            <div style={{width: '100%', height: '300px'}}>
                <AMap plugins={['ToolBar']} zoom={3}>
                    <Polyline 
                        path={path}
                        events={events}
                        visible={this.state.visible}
                    />
                </AMap>
            </div>
            <button onClick={() => {this.toggleVisible() } }>Visible</button>
        </div>
    }
}

ReactDOM.render(
    <App/>, mountNode
)
```