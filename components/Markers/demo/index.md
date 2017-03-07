---
title: Markers 的使用
---


```jsx
import AMap from 'react-amap';

const Markers = AMap.Markers;
const randomMarker = (len) => (
    Array(len).fill(true).map((e, idx) => ({
        content: idx + 1,
        longitude: 120 + Math.random() * 10,
        latitude: 30 + Math.random() * 20,
        id: idx,
    }))
);
class App extends React.Component{
    constructor(){
        super();
        
        this.markers = randomMarker(10);
    }
    render(){   
        const events = {
            created: (...ms) => {console.log(ms)},
            click: (...args) => {console.log(args)},
            dragstart: (e) => {console.log(e.target.getExtData().raw.content)}
        }
        return <div style={{width: 500, height: 400}}>
            <AMap plugins={['ToolBar']} center={{longitude: 120, latitude: 30}} zoom={12}>
                <Markers 
                    markers={this.markers}
                    events={events}
                />
            </AMap>
        </div>
    }
}

ReactDOM.render(
    <App/>, mountNode
)
```