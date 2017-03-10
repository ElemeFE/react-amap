---
order: 1
title: 使用例子1
---


使用例子 1一些内容

```jsx
import AMap from 'react-amap';

class App extends React.Component{

    
    render(){
        const events = {
            click: (e) => {console.log(e)}
        }
        return <div><h2>使用例子1</h2><div style={{width: '100%', height: '300px'}}>
            <AMap events={events}/>
        </div></div>
    }
}
ReactDOM.render(
    <App/>,
    mountNode
)
```