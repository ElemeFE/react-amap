---
title: GroundImage 的使用
---


```jsx
import AMap from 'react-amap';

const GroundImage = AMap.GroundImage;
class App extends React.Component{
    render(){
        const events = {
            created: (i) => {console.log(i)},
            click: () => {console.log('img click')},
            dblclick: () => {console.log('img dblclick')},
        }
        const bounds = {
            sw: {longitude: 120, latitude: 30},
            ne: {longitude: 140, latitude: 50},
        };
        
        return <div style={{width: '100%', height: 400}}>
            <AMap center={{longitude: 120, latitude: 30}} zoom={12}>
                <GroundImage
                    bounds={bounds}
                    src={'http://subarupmd.edgesuite.net/content/media/mp_hero_880/2017_BRZ_photos_int_06.jpg'}
                    events={events}
                    clickable
                />
            </AMap>
        </div>
    }
}

ReactDOM.render(
    <App/>, mountNode
)
```