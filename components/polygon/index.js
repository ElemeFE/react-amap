import React, { Component, Children } from 'react';
import isFun from '../../lib/utils/isFun';
import error from '../../lib/utils/error';
import PolyEditor from '../../components/polyeditor';
import toCapitalString from '../../lib/utils/toCapitalString';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 *
 * }
 */


const configurableProps = [
  'path',
  'extData',
  
  /* 本插件扩展的属性*/
  'style',
  'visible',
];

const allProps = configurableProps.concat([
  'zIndex',
  'bubble',
]);

class Polygon extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      error('NO_MAP_INSTANCE', true);
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.prevPath = [];
      this.initMapPolygon(props);
    }
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
    this.refreshPolygonLayout(nextProps);
  }
  
  initMapPolygon(props) {
    const options = this.buildCreateOptions(props);
    options.map = this.map;
    this.polygon = new window.AMap.Polygon(options);
  
    const events = this.exposeInstance();
    events && this.bindOriginEvents(events);
    
    if ('visible' in props) {
      if (props.visible) {
        this.polygon.show();
      } else {
        this.polygon.hide();
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
          // visible 做特殊处理
        } else if(key !== 'visible') {
          options[key] = this.getSetterValue(key, props[key]);
        }
      }
    });
    return options;
  }
  
  refreshPolygonLayout(nextProps) {
    configurableProps.forEach((key) => {
      if (key in nextProps) {
        if (this.detectPropChanged(key, nextProps)) {
          if (key === 'visible') {
            if (nextProps.visible) {
              this.polygon.show();
            } else {
              this.polygon.hide();
            }
          } else if(key === 'style') {
            this.polygon.setOptions(nextProps.style);
          } else {
            const setterName = `set${toCapitalString(key)}`;
            const setterValue = this.getSetterValue(key, nextProps[key]);
            this.polygon[setterName](setterValue);
          }
        }
      }
    });
  }
  
  detectPropChanged(key, nextProps) {
    return this.props[key] !== nextProps[key];
  }
  
  getSetterValue(key, value) {
    if (key === 'path') {
      return this.buildPathValue(value);
    }
    return value;
  }
  
  buildPathValue(path) {
    if (path.length) {
      if ('getLng' in path[0]) {
        return path;
      } else if('longitude' in path[0]) {
        return path.map((p) => (this.buildPosition(p)));
      } else if(path.length === 2){
        // Ring
        const out = this.buildPathValue(path[0]);
        const inner = this.buildPathValue(path[1]);
        return [out, inner];
      } else {
        return [];
      }
    }
    return [];
  }
  
  buildPosition(pos) {
    return new window.AMap.LngLat(pos.longitude, pos.latitude);
  }
  
  exposeInstance(){
    if ('events' in this.props) {
      const events = this.props.events;
      if (isFun(events.created)) {
        events.created(this.polygon);
      }
      delete events.created;
      return events;
    }
    return false;
  }
  
  bindOriginEvents(events){
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      this.polygon.on(evName, events[evName]);
    });
  }
  
  renderEditor(children) {
    if (!children) {
      return null;
    }
    if (React.Children.count(children) !== 1) {
      return null;
    }
    const child = React.Children.only(children);
    if (child.type === PolyEditor) {
      return React.cloneElement(child, {
        __poly__: this.polygon,
        __map__: this.map,
        __ele__: this.element,
      });
    }
    return null;
  }
  
  render() {
    return (this.renderEditor(this.props.children));
  }
}

export default Polygon;
