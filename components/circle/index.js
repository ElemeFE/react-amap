// @flow
import React, { Component, Children } from 'react';
import isFun from '../../lib/utils/isFun';
import log from '../../lib/utils/log';
import toCapitalString from '../../lib/utils/toCapitalString';
import { getAMapPosition } from '../../lib/utils/utils';
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
    strokeStyle: 'solid'
  }
};

const configurableProps = [
  'center',
  'radius',
  'draggable',
  'extData',

  /* 原生的接口中并没有这些对象，这是本组件的扩展 */
  'visible',
  'style'
];

const allProps = configurableProps.concat([
  'zIndex',
  'bubble'
]);

type CircleProps = {
  __map__: Object,
  __ele__: HTMLElement,
  center?: LngLat,
  radius: number,
  draggable?: boolean,
  extData: any,
  visible?:boolean,
  style?:Object,
  zIndex?:number,
  bubble: boolean,
  events?:Object,
  children: any,
}

class Circle extends Component {
  
  props: CircleProps;
  map: Object;
  element: HTMLElement;
  mapCircle: Object;
  
  constructor(props: CircleProps) {
    super(props);
    if (!props.__map__) {
      log.warning('MAP_INSTANCE_REQUIRED');
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.initMapCircle(props);
    }
  }
  
  componentWillReceiveProps(nextProps: CircleProps) {
    if (this.map) {
      this.refreshCircleLayout(nextProps);
    }
  }
  
  initMapCircle(props: CircleProps) {
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
  
  buildCreateOptions(props: CircleProps) {
    const options = {};
    allProps.forEach((key) => {
      if (key in props) {
        if (key === 'style' && (props.style !== undefined)) {
          const styleItem = Object.keys(props.style);
          styleItem.forEach((item) => {
            // $FlowFixMe
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
  
  refreshCircleLayout(nextProps: CircleProps) {
    configurableProps.forEach((key) => {
      if (key in nextProps) {
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
  
  checkPropChanged(key: string, nextProps: CircleProps) {
    return this.props[key] !== nextProps[key];
  }
  
  getSetterValue(key: string, props: CircleProps) {
    if (key === 'center') {
      return getAMapPosition(props.center);
    }
    return props[key];
  }
   
  exposeCircleInstance(props: CircleProps) {
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
  
  bindCircleEvents(events: Object) {
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      this.mapCircle.on(evName, events[evName]);
    });
  }
  
  renderEditor(children: any) {
    if (!children) {
      return null;
    }
    if (React.Children.count(children) !== 1) {
      return null;
    }
    return React.cloneElement(React.Children.only(children), {
      __circle__: this.mapCircle,
      __map__: this.map,
      __ele__: this.element
    });
  }

  render() {
    return (this.renderEditor(this.props.children));
  }
}

export default Circle;
