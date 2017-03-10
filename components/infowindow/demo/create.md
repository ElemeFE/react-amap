---
title: InfoWindow 的使用
---




```jsx 
import AMap from 'react-amap';
const InfoWindow = AMap.InfoWindow;

class App extends React.Component{

    constructor() {
        super();
        this.state = {
            visible: false,
            count: 1,
            position: {
                longitude: 120,
                latitude: 30
            },
        }
    }

    toggleVisible() {
        this.setState({
            visible: !this.state.visible
        })
    }
    
    changeCount() {
        this.setState({
            count: this.state.count + 1,
        })
    }
    
    randomPosition() {
        this.setState({
            position: {
                longitude: 120 + Math.random() * 20,
                latitude: 30 + Math.random() * 20,
            }
        })
    }

    render(){
        const events = {
            created: (w) => {console.log(w)},
            // change: () => {console.log('window changed')},
            // open: () => {console.log('window open')},
            // close: () => {console.log('window close')},
        }
    
        return <div>
            <div style={{width: '100%', height: '300px'}}>
                <AMap>
                    <InfoWindow
                        position={this.state.position}
                        events={events}
                        visible={this.state.visible}
                        isCustom={false}
                        content={'<h2>OOPS</h2>'}
                    >
                        <h3>Hello Window {this.state.count}</h3>
                    </InfoWindow>
                </AMap>
            </div>
            <button onClick={() => { this.toggleVisible() }}>Visible</button>
            <button onClick={() => { this.changeCount() }}>Count</button>
            <button onClick={() => { this.randomPosition() }}>Position</button>
            
        </div>
    }
}

ReactDOM.render(
    <App/>, mountNode
)
```