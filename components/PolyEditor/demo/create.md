---
title: PolyEditor 的使用
---




```jsx 
import AMap from 'react-amap';
const Polygon = AMap.Polygon;
const Polyline = AMap.Polyline;
const PolyEditor = AMap.PolyEditor;

class App extends React.Component{
    render(){
        const path = [
            {longitude: 120, latitude: 30 },
            {longitude: 130, latitude: 30 },
            {longitude: 120, latitude: 40 },
        ]
        const linePath = [
            {longitude: 150, latitude: 20 },
            {longitude: 170, latitude: 20 },
            {longitude: 150, latitude: 30 },
        ]
        const events = {
            created: (ins) => {console.log(ins)},
            addnode: () => {console.log('polyeditor addnode')},
            adjust: () => {console.log('polyeditor adjust')},
            removenode: () => {console.log('polyeditor removenode')},
            end: () => {console.log('polyeditor end')},
        }
        return <div style={{width: '100%', height: '300px'}}>
            <AMap>
                <Polygon path={path}>
                    <PolyEditor
                     active
                     events={events}
                    />
                </Polygon>
                <Polyline path={linePath}>
                    <PolyEditor
                         active
                        />
                </Polyline>
            </AMap>
        </div>
    }
}

ReactDOM.render(
    <App/>, mountNode
)
```