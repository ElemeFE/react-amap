import { PropTypes, Component, Children } from 'react';
import { findDOMNode, render } from 'react-dom';
import isFun from './utils/isFun';
import error from './utils/error';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

const defaultOpts = {
  offset: [0, -30],
  closeWhenClickMap: false,
};

class InfoWindow extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      /* eslint-disable no-console */
      error('NO_MAP_INSTANCE');
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.initInfoWindow(props);
      this.drawWindow(props);
    }
  }
  
  initInfoWindow(props) {
    this.infoDOM = document.createElement('div');
    let cls = 'amap_markers_pop_window';
    if ('className' in props) {
      cls = `amap_markers_pop_window ${props.className}`;
    }
    this.infoDOM.className = cls;
    const offset = 'offset' in props ? props.offset : defaultOpts.offset;
    
    this.infoWindow = new window.AMap.InfoWindow({
      isCustom: true,
      autoMove: true,
      content: this.infoDOM,
      closeWhenClickMap: false,
      offset: this.getOffset(offset),
    });
  }
  
  getOffset(os) {
    return new window.AMap.Pixel(os[0], os[1]);
  }
  
  componentWillReceiveProps(nextProps) {
    /*
     * {
     *  __map__,
     *  __ele__,
     *  path,<pos>
     *  onChange
     *  onClick
     *  onMouseOver
     *  onMouseOut
     * }
     */
    this.drawWindow(nextProps);
  }
  
  drawWindow(props) {
    let open = true;
    if ('open' in props && props.open === false) {
      open = false;
    }
    
    if (open) {
      this.showInfoWindow(props);
    } else {
      this.infoWindow.close();
    }
  }
  
  showInfoWindow(props) {
    const { position } = props;
    this.showPos = new window.AMap.LngLat(position.longitude, position.latitude);
    this.infoWindow.open(this.map, this.showPos);
    if (this.validateChild(props.children)) {
      render(props.children, this.infoDOM);
    } else {
      error('INFO_WINDOW_CHILD_INVALID');
    }
  }
  
  validateChild(child) {
    return Children.count(child) === 1;
  }

  
  render() {
    return (null);
  }
}

export default InfoWindow;
