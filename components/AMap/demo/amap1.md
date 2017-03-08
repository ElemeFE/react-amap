---
order: 1
title: 使用例子1
---


使用例子 1

```jsx
import AMap from 'react-amap';

class App extends React.Component{

    
    render(){
        return <div><h2>使用例子1</h2><div style={{width: '400px', height: '300px'}}>
            <AMap/>
        </div></div>
    }
}
ReactDOM.render(
    <App/>,
    mountNode
)
```