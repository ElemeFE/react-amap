// @flow
import React from 'react';
import isFun from '../../lib/utils/isFun';
import log from '../../lib/utils/log';
import PolyEditor from '../../components/polyeditor';
import toCapitalString from '../../lib/utils/toCapitalString';
import { getAMapPosition } from '../../lib/utils/utils';

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
  'showDir'
]);

type LineProps = {
  path: PolylinePath,
  extData?: any,
  draggable?: boolean,
  visible?: boolean,
  style?: Object,
  zIndex?: number,
  bubble?: boolean,
  showDir?: boolean,
  __ele__: HTMLElement,
  __map__: Object,
  events: Object
};

class Polyline extends Component {

  map: Object;
  polyline: Object;
  element: HTMLElement;

  constructor(props: LineProps) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        log.warning('MAP_INSTANCE_REQUIRED');
      } else {
        this.map = props.__map__;
        this.element = props.__ele__;
        this.createMapPolyline(props);
      }
    }
  }

  componentWillReceiveProps(nextProps: LineProps) {
    if (this.map) {
      this.refreshPolylineLayout(nextProps);
    }
  }

  createMapPolyline(props: LineProps) {
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

  buildCreateOptions(props: LineProps) {
    const options = {};
    allProps.forEach((key) => {
      if (key in props) {
        if ((key === 'style') && props.style) {
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

  refreshPolylineLayout(nextProps: LineProps) {
    configurableProps.forEach((key) => {
      if (key in nextProps) {
        if (this.detectPropChanged(key, nextProps)) {
          if (key === 'visible') {
            if (nextProps.visible) {
              this.polyline.show();
            } else {
              this.polyline.hide();
            }
          } else if (key === 'style') {
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

  detectPropChanged(key: string, nextProps: LineProps) {
    return this.props[key] !== nextProps[key];
  }

  getSetterValue(key: string, value: any) {
    if (key === 'path') {
      return this.buildPathValue(value);
    }
    return value;
  }

  buildPathValue(path: PolylinePath) {
    if (path.length) {
      if ('getLng' in path[0]) {
        return path;
      }
      return path.map((p) => (getAMapPosition(p)));
    }
    return path;
  }

  exposeLineInstance(props: LineProps) {
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

  bingLineEvents(events: Object) {
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      this.polyline.on(evName, events[evName]);
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
        __poly__: this.polyline,
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

export default Polyline;
