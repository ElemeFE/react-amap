import React, { Component, Children } from 'react';
import isFun from '../../lib/utils/isFun';
import error from '../../lib/utils/error';
import CircleEditor from '../../components/circleeditor';
import toCapitalString from '../../lib/utils/toCapitalString';
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

const configurableProps = [
  'center',
  'radius',
  'extData',
  
  /* 原生的接口中并没有这些对象，这是本组件的扩展 */
  'visible',
  'style',
];

const allProps = configurableProps.concat([
  'zIndex',
  'bubble',
]);

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
    this.refreshCircleLayout(nextProps);
  }
  
  initMapCircle(props) {
    const options = this.buildCreateOptions(props);
    options.map = this.map;
    this.mapCircle = new window.AMap.Circle(options);
    const events = this.exposeCircleInstance(props);
    events && this.bindCircleEvents(events);
    
    if ('visible' in props) {
      if (!props.visible) {
        this.mapCircle.hide();
      }
    }
  }
  
  buildCreateOptions(props) {
    const options = {};
    allProps.forEach((key) => {
      if (key in props) {
        if (key === 'style') {
          const styleItem = Object.keys(props.style);
          styleItem.forEach((item) => {
            options[item] = props.style[item];
          });
        } else {
          if (key !== 'visible') {
            options[key] = this.getSetterValue(key, props);
          }
        }
      }
    });
    return options;
  }
  
  refreshCircleLayout(nextProps) {
    configurableProps.forEach((key) => {
      if ('key' in nextProps) {
        if (this.checkPropChanged(key, nextProps)) {
          if (key === 'visible') {
            if (nextProps.visible) {
              this.mapCircle.show();
            } else {
              this.mapCircle.hide();
            }
          } else if (key === 'style') {
            this.mapCircle.setOptions(nextProps.style);
          } else {
            const setterName = `set${toCapitalString(key)}`;
            const setterParam = this.getSetterValue(key, nextProps);
            this.mapCircle[setterName](setterParam);
          }
        }
      }
    });
  }
  
  checkPropChanged(key, nextProps) {
    return this.props[key] !== nextProps[key];
  }
  
  getSetterValue(key, props) {
    if (key === 'center') {
      return this.buildPosition(props.center);
    }
    return props[key];
  }
  
  buildPosition(pos) {
    if ('getLng' in pos) {
      return pos;
    }
    return new window.AMap.LngLat(pos.longitude, pos.latitude);
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
