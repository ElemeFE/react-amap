---
title: Polygon 的使用
---


```jsx
import AMap from 'react-amap';

const Polygon = AMap.Polygon;

class App extends React.Component{
    render(){
        const path = [
            {longitude: 120, latitude: 10},
            {longitude: 130, latitude: 10},            
            {longitude: 120, latitude: 30},            
        ]
        const events = {
            click: () => {console.log('clicked')},
            created: () => {console.log('created')},
            mouseover: () => {console.log('mouseover')},
            dblclick: () => {console.log('dbl clicked')}
        };
        
        const editorEvents = {
            created: (ins) => {console.log('editor created');},
            addnode: (e) => {console.log('editor add node')},
            adjust: (e) => {console.log('editor adjust')},
            removenode: (e) => {console.log('editor removenode')},
            end: (e) => {console.log('editor end')},
        }
        return <div style={{width: 500, height: 400}}>
            <AMap>
                <Polygon
                    createOptions={{}}
                    events={events}
                    path={path}
                >
                </Polygon>
            </AMap>
        </div>
    }
}

ReactDOM.render(
    <App/>, mountNode
)
```