### 使用

```javascript
import AMap from 'react-amap';

const Markers = AMap.Markers;
const Polygon = AMap.Polygon;


class App extends Comonent{
    render(){
        const exampleMarkers = Array(20).fill(true).map((e, idx) => ({
          id: idx,
          longitude: Math.random() * 10 + 120,
          latitude: Math.random() * 10 + 30,
          content: idx + 1,
        }));
        
        const polygonPath = [
          {
            longitude: 120,
            latitude: 30,
          },
          {
            longitude: 125,
            latitude: 30,
          },
          {
            longitude: 120,
            latitude: 20,
          },
        ];
        
        return <AMap onInit={(map=>{this.mapInstance = map})}>
            <Markers 
                markers={exampleMarkers}
                onClick={(marker)=>{}}
                onHover={(marker)=>{}}
                onHoverOut={(marker)=>{}}
                useCluster={false}
            />
            <Polygon 
                path={polygonPath}
                onClick={()=>{}}
                editable
            />
        </AMap>
    }
}
```
