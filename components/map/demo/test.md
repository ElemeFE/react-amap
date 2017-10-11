---
title: 开发测试用
order: 0
---

这个示例用于开发测试

```jsx
import { Map, Marker } from 'react-amap';
class App extends React.Component{
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.showStatus = this.showStatus.bind(this);
    const self = this;
    this.state = {
      center: [121, 32],
      status: {
        dragEnable: true
      },
      pitchEnable: true,
      lang: 'zh_cn',
      skyColor: '#ff0000',
      plugins: [
        'ToolBar',
        'OverView',
      ]
    };
    this.mapEvents = {
      created(map) {
        window.map = map;
        self.map = map;
      }
    };
  }

  toggle() {
    this.setState({
      plugins: [{
          name: 'ControlBar',
          options: {
            onCreated(ins) {
              console.log(ins);
            }
          }
        },'ToolBar', 'MapType']
    });
  }

  showStatus(){
    // console.log('clicked');
    // console.log(this.map.getStatus());
  }

  render(){
    return <div>
      <div style={{width: '100%', height: '370px'}}>
        <Map
          center={this.state.center}
          events={this.mapEvents} 
          amapkey={'788e08def03f95c670944fe2c78fa76f'}
          status={this.state.status}
          viewMode={'3D'}
          skyColor={this.state.skyColor}
          lang={this.state.lang}
          plugins={this.state.plugins}
          pitchEnable={this.state.pitchEnable}
          loading={<div style={{width: '100%', height: '100%'}}>Loading</div>}
        >
          <Marker position={[120, 20]}/>
        </Map>
      </div>
      <button onClick={this.showStatus}>Show Status</button>
      <button onClick={this.toggle}>Toggle</button>
    </div>
  }
}
ReactDOM.render(
  <App/>,
  mountNode
)
```
