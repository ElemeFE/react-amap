---
title: AMap 的基本使用
order: 3
---


这里是 AMap 的使用


```jsx
import AMap from 'react-amap';

class App extends React.Component{
    // 
    handleMapInstance(map){
        this.mapInstance = map;
        console.log(this.mapInstance.getZoom());
    }
    
    render(){
        const plugins = [
            'MapType',
            'Scale',
            'OverView',
            {
                name: 'ToolBar',
                options: {
                    visible: true,  // 不设置该属性默认就是 true
                    onCreated(ins){
                        console.log(ins);
                    },
                },
            }
        ]
        
        const events = {
            click:() => {console.log('Clicked')},
            dblclick: () => {console.log('dblclick')},
            mapmove: () => {console.log('mapmove')},
            zoomstart: () => {console.log('zoom start')},
            created: (map) => {console.log('map is below');console.log(map)}
        };
        return <div style={{width: '100%', height: '300px'}}>
            <AMap
                plugins={plugins}
                events={events}
            />
        </div>
    }
}
ReactDOM.render(
    <App/>,
    mountNode
)
```