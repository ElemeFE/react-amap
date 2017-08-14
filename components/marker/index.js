// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import log from '../utils/log';
import isFun from '../utils/isFun';
import toCapitalString from '../utils/toCapitalString';
import {
  MarkerConfigurableProps,
  MarkerAllProps,
  renderMarkerComponent
} from '../utils/markerUtils';
import {
  getAMapPosition,
  getAMapPixel
} from '../utils/common';

class Marker extends Component {

  map: Object;
  element: HTMLElement;
  marker: Object;
  contentWrapper: HTMLElement;

  constructor(props: MarkerProps) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        log.warning('MAP_INSTANCE_REQUIRED');
      } else {
        this.map = props.__map__;
        this.element = props.__ele__;
        this.createMarker(props);
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps: MarkerProps) {
    if (this.map) {
      this.refreshMarkerLayout(nextProps);
    }
  }

  componentDidMount() {
    if (this.map) {
      this.setChildComponent(this.props);
    }
  }

  createMarker(props: MarkerProps) {
    const options = this.buildCreateOptions(props);
    this.marker = new window.AMap.Marker(options);
    const events = this.exposeMarkerInstance(props);
    events && this.bindMarkerEvents(events);

    this.marker.render = (function(marker) {
      return function(component) {
        renderMarkerComponent(component, marker);
      };
    })(this.marker);

    this.setMarkerLayout(props);
  }

  // 在创建实例时根据传入配置，设置初始化选项
  buildCreateOptions(props: MarkerProps) {
    let opts = {};
    MarkerAllProps.forEach((key) => {
      if (key in props) {
        opts[key] = this.getSetterParam(key, props[key]);
      }
    });
    opts.map = this.map;
    return opts;
  }

  // 初始化标记的外观
  setMarkerLayout(props: MarkerProps) {
    if (('render' in props) || ('children' in props)) {
      this.createContentWrapper();
    }
  }

  createContentWrapper() {
    this.contentWrapper = document.createElement('div');
    this.marker.setContent(this.contentWrapper);
  }

  setChildComponent(props: MarkerProps) {
    if (this.contentWrapper) {
      if ('render' in props) {
        renderMarkerComponent(props.render, this.marker);
      } else if ('children' in props) {
        const child = props.children;
        const childType = typeof child;
        if (childType !== 'undefined' && this.contentWrapper) {
          render(<div>{child}</div>, this.contentWrapper);
        }
      }
    }
  }

  refreshMarkerLayout(nextProps: MarkerProps) {
    MarkerConfigurableProps.forEach((key) => {
      // 必须确定属性改变才进行刷新
      if (this.props[key] !== nextProps[key]) {
        if (key === 'visible') {
          if (nextProps[key]) {
            this.marker.show();
          } else {
            this.marker.hide();
          }
        } else {
          const setterName = this.getSetterName(key);
          const param = this.getSetterParam(key, nextProps[key]);
          this.marker[setterName](param);
        }
      }
    });
    this.setChildComponent(nextProps);
  }

  getSetterParam(key: string, val: any) {
    if (key === 'position') {
      return getAMapPosition(val);
    } else if (key === 'offset') {
      return getAMapPixel(val);
    }
    return val;
  }

  // 获取设置属性的方法
  getSetterName(key: string) {
    switch (key) {
      case 'zIndex':
        return 'setzIndex';
      default:
        return `set${toCapitalString(key)}`;
    }
  }

  exposeMarkerInstance(props: MarkerProps) {
    if ('events' in props && props.events) {
      const events = props.events;
      if (isFun(events.created)) {
        events.created(this.marker);
      }
      delete events.created;
      return events;
    }
    return false;
  }

  bindMarkerEvents(events: Object) {
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      this.marker.on(evName, (e)=>{
        events[evName](e, e.target);
      });
    });
  }

  render() {
    return null;
  }

  componentWillUnmount() {
    this.marker.hide();
    this.marker.setMap(null);
    delete this.marker;
  }
}

export default Marker;
