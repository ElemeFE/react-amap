// @flow
import React, { Component } from 'react';
import isFun from '../../lib/utils/isFun';
import log from '../../lib/utils/log';
import PolyEditor from '../../components/polyeditor';
import toCapitalString from '../../lib/utils/toCapitalString';
import { getAMapPosition } from '../../lib/utils/utils';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 *
 * }
 */

const configurableProps = [
  'path',
  'draggable',
  'extData',

  /* 本插件扩展的属性*/
  'style',
  'visible'
];

const allProps = configurableProps.concat([
  'zIndex',
  'bubble'
]);

type PolyProps = {
  path: PolygonPath,
  draggable: boolean,
  extData: any,
  style?: Object,
  visible?: boolean,
  zIndex?: number,
  bubble?: boolean,
  events?: boolean,
  children?: any,
  __map__: Object,
  __ele__: HTMLElement,
}

class Polygon extends Component {
  
  map: Object;
  element: HTMLElement;
  polygon: Object;
  
  constructor(props: PolyProps) {
    super(props);
    if (!props.__map__) {
      log.warning('MAP_INSTANCE_REQUIRED');
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.initMapPolygon(props);
    }
  }
  
  componentWillReceiveProps(nextProps: PolyProps) {
    if (this.map) {
      this.refreshPolygonLayout(nextProps);
    }
  }
  
  initMapPolygon(props: PolyProps) {
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
  
  buildCreateOptions(props: PolyProps) {
    const options = {};
    allProps.forEach((key) => {
      if (key in props) {
        if (key === 'style') {
          const styleItem = Object.keys(props.style);
          styleItem.forEach((item) => {
            // $FlowFixMe
            options[item] = props.style[item];
          });
          // visible 做特殊处理
        } else if (key !== 'visible') {
          options[key] = this.getSetterValue(key, props[key]);
        }
      }
    });
    return options;
  }
  
  refreshPolygonLayout(nextProps: PolyProps) {
    configurableProps.forEach((key) => {
      if (key in nextProps) {
        if (this.detectPropChanged(key, nextProps)) {
          if (key === 'visible') {
            if (nextProps.visible) {
              this.polygon.show();
            } else {
              this.polygon.hide();
            }
          } else if (key === 'style') {
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
  
  detectPropChanged(key: string, nextProps: PolyProps) {
    return this.props[key] !== nextProps[key];
  }
  
  getSetterValue(key: string, value: any) {
    if (key === 'path') {
      return this.buildPathValue(value);
    }
    return value;
  }
  
  buildPathValue(path: PolygonPath) {
    if (path.length) {
      if ('getLng' in path[0]) {
        return path;
      } else if ('longitude' in path[0]) {
        return path.map((p) => (getAMapPosition(p)));
      } else if (path.length === 2) {
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
  
  exposeInstance(){
    if ('events' in this.props && this.props.events) {
      const events = this.props.events;
      if (isFun(events.created)) {
        events.created(this.polygon);
      }
      delete events.created;
      return events;
    }
    return false;
  }
  
  bindOriginEvents(events: Object){
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      this.polygon.on(evName, events[evName]);
    });
  }
  
  renderEditor(children: any) {
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
        __ele__: this.element
      });
    }
    return null;
  }

  render() {
    return (this.renderEditor(this.props.children));
  }
}

export default Polygon;
