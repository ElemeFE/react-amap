# 更新日志

## 0.0.1-rc.2 - 2017-02-24

### 新增

* InfoWindow 组件加入 `onOpen` 和 `onClose` 回调；在信息窗体显示和关闭的时候调用；用户可以定义这两个方法以在相应的时机执行自己的操作。

* InfoWindow 组件窗体的内容可以写在 InfoWindow 里作为子组件；如：

    ```javascript
    <AMap>
      <InfoWindow position={/*...*/} open>
        <h3>这个可以作为你信息窗体的标题</h3>
        <div>再来个 div 作为窗体的主要内容；</div>
      </InfoWindow>
    </AMap>
    ```

* AMap 组件中可以嵌入其他的非 Amap 相关的组件，如：

    ```javascript
    <AMap>
      <div>这是一个普通的 div，也可以放在 AMap 组件中</div>
    </AMap>
    ```
    

## 0.0.1-rc.1 - 2017-02-23

### react-amap 发布