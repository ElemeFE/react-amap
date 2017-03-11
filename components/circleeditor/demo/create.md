---
title: CircleEditor 的使用
---


```jsx
import AMap from 'react-amap';

const Circle = AMap.Circle;
const CircleEditor = AMap.CircleEditor;
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      active: true,
    }
  }
  
  toggleEdit(){
    this.setState({
      active: !this.state.active
    })
  }
  
  render(){
    const events = {
        move: () => {console.log('circle move')},
        adjust: () => {console.log('circle adjust')},
        end: () => {console.log('circle end')},
        created: (ins) => {console.log(ins)}
    }
      return <div>
      <div style={{width: '100%', height: 370}}>
          <AMap center={{longitude: 120, latitude: 30}} zoom={12}>
              <Circle radius={5000} center={{longitude: 120, latitude: 30}}>
                  <CircleEditor events={events} active={this.state.active} />
              </Circle>
              <button onClick={()=>{this.toggleEdit()}}>toggle editable</button>
          </AMap>
      </div>
      </div>
  }
}

ReactDOM.render(
  <App/>, mountNode
)
```