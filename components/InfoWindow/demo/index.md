---
title: InfoWindow 的使用
---




```jsx 
import AMap from 'react-amap';
const InfoWindow = AMap.InfoWindow;

class App extends React.Component{
    render(){
        const position = {
            longitude: 120,
            latitude: 30
        }
        
        const events = {
            created: (w) => {console.log(w)},
            change: () => {console.log('window changed')},
            open: () => {console.log('window open')},
            close: () => {console.log('window close')},
        }
    
        return <div style={{width: '400px', height: '300px'}}>
            <AMap>
                <InfoWindow
                    createOptions={{
                        isCustom: false,
                        content: 'asda'
                    }}
                    open
                    position={position}
                    events={events}
                >
                    <h3>Hello Window</h3>
                </InfoWindow>
            </AMap>
        </div>
    }
}

ReactDOM.render(
    <App/>, mountNode
)
```