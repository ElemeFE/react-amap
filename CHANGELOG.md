# 更新日志

## [2017-12-13] 1.2.0

### 更新

1. 对除 Markers 以外的其他组件都进行了重构；重构效果如下：
  1. 抽出了共用的逻辑代码，这部分代码以 HOC 注入到组件中；
  2. 重构后的组件 events 属性响应式的；
  3. 组件属性变更时对实例的操作更加智能；（比如对名为 offset 的属性进行修改，会尝试执行 setOffset 方法）
  4. 允许用户自己选择高德地图版本（Map 组件的 version 属性）；
  5. 对外使用的接口不变，所以可以无痛升级。


### 修复

1. 使用 CDN 接入 react-amap 资源时 Marker 组件有个严重的 Bug，不过似乎没人发现，不管了反正已经偷偷修好了。

---

## [2017-11-16] 1.1.2

### 更新

1. Map 组件卸载时自动销毁地图实例对象。

---

## [2017-11-13] 1.1.1

### 更新

1. 重构 APILoader 类，支持加载 AMapUI 组件库。

---

## [2017-10-13] 1.1.0

### 更新

1. 大幅重构 Map 组件；支持 `animateEnable`、`doubleClickZoom` 等属性的动态配置。
2. 支持 3D 模式。
3. 新增控件 ControlBar。
4. 删除了地图内层一个多余的 div。（[#48](https://github.com/ElemeFE/react-amap/issues/48)）
3. 支持给 Map 提供 loading 组件以渲染加载效果。
2. 支持给 Marker 组件添加 `className`。（[#40](https://github.com/ElemeFE/react-amap/issues/40)）
3. 补充了 TypeScript 模块声明，可以在 TypeScript 项目中使用。（[#47](https://github.com/ElemeFE/react-amap/issues/47)）

---

## [2017-08-14] 1.0.3

### 修复

* 修复部分组件在 unmount 后并没有从地图消失的问题。

---

## [2017-06-14] 1.0.0

### 重大更新

* 现在 react-amap 拥有了扩展能力，你可以自己写一个地图组件并且在 Map 中嵌入；相关文档请参考[自定义地图组件](https://elemefe.github.io/react-amap/articles/extend)。

---

## [2017-05-11] 0.2.7

### 优化

* 唯一使用了样式的 Markers 组件，直接把样式写在代码里，不需要为了这个额外引入 css-loader 之类的插件进行打包。

---

## [2017-04-13] 0.2.6

### 优化

* 优化打包方式；支持组件的单个 import

---

## [2017-04-11] 0.2.5

### 修复

* 在同构 SSR 架构的应用中确保不抛出错误

---

## [2017-03-22] 0.2.4-0

### 修复

* 在刷新 Markers 时，把之前存在的标记清空

---

## [2017-03-22] 0.2.3

### 新增

* 新增 [MouseTool](https://elemefe.github.io/react-amap/components/mousetool) 鼠标工具插件；通过该插件，可进行鼠标画标记点、线、多边形、矩形、圆、距离量测、面积量测、拉框放大、拉框缩小等功能。

---

## [2017-03-16] 0.2.3-0

### 修复

* 因为 React 框架的限制，`key` 属性另有所用，所以定义高德的 Key 时统一为 `amapkey`。详见[关于 key](https://elemefe.github.io/react-amap/articles/start#关于-key)

---

## [2017-03-16] 0.2.2

### 新增

* Marker 组件新增可以定义 render 静态属性渲染外观；也在高德 Marker 实例挂载 render 方法动态渲染外观。

---

## [2017-03-15] 0.2.1

### 优化

* 重新设计 Markers 接口，对标记的外观控制更灵活；本次更新不向下兼容。

---

## [2017-03-14] 0.2.0

### 优化

* 所有组件接口（除 Markers）重新设计，开发者可以通过绑定事件获得高德原生实例。

---

## [2017-02-23] 0.0.1-rc.1

### react-amap 发布
