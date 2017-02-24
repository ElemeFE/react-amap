# react-amap

> An [AMap](http://ditu.amap.com/) Component For React Project

Documentation is on the way... Some use examples are below:

```javascript
import AMap from 'react-amap';
 
const Markers = AMap.Markers;
const Polygon = AMap.Polygon;
// Polyline, Circle, InfoWindow, GroundImage
 
 
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