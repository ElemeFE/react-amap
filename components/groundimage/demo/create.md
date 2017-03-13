---
title: GroundImage 的使用
---

演示动态修改属性，以及绑定事件。

```jsx
import { Map, GroundImage } from 'react-amap';

function randomBoundsAndCenter() {
  // 随机生成一个中心点，然后据此生成一个边界
  const center = {
    longitude: 50 + Math.random() * 40,
    latitude: 10 + Math.random() * 20,
  }
  const bounds = {
    sw: {
      longitude: center.longitude - 1,
      latitude: center.latitude - 1,
    },
    ne: {
      longitude: center.longitude + 1,
      latitude: center.latitude + 1,
    }
  };
  return { center, bounds };
}
class App extends React.Component{
  constructor(){
    super();
    this.events = {
      created: (i) => {console.log(i)},
      click: () => {console.log('img click')},
      dblclick: () => {console.log('img dblclick')},
    };
    this.pics = [
      'http://oslhtemp.qiniudn.com/17-3-11/41530276-file_1489212686659_d597.png',
      'http://oslhtemp.qiniudn.com/17-3-11/23454245-file_1489212683958_17844.png',
      'http://oslhtemp.qiniudn.com/17-3-11/60788285-file_1489212678803_2b82.png',
      'http://oslhtemp.qiniudn.com/17-3-11/87419352-file_1489212678693_10b82.jpg',
      'http://oslhtemp.qiniudn.com/17-3-11/79272628-file_1489212678576_13b7c.png',
      'http://oslhtemp.qiniudn.com/17-3-11/26972995-file_1489212678445_9ebf.png',
    ];    
    const bc = randomBoundsAndCenter()
    this.state = {
      src: this.pics[0],
      visible: true,
      opacity: 1,
      bounds: bc.bounds,
      mapCenter: bc.center,
    };
  }
  toggleOpacity(){
    this.setState({
      opacity: Math.random(),
    });
  }
  toggleVisible(){
    this.setState({
      visible: !this.state.visible,
    });
  }
  randomPic(){
    const len = this.pics.length;
    const randomIdx = Math.floor(Math.random() * len);
    this.setState({
      src: this.pics[randomIdx]
    });
  }
  randomBounds(){
    const bc = randomBoundsAndCenter();
    this.setState({
      bounds: bc.bounds,
      mapCenter: bc.center,
    });
  }
  render(){
    return <div>
      <div style={{width: '100%', height: '370px'}}>
        <Map plugins={['ToolBar']} center={this.state.mapCenter} zoom={6}>
          <GroundImage
            visible={this.state.visible}
            events={this.events}
            bounds={this.state.bounds}
            src={this.state.src}
            opacity={this.state.opacity}
            clickable
          />
        </Map>
      </div>
      <button onClick={ () => { this.toggleVisible() }}>Toggle Visible</button>
      <button onClick={ () => { this.toggleOpacity() }}>Toggle Opacity</button>
      <button onClick={ () => { this.randomPic() }}>Random Pic</button>
      <button onClick={ () => { this.randomBounds() }}>Random Bounds</button>
    </div>
  }
}

ReactDOM.render(<App/>, mountNode);
```