import React, { Component, Children } from 'react';
import { render } from 'react-dom';
import isFun from '../../lib/utils/isFun';

const configurableProps = [
  'position',
  'offset',
  'icon',
  'content',
  'topWhenClick',
  'draggable',
  'visible',
  'zIndex',
  'angle',
  'animation',
  'shadow',
  'title',
  'clickable',
  'extData',
  'label'
];
class Marker extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      // TODO(slh)
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.createMarker(props);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.refreshMarkerLayout(nextProps);
  }
  
  componentDidMount() {
    this.setChild();
  }
  
  createMarker(props) {
    const options = this.buildCreateOptions(props);
    this.marker = new window.AMap.Marker(options);
    const events = this.exposeMarkerInstance(props);
    events && this.bindMarkerEvents(events);
    this.buildMarkerLayout(props);
  }
  
  // 在创建实例时根据传入配置，设置初始化选项
  buildCreateOptions(props) {
    let opts = {};
    if ('createOptions' in props) {
      opts = props.createOptions;
    }
    configurableProps.forEach((key) => {
      if (key in props) {
        switch (key) {
          case 'position':
            opts.position = this.buildPosition(props.position);
            break;
          case 'offset':
            opts.offset = this.buildOffset(props.offset);
            break;
          default:
            opts[key] = props[key];
        }
      }
    });
    
    opts.map = this.map;
    return opts;
  }
  
  // 查询一个属性是否在标记创建完成之后动态更改
  getIsConfigurable(prop) {
    return configurableProps.indexOf(prop) !== -1;
  }
  
  buildMarkerLayout(props) {
    if (props.children) {
      this.createContentWrapper(props);
    } else {
      //
    }
  }
  
  buildIcon(icon) {
    
  }
  
  buildPosition(pos) {
    if ('getLng' in pos) {
      return pos;
    }
    return new window.AMap.LngLat(pos.longitude, pos.latitude);
  }
  
  buildOffset(os) {
    if ('getX' in os) {
      return os;
    }
    return new window.AMap.Pixel(os[0], os[1]);
  }
  
  
  createContentWrapper(props) {
    this.contentWrapper = document.createElement('div');
    this.marker.setContent(this.contentWrapper);
  }
  
  setChild() {
    const child = this.props.children;
    if (child && this.contentWrapper) {
      if (Children.count(child) === 1) {
        render(child, this.contentWrapper);
      } else {
        render(<div>{child}</div>, this.contentWrapper);
      }
    }
  }
  
  refreshMarkerLayout(nextProps) {
    configurableProps.forEach((key) => {
      // 必须确定属性改变才进行刷新
      if (this.props[key] !== nextProps[key]) {
        const setterName = this.getSetterName(key);
      }
    })
  }
  
  // 获取设置属性的方法
  getSetterName(key) {
    switch(key) {
      case 'topWhenClick':
        return 'setTop';
      case 'zIndex':
        return 'setzIndex';
      case 'visible':
        return 'show|hide';
      default:
        return `set${this.toCapitalStr(key)}`;
    }
  }
  
  toCapitalStr(str) {
    return  str[0].toUpperCase() + str.slice(1, str.length);
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
      this.marker.on(evName, events[evName]);
    });
  }
  
  render(){
    return null;
  }
}

export default Marker;