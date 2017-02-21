import React, { PropTypes, Component, Children } from 'react';
import { render } from 'react-dom';
import APILoader from './utils/APILoader';
import isFun from './utils/isFun';
import Markers from './Markers';
import Polygon from './Polygon';
import Polyline from './Polyline';
import InfoWindow from './InfoWindow';
import Circle from './Circle';

/*
 * TODO(slh) 逐个比较 props 中的属性值，来判断需要刷新的地图元素
 * 其他的子组件也要如此处理，减少不必要的刷新
 */

/*
 * props
 * {
 *  onInit(func),
 *  center,
 *  zoom
 * }
 */

class AMap extends Component {
  constructor() {
    super();
    this.loader = new APILoader().load();
    this.state = {
      mapLoaded: false,
    }
  }
  
  componentWillReceiveProps(nextProps) {
    //
  }
  
  componentDidMount() {
    this.loadMap();
  }
  
  componentDidUpdate() {
    this.loadMap();
  }
  
  loadMap() {
    this.loader.then(() => {
      this.initMapInstance();
      if (!this.state.mapLoaded) {
        this.setState({
          mapLoaded: true,
        });
      }
    });
  }
  
  initMapTools() {
    this.mapTool = new window.AMap.ToolBar({
      position: 'RB',
      noIpLocate: true,
      locate: true,
      liteStyle: true,
      autoPosition: false,
    });
    this.map.addControl(this.mapTool);
    this.mapScale = new window.AMap.Scale();
    this.map.addControl(this.mapScale);
  }
  
  renderChildren() {
    return Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        __map__: this.map,
        __ele__: this.mapWrapper,
      })
    });
  }
  
  initMapInstance() {
    if (!this.map) {
      const opts = {
        showIndoorMap: false
      };
      if ('zoom' in this.props) {
        opts.zoom = this.props.zoom;
      }
      if ('center' in this.props) {
        opts.center = new window.AMap.LngLat(
          this.props.center.longitude,
          this.props.center.latitude
        );
      }
      this.map = new window.AMap.Map(this.mapWrapper, opts);
      this.map.on('zoomchange', () => {
        // 信息窗口的隐藏和显示交给用户由 state 控制
        // this.map.clearInfoWindow();
      });
      this.liftMapInstance();
      this.initMapTools();
    }
  }
  
  // 用户可以通过 onInit 事件获取 map 实例
  liftMapInstance() {
    if (isFun(this.props.onInit)) {
      this.props.onInit(this.map);
    }
  }
  
  render() {
    return (<div style={{ width: '100%', height: '100%' }}>
      <div ref={(div)=>{this.mapWrapper = div }} style={{ width: '100%', height: '100%' }}>
        <div style={{ background: '#eee', width: '100%', height: '100%' }}></div>
      </div>
      <div ref={(div) => {this.innerBridge = div;}} style={{ width: '100%', height: '100%' }}>
        { this.state.mapLoaded ? this.renderChildren() : null }
      </div>
    </div>);
  }
}

AMap.Markers = Markers;
AMap.Polygon = Polygon;
AMap.Polyline = Polyline;
AMap.InfoWindow = InfoWindow;
AMap.Circle = Circle;

export default AMap;
