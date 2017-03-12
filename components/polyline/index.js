import React from 'react';
import isFun from '../../lib/utils/isFun';
import error from '../../lib/utils/error';
import PolyEditor from '../../components/polyeditor';
import toCapitalString from '../../lib/utils/toCapitalString';

/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

const Component = React.Component;

const configurableProps = [
  'path',
  'extData',
  'draggable',
  
  /* 扩展属性*/
  'visible',
  'style'
];

const allProps = configurableProps.concat([
  'zIndex',
  'bubble',
  'showDir',
]);


class Polyline extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      error('NO_MAP_INSTANCE', true);
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.createMapPolyline(props);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.refreshPolylineLayout(nextProps);
  }
  
  createMapPolyline(props) {
    const options = this.buildCreateOptions(props);
    options.map = this.map;
    this.polyline = new window.AMap.Polyline(options);
    
    const events = this.exposeLineInstance(props);
    events && this.bingLineEvents(events);
  
    if ('visible' in props) {
      if (props.visible) {
        this.polyline.show();
      } else {
        this.polyline.hide();
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
  
  refreshPolylineLayout(nextProps) {
    configurableProps.forEach((key) => {
      if (key in nextProps) {
        if (this.detectPropChanged(key, nextProps)) {
          if (key === 'visible') {
            if (nextProps.visible) {
              this.polyline.show();
            } else {
              this.polyline.hide();
            }
          } else if(key === 'style') {
            this.polyline.setOptions(nextProps.style);
          } else {
            const setterName = `set${toCapitalString(key)}`;
            const setterValue = this.getSetterValue(key, nextProps[key]);
            this.polyline[setterName](setterValue);
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
      }
      return path.map((p) => (this.buildPosition(p)));
    }
    return path;
  }
  
  buildPosition(pos) {
    return new window.AMap.LngLat(pos.longitude, pos.latitude);
  }
  
  exposeLineInstance(props) {
    if ('events' in props) {
      const events = props.events;
      if (isFun(events.created)) {
        events.created(this.polyline);
      }
      delete events.created;
      return events;
    }
    return false;
  }
  
  bingLineEvents(events) {
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      this.polyline.on(evName, events[evName]);
    })
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
        __poly__: this.polyline,
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

export default Polyline;
