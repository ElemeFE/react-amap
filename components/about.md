---
title: 基本介绍
order: 0
---

### 组件列表

react-amap 目前已经包含的组件如下：

| 名称 | 说明 |
|------|------|
| Map | 显示地图；下面的其他组件（除`PolyEditor`和`CircleEditor`外）必须作为 `Map` 的子组件使用|
| Marker | 在地图上显示单个坐标点 |
| Markers | 在地图上显示多个坐标点 |
| Polygon | 在地图上显示多边形 |
| Polyline |在地图上显示折线 |
| PolyEditor | 作为`Polygon`或`Polyline`的子组件，给他们提供编辑功能 |
| Circle | 在地图上显示圆形 |
| CircleEditor | 作为`Circle`的子组件使用，给他提供编辑功能 |
| GroundImage | 在地图上某个边界范围内显示图片 |
| InfoWindow | 在地图上显示信息窗体 |

### 术语说明——**动态属性**和**静态属性**的说明


#### 静态属性
> 只在创建实例时能定义的属性

#### 动态属性
> 创建实例以及实例创建成功后仍然可以操作改变的属性（比如通过 setState）



以高德地图的[多边形组件](http://lbs.amap.com/api/javascript-api/reference/overlay#Polygon)举例来说：其原生接口的使用过程是：

1. 首先根据属性来创建实例，创建成功后返回实例；
2. 后期再对这个实例进行操作；比如修改某个属性；

在创建时传入的属性，与创建成功后可以修改的属性是不同的；
比如`path`在创建时可以设置好，也可以在多边形实例创建成功后，通过实例的`setPath`的方法动态设置，这里类似于`path`的属性在本插件文档中成为**动态属性**；
而另一些属性，只有在创建实例时可以提供，一旦实例创建成功后不可修改，这个在本文档中成为**静态属性**；

而我们封装的多边形组件（`Polygon`）也就受到这些限制，以以下代码段说明：

```jsx 
import React from 'react';
import { Map, Polygon } from 'react-amap';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            path: [],
            bubble: true,
        }
    }
    /* THIS IS MEANINGLESS */
    toggleBubble(){
        this.setState({
            bubble: !this.state.bubble
        });
    }
    changePath(){
        this.setState({
            path: [ /*..your code to supply path props.*/ ]
        })
    }
    render(){
        return <div>
            <div style={{width: '500px', height: '400px'}}>
                <Map>
                    <Polygon path={this.state.path} bubble={this.state.bubble}/>
                </Map>
            </div>
            <button onClick={() => {this.toggleBubble() } }>toggleBubble</button>
            <button onClick={() => {this.changePath() } }>changePath</button>
        </div>
    }
}
```

在以上代码中，`path` 是 `Polygon` 的**动态属性**，而 `bubble` 是**静态属性**，所以可以通过`changePath`改变多边形的路径，而`toggleBubble`执行是没有任何作用的。

其他的组件使用也绝大部分是这种情况，所以在看文档时注意区分**动态属性**和**静态属性**。


> 有一些特殊情况，比如高德原生的插件是没有`visible`属性的，但是实例却有`show`和`hide`方法，所以我们做了个扩展，你只要维护 `visible` 的布尔状态值，我们会来调用原生的 `show`和`hide`方法；所以这个扩展的`visible`也是一个动态属性


### 事件绑定

所有的绑定事件都通过组件的`events`属性提供，比如：
```jsx
/* ... */
const events = {
    click: () => {console.log('You clicked')},
}
<Polygon events={events}  />
/* ... */
```
### 完全与高德原生接口兼容

#### 通过 `created` 事件实现更高级的使用需求

如果我们目前提供的组件不能满足你的定制需求，在事件绑定时，除了可以绑定原生的事件，我们扩展了一个事件：`created`，在高德原生实例创建成功后调用，参数就是创建的实例；获取到实例之后，就可以根据高德原生的方法对实例进行操作；比如：

```jsx
/* ... */
const events = {
    created: (instance) => { console.log(instance.getZoom())},
    click: () => { console.log('You clicked map') }
}
<Map events={events}  />
/* ... */
```

#### 自定义地图组件

你也可以写一个自定义的地图组件；文档参考[如何写一个自定义的地图组件](/articles/extend)
