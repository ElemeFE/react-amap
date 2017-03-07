import React, { Component, Children } from 'react';
import isFun from '../../lib/utils/isFun';
import error from '../../lib/utils/error';
import bindEvent from '../../lib/utils/bindEvent';
import CircleEditor from '../../components/CircleEditor';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

const defaultOpts = {
  style: {
    strokeColor: '#f33',
    strokeOpacity: 0.6,
    strokeWeight: 4,
    fillColor: '#ee2200',
    fillOpacity: 0.35,
    strokeStyle: 'solid',
  },
};

class Circle extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      error('NO_MAP_INSTANCE', true);
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.initMapCircle(props);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.setVisible(nextProps)) {
      this.setCenter(nextProps);
      this.setRadius(nextProps);
      this.setStyle(nextProps);
    }
  }
  
  initMapCircle(props) {
    let opts = {};
    if ('createOptions' in props) {
      opts = props.createOptions;
    }
    opts.map = this.map;
    this.mapCircle = new window.AMap.Circle(opts);
    const events = this.exposeCircleInstance(props);
    events && this.bindCircleEvents(events);
    
    if (this.setVisible(props)) {
      this.setCenter(props);
      this.setRadius(props);
      this.setStyle(props);
    }
  }
  
  exposeCircleInstance(props) {
    if ('events' in props) {
      const events = props.events || {};
      if (isFun(events.created)) {
        events.created(this.mapCircle);
      }
      delete events.created;
      return events;
    }
    return false;
  }
  
  bindCircleEvents(events) {
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      this.mapCircle.on(evName, events[evName]);
    });
  }
  
  setCenter(props) {
    let center;
    if ('center' in props) {
      center = new window.AMap.LngLat(props.center.longitude, props.center.latitude);
      const curCenter = this.mapCircle.getCenter();
      if (curCenter) {
        if (!curCenter.equals(center)) {
          this.mapCircle.setCenter(center);
        }
      } else {
        this.mapCircle.setCenter(center);
      }
    }
  }
  
  setRadius(props) {
    let radius;
    if ('radius' in props) {
      radius = props.radius;
      if (this.mapCircle.getRadius() !== radius) {
        this.mapCircle.setRadius(radius);
      }
    }
  }
  
  setStyle(props) {
    let style;
    if ('style' in props) {
      style = this.buildStyle(props.style);
      this.mapCircle.setOptions(style);
    }
  }
  
  setVisible(props) {
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
  
  renderEditor(children) {
    if (!children) {
      return null;
    }
    if (React.Children.count(children) !== 1) {
      return null;
    }
    return React.cloneElement(React.Children.only(children), {
      __circle__: this.mapCircle,
      __map__: this.map,
      __ele__: this.element,
    });
  }
  
  render() {
    return (this.renderEditor(this.props.children));
  }
}

export default Circle;
