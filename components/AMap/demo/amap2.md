---
order: 2
title: 使用例子2
---


使用例子 2

```jsx
import AMap from 'react-amap';

class App extends React.Component{

    
    render(){
        return <div><h2>使用例子2</h2><div style={{width: '400px', height: '300px'}}>
            <AMap/>
        </div></div>
    }
}
ReactDOM.render(
    <App/>,
    mountNode
)
```