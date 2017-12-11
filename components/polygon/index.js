// @flow
import React, { Component } from 'react';
import isFun from '../utils/isFun';
import withPropsReactive from '../utils/withPropsReactive'
import log from '../utils/log';
import PolyEditor from '../polyeditor';
import toCapitalString from '../utils/toCapitalString';
import { toLnglat } from '../utils/common';
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
  events?: Object,
  children?: any,
  onInstanceCreated?: Function,
  __map__: Object,
  __ele__: HTMLElement,
}

class Polygon extends Component<PolyProps, {}> {

  map: Object;
  element: HTMLElement;
  polygon: Object;
  setterMap: Object;
  converterMap: Object;

  constructor(props: PolyProps) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        log.warning('MAP_INSTANCE_REQUIRED');
      } else {
        const self = this
        this.setterMap = {
          visible(val) {
            console.log(val)
            if (val) {
              self.polygon && self.polygon.show()
            } else {
              self.polygon && self.polygon.hide()
            }
          },
          style(val) {
            self.polygon.setOptions(val)
          }
        }
        this.converterMap = {
          path(val) {
            return self.buildPathValue(val)
          }
        }
        this.map = props.__map__;
        this.element = this.map.getContainer();
        setTimeout(() => {
          this.initMapPolygon(props)
        }, 13)
      }
    }
  }

  get instance() {
    return this.polygon
  }

  initMapPolygon(props: PolyProps) {
    const options = this.buildCreateOptions(props);
    options.map = this.map;
    this.polygon = new window.AMap.Polygon(options);

    this.props.onInstanceCreated && this.props.onInstanceCreated()
  }

  buildCreateOptions(props: PolyProps) {
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

  detectPropChanged(key: string, nextProps: PolyProps) {
    return this.props[key] !== nextProps[key];
  }

  getSetterValue(key: string, value: any) {
    if (key in this.converterMap) {
      return this.converterMap[key](value)
    }
    return value;
  }

  buildPathValue(path: PolygonPath) {
    if (path.length) {
      if (path[0][0] && typeof path[0][0] === 'number') {
        return path.map((p) => (toLnglat(p)));
      } else if ('getLng' in path[0]) {
        return path;
      } else if ('longitude' in path[0] || 'lng' in path[0]) {
        return path.map((p) => (toLnglat(p)));
      } else if (path.length === 2) {
        // Ring
        // TODO(slh) Awkward Flow Issues
        // $FlowFixMe
        const out = this.buildPathValue(path[0]);
        // $FlowFixMe
        const inner = this.buildPathValue(path[1]);
        return [out, inner];
      } else {
        return [];
      }
    }
    return [];
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

export default withPropsReactive(Polygon)
