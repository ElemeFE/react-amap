---
title: CircleEditor 的使用
---


```jsx
import { Map, Circle, CircleEditor } from 'react-amap';
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
          <Map center={{longitude: 120, latitude: 30}} zoom={12}>
              <Circle radius={5000} center={{longitude: 120, latitude: 30}}>
                  <CircleEditor events={events} active={this.state.active} />
              </Circle>
              <button onClick={()=>{this.toggleEdit()}}>toggle editable</button>
          </Map>
      </div>
      </div>
  }
}

ReactDOM.render(
  <App/>, mountNode
)
```