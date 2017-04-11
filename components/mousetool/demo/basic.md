---
title: MouseTool 的基本使用
order: 0
---


```jsx 
import { Map, MouseTool } from 'react-amap';

class App extends React.Component{
  constructor(){
    super(); 
    this.toolEvents = {
      created: (tool) => {
        this.tool = tool;
      }
    }
    this.mapPlugins = ['ToolBar'];
    this.mapCenter = {longitude: 120, latitude: 35};
  }
  
  drawCircle(){
    if(this.tool){
      this.tool.circle();
    }
  }
  
  drawRectangle(){
    if(this.tool){
      this.tool.rectangle();
    }
  }
  
  drawMarker(){
    if (this.tool){
      this.tool.marker();
    }
  }
  
  close(){
    if (this.tool){
      this.tool.close();
    }
  }
  
  render(){
    return <div>
      <div style={{width: '100%', height: 370}}>
        <Map 
          plugins={this.mapPlugins}
          center={this.mapCenter}
        >
          <MouseTool events={this.toolEvents}/>
        </Map>
       </div>
       <button onClick={()=>{this.drawMarker()}}>Draw Marker</button>
       <button onClick={()=>{this.drawRectangle()}}>Draw Rectangle</button>
       <button onClick={()=>{this.drawCircle()}}>Draw Circle</button>
       <button onClick={()=>{this.close()}}>Close</button>
     </div>
  }
}

ReactDOM.render(
  <App/>, mountNode
)
```