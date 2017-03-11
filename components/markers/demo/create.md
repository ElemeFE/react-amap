---
title: Markers 的使用
order: 1
---


```jsx
import AMap from 'react-amap';

const Markers = AMap.Markers;
const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    label: idx + 1,
    id: idx,
    position: {
      longitude: 100 + Math.random() * 20,
      latitude: 30 + Math.random() * 20,
    }
  }))
);
class App extends React.Component{
  constructor(){
    super();
    this.markers = randomMarker(100);
  }
  render(){   
    const events = {
      created: (...ms) => {console.log(ms)},
      click: (...args) => {console.log(args)},
      dragstart: (e) => {console.log(e.target.getExtData().raw.label)}
    }
    return <div style={{width: '100%', height: 400}}>
      <AMap plugins={['ToolBar']} center={{longitude: 120, latitude: 30}} zoom={12}>
        <Markers 
          markers={this.markers}
          events={events}
        />
      </AMap>
    </div>
  }
}

ReactDOM.render(<App/>, mountNode)
```