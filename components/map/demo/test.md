---
title: 用于测试
order: 0
---

这个是用于测试的示例

```jsx
import { Map, Marker } from 'react-amap';

const randomPosition = () => ({
  longitude: 110 + Math.random() * 20,
  latitude: 30 + Math.random() * 20 
})

class App extends React.Component{
  constructor(){
    super();
    const self = this
    this.plugins = ['Scale', 'ControlBar']
    this.state = {
      center: randomPosition(),
      zoom: 4,
      mapEvents: {
        click() {
          console.log('You clicked')
          self.setState({
            mapEvents: {
              moveend() {
                console.log('Now events changed')
              }
            }  
          })
        }
      },
      markerEvents: {
        click() {
          console.log('You clicked this marker')
        }
      },
      mapStyle: 'amap://styles/grey',
      city: '110000'
    }
    this.randomCenter = this.randomCenter.bind(this)
    this.randomZoom = this.randomZoom.bind(this)
    this.mapStyle = this.mapStyle.bind(this)
    this.changeCity = this.changeCity.bind(this)
  }

  randomCenter() {
    this.setState({
      center: randomPosition()
    })
  }

  randomZoom() {
    this.setState({
      zoom: parseInt(Math.random() * 15 + 3)
    })
  }

  mapStyle() {
    this.setState({
      mapStyle: 'amap://styles/6048e215faa76ccb7029cc9e6bf75d0d'
    })
  }

  changeCity() {
    this.setState({
      city: '340826'
    })
  }

  render(){
    return <div>
      <div style={{width: '100%', height: '370px'}}>
        <Map
          viewMode="3D"
          amapkey="f97efc35164149d0c0f299e7a8adb3d2"
          events={this.state.mapEvents}
          center={this.state.center}
          zoom={this.state.zoom}
          plugins={this.plugins}
        >
          <Marker events={this.state.markerEvents} position={this.state.center}/>
          <div>hello world</div>
        </Map>
      </div>
      <button onClick={this.randomCenter}>Random Center</button>
      <button onClick={this.randomZoom}>Random Zoom</button>
      <button onClick={this.mapStyle}>Change MapStyle</button>
      <button onClick={this.changeCity}>Change City</button>
    </div>
  }
}
ReactDOM.render(
  <App/>,
  mountNode
)
```
