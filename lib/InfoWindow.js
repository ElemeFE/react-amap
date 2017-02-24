import React from 'react';
import { findDOMNode, render } from 'react-dom';
import isFun from './utils/isFun';
import error from './utils/error';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

const Component = React.Component;
const Children = React.Children;

const defaultOpts = {
  offset: [0, -30],
  closeWhenClickMap: false,
};

class InfoWindow extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      error('NO_MAP_INSTANCE', true);
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.initInfoWindow(props);
    }
  }
  
  componentDidMount() {
    this.drawWindow(this.props);
  }
  
  initInfoWindow(props) {
    this.infoDOM = document.createElement('div');
    const offset = 'offset' in props ? props.offset : defaultOpts.offset;
    
    this.infoWindow = new window.AMap.InfoWindow({
      isCustom: true,
      autoMove: true,
      content: this.infoDOM,
      closeWhenClickMap: false,
      offset: this.getOffset(offset),
    });
    
    // this.infoWindow.on('close',() => {
    //   this.onWindowClose();
    // });
    // this.infoWindow.on('open',() => {
    //   this.onWindowOpen();
    // });
  }
  
  onWindowClose() {
    if (isFun(this.props.onClose)) {
      this.props.onClose();
    }
  }
  
  onWindowOpen() {
    if (isFun(this.props.onOpen)) {
      this.props.onOpen();
    }
  }
  
  getOffset(os) {
    return new window.AMap.Pixel(os[0], os[1]);
  }
  
  componentWillReceiveProps(nextProps) {
    /*
     * {
     *  __map__,
     *  __ele__,
     * }
     */
    this.drawWindow(nextProps);
  }
  
  drawWindow(props) {
    // 刷新开启关闭状态
    if (this.setOpen(props)) {
      this.setClassName(props);
      this.setChild(props);
    }
  }
  
  setChild(props) {
    const child = props.children;
    if (Children.count(child) === 1) {
      render(child, this.infoDOM);
    } else {
      render(<div>{props.children}</div>, this.infoDOM);
    }
  }
  
  setClassName(props) {
    // 刷新 className
    let cls = 'amap_markers_pop_window';
    if ('className' in props) {
      cls = `amap_markers_pop_window ${props.className}`;
    }
    this.infoDOM.className = cls;
  }
  
  setOpen(props) {
    let open = true;
    if ('open' in props && props.open === false) {
      open = false;
    }
    if (open) {
      this.showInfoWindow(props);
    } else {
      this.infoWindow.close();
    }
    return open;
  }
  
  showInfoWindow(props) {
    if ('position' in props) {
      const { position } = props;
      this.showPos = new window.AMap.LngLat(position.longitude, position.latitude);
      const prevOpen = this.infoWindow.getIsOpen();
      let needRefresh = true;
      // 如果之前窗口已经是开启状态
      // 检测一下新属性的位置是否改变，如果没有改变，不需要调用 open 方法
      if (prevOpen) {
        const prevPosition = this.infoWindow.getPosition();
        if (prevPosition.equals(this.showPos)) {
          needRefresh = false;
        }
      }
      if (needRefresh) {
        this.infoWindow.open(this.map, this.showPos);
      }
    } else {
      error('WINDOW_POSITION_REQUIRED', true);
    }
  }
  
  render() {
    return (null);
  }
}

export default InfoWindow;
