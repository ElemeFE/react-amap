import React, { Component, Children } from 'react';
import isFun from '../../lib/utils/isFun';
import error from '../../lib/utils/error';
import PolyEditor from '../../components/PolyEditor';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 *
 * }
 */

const defaultOpts = {
  style: {
    strokeColor: '#00f',
    strokeOpacity: 0.4,
    strokeWeight: 4,
    fillColor: '#1791fc',
    fillOpacity: 0.65,
    strokeStyle: 'solid',
  },
};
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
    if(this.map) {
      if (this.setVisible(nextProps)) {
        this.setPath(nextProps);
        this.setStyle(nextProps);
      }
    }
  }
  
  initMapPolygon(props) {
    let opts = {};
    if ('createOptions' in props) {
      opts = props.createOptions;
    }
    opts.map = this.map;
    this.polygon = new window.AMap.Polygon(opts);
  
    const events = this.exposeInstance();
    events && this.bindOriginEvents(events);
    
    if (this.setVisible(props)) {
      this.setPath(props);
      this.setStyle(props);
    }
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
  
  setVisible(props) {
    let visible = true;
    if ('visible' in props && props.visible === false) {
      visible = false;
    }
    if (visible) {
      this.polygon.show();
    } else {
      this.polygon.hide();
    }
    return visible;
  }
  
  setPath(props) {
    if ('path' in props) {
      if (this.prevPath !== props.path) {
        this.buildPath(props.path);
        this.prevPath = props.path;
      }
    }
  }
  
  setStyle(props) {
    let style;
    if ('style' in props) {
      style = this.buildStyle(props.style);
      this.polygon.setOptions(style);
    }
  }
  
  buildStyle(styleOpts) {
    const keys = [
      'strokeColor',
      'strokeOpacity',
      'strokeWeight',
      'fillColor',
      'fillOpacity',
      'strokeStyle',
      'strokeDasharray',
    ];
    const style = {};
    keys.forEach(key => {
      style[key] = (key in styleOpts) ? styleOpts[key] : defaultOpts.style[key];
    });
    return style;
  }
  
  // onPolygonChange(type) {
  //   if (isFun(this.props.onChange) && type !== 'end') {
  //     const path = this.polygon.getPath();
  //     const externalPath = [];
  //     if (path && path.length) {
  //       path.forEach((p) => {
  //         externalPath.push({
  //           longitude: p.getLng(),
  //           latitude: p.getLat(),
  //         });
  //       });
  //     }
  //     this.props.onChange(externalPath);
  //   }
  // }
  
  buildPath(path) {
    if(path && path.length) {
      const mapPath = [];
      path.forEach((p) => {
        mapPath.push(new window.AMap.LngLat(p.longitude, p.latitude));
      });
      this.polygon.setPath(mapPath);
      this.setFitView();
    } else {
      this.clearPath();
    }
  }
  
  clearPath() {
    this.polygon.setPath([]);
  }
  
  setFitView() {
    this.map.setFitView();
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
