---
category: 覆盖物
order: 1
title: Marker 组件
---


## 何时使用

显示单个坐标点的时候使用；注意与 [Markers](/components/markers) 的区别。


## API

### 动态属性

| 属性 | 类型 | 默认取值 | 说明 |
|------|-----|------|-----|
|position| `{ longitude, latitude }` 或者 [LngLat](http://lbs.amap.com/api/javascript-api/reference/core#LngLat) | / | 点标记在地图上显示的位置，默认为地图中心点|
|offset| `{x, y}` 或者 [Pixel](http://lbs.amap.com/api/javascript-api/reference/core#Pixel) |  `Pixel(-10,-34)` |点标记显示位置偏移量，默认值为Pixel(-10,-34)。Marker指定position后，默认以marker左上角位置为基准点，对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。|
|icon| `String` 或者 [Icon](http://lbs.amap.com/api/javascript-api/reference/overlay#Icon) | / | 需在点标记中显示的图标。可以是一个本地图标地址，或者Icon对象。有合法的content内容时，此属性无效 |
|content| `String` 或者 DOM | / | 点标记显示内容，可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖 |
|draggable| `Boolean` | `false` | 设置点标记是否可拖拽移动 |
|visible| `Boolean` | `true`  | 点标记是否可见 |
|zIndex| `Number` | 100 | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示 |
|angle| `Number` | / | 点标记的旋转角度，广泛用于改变车辆行驶方向。注：angle属性是使用CSS3来实现的，支持IE9及以上版本|
|animation|`String` | `AMAP_ANIMATION_NONE` | 点标记的动画效果 |
|shadow| [Icon](http://lbs.amap.com/api/javascript-api/reference/overlay#Icon) | / | 点标记阴影，不设置该属性则点标记无阴影 |
|title| `String` | / | 鼠标滑过点标记时的文字提示，不设置则鼠标滑过点标无文字提示 |
|clickable| `Boolean` | / | 点标记是否可点击 |
|cursor| `String` | / | 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor |
|extData| 任意 | / | 用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等 |
|label| `{content,offset}` | / | 添加文本标注，content为文本标注的内容，offset为偏移量，左上角为偏移量为（0,0） |

### 静态属性

Marker 的静态属性有如下 6 个；，属性的作用与取值参考[高德官网](http://lbs.amap.com/api/javascript-api/reference/overlay#Marker)

+ `topWhenClick`
+ `bubble`
+ `raiseOnDrag`
+ `cursor`
+ `autoRotation`
+ `shape`

### 扩展属性

有一些属性是高德本身没有直接提供的，但是根据高德的实例方法可以实现。我们把它封装了一层，可以更方便的使用；

#### events 配置

支持通过配置`events`属性给 Marker 标记绑定事件；除了[高德原生提供的事件](http://lbs.amap.com/api/javascript-api/reference/overlay#Marker)外，我们扩展了`created`事件。

`events.created` 在标记实例创建成功后调用，传入参数就是标记实例。你可以在这里获得实例并进行操作。例如：

```jsx 
const events = {
  created: (ins) => { console.log(ins); },
  click: () => { console.log('clicked') },
}

/* ... */
<Map>
  <Marker position={{longitude: 110, latitude: 30 }} events={events} />
</Map>
```

## 推荐用法

利用 JSX 的强大语法，我们有能力非常个性化的定制标记的外观：直接 Marker 组件下写子组件，再也不用拼接 HTML 字符串了。
```jsx 
<Map>
  <Marker position={{longitude: 121, latitude: 34 }} >
    <div style={YOUR_STYLE}>A</div>
  </Marker>
</Map>
```

## 用[Marker](/components/marker)还是[Markers](/components/markers)？

+ 如果仅在地图上展示坐标点，使用 Markers
+ 如果想使用聚合插件，目前只能使用 Markers
+ 如果需要对点进行比较复杂的操作，并且需要自定义外观，使用 Marker