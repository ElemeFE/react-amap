import { PropTypes, Component } from 'react';
import isFun from './utils/isFun';
import error from './utils/error';
import bindEvent from './utils/bindEvent';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

const defaultOpts = {
  style: {
    strokeColor: '#000',
    strokeOpacity: 0.5,
    strokeWeight: 4,
    fillColor: '#fff',
    fillOpacity: 0.2,
    strokeStyle: 'solid',
  },
};

class Circle extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      /* eslint-disable no-console */
      error('NO_MAP_INSTANCE');
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.initMapCircle(props);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    //
    if (this.setShow(nextProps)) {
      this.setCenter(nextProps);
      this.setRadius(nextProps);
      this.setStyle(nextProps);
    }
  }
  
  initMapCircle(props) {
    this.mapCircle = new window.AMap.Circle({
      map: this.map
    });
    const evMap = {
      click: 'Click',
      dblclick: 'DblClick',
      mousedown: 'MouseDown',
      mouseup: 'MouseUp',
      mouseover: 'MouseOver',
      mouseout: 'MouseOut',
      hide: 'Hide',
      show: 'Show',
      change: 'Change',
    };
    bindEvent(this.mapCircle, evMap, this);
  
    if (this.setShow(props)) {
      this.setCenter(props);
      this.setRadius(props);
      this.setStyle(props);
    }
  }
  
  setCenter(props) {
    let center;
    if ('center' in props) {
      center = new window.AMap.LngLat(props.center.longitude, props.center.latitude);
    } else {
      error('CIRCLE_CENTER_REQUIRED');
    }
    const curCenter = this.mapCircle.getCenter();
    if (curCenter) {
      if (!curCenter.equals(center)) {
        this.mapCircle.setCenter(center);
      }
    } else {
      this.mapCircle.setCenter(center);
    }
  }
  
  setRadius(props) {
    let radius;
    if ('radius' in props) {
      radius = props.radius;
    } else {
      error('CIRCLE_RADIUS_REQUIRED');
    }
    if (this.mapCircle.getRadius() !== radius) {
      this.mapCircle.setRadius(radius);
    }
  }
  
  setStyle(props) {
    let style;
    if ('style' in props) {
      style = this.buildStyle(props.style);
    } else {
      style = defaultOpts.style;
    }
  }
  
  setShow(props) {
    let visible = true;
    if ('visible' in props && props.visible === false) {
      visible = false;
    }
    if (visible) {
      this.mapCircle.show();
    } else {
      this.mapCircle.hide();
    }
    return visible;
  }
  
  buildStyle(styleOpts) {
    const keys = [
      'strokeColor',
      'strokeOpacity',
      'strokeWeight',
      'fillColor',
      'fillOpacity',
      'strokeStyle'
    ];
    const style = {};
    keys.forEach(key => {
      style[key] = (key in styleOpts) ? styleOpts[key] : defaultOpts.style[key];
    });
    return style;
  }
  
  onClick(e) {
    if (isFun(this.props.onClick)) {
      this.props.onClick(e);
    }
  }
  
  onMouseDown(e) {
    if (isFun(this.props.onMouseDown)) {
      this.props.onMouseDown(e);
    }
  }
  
  onMouseUp(e) {
    if (isFun(this.props.onMouseUp)) {
      this.props.onMouseUp(e);
    }
  }
  
  onMouseOut(e) {
    if (isFun(this.props.onMouseOut)) {
      this.props.onMouseOut(e);
    }
  }
  
  onMouseOver(e) {
    if (isFun(this.props.onMouseOver)) {
      this.props.onMouseOver(e);
    }
  }
  
  
  
  
  render() {
    return (null);
  }
}

export default Circle;
