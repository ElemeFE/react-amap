import React, { Component, Children } from 'react';
import { render } from 'react-dom';
import log from '../../lib/utils/log';
import isFun from '../../lib/utils/isFun';
import toCapitalString from '../../lib/utils/toCapitalString';
import {
  MarkerConfigurableProps,
  MarkerAllProps,
  renderMarkerComponent
} from '../../lib/utils/markerUtils';
import {
  getAMapPosition,
  getAMapPixel
} from '../../lib/utils/utils';

class Marker extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      log.warning('MAP_INSTANCE_REQUIRED');
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.createMarker(props);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.map) {
      this.refreshMarkerLayout(nextProps);
    }
  }

  componentDidMount() {
    if (this.map) {
      this.setChildComponent(this.props);
    }
  }

  createMarker(props) {
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
  buildCreateOptions(props) {
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
  setMarkerLayout(props) {
    if (('render' in props) || ('children' in props)) {
      this.createContentWrapper(props);
    }
  }

  createContentWrapper(props) {
    this.contentWrapper = document.createElement('div');
    this.marker.setContent(this.contentWrapper);
  }

  setChildComponent(props) {
    if (this.contentWrapper) {
      if ('render' in props) {
        renderMarkerComponent(props.render, this.marker);
      } else if ('children' in props) {
        const child = props.children;
        const childType = typeof child;
        if (childType !== 'undefined' && this.contentWrapper) {
          if (childType === 'string') {
            render(<div>{child}</div>, this.contentWrapper);
          } else if (Children.count(child) === 1) {
            render(child, this.contentWrapper);
          } else {
            render(<div>{child}</div>, this.contentWrapper);
          }
        }
      }
    }
  }

  refreshMarkerLayout(nextProps) {
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

  getSetterParam(key, val) {
    if (key === 'position') {
      return getAMapPosition(val);
    } else if (key === 'offset') {
      return getAMapPixel(val);
    }
    return val;
  }

  // 获取设置属性的方法
  getSetterName(key) {
    switch (key) {
      case 'zIndex':
        return 'setzIndex';
      default:
        return `set${toCapitalString(key)}`;
    }
  }

  exposeMarkerInstance(props) {
    if ('events' in props) {
      const events = props.events;
      if (isFun(events.created)) {
        events.created(this.marker);
      }
      delete events.created;
      return events;
    }
    return false;
  }

  bindMarkerEvents(events) {
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
}

export default Marker;
