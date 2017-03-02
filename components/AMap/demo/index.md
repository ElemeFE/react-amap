---
title: AMap 的基本使用
---


# 这里是 AMap 的使用

### 其他一些内容

```jsx
import AMap from 'react-amap';

class App extends React.Component{
    render(){
        return <div style={{width: '400px', height: '300px'}}>
            <AMap/>
        </div>
    }
}
ReactDOM.render(
    <App/>,
    mountNode
)
```