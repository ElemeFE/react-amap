import React from 'react';
import isFun from '../../lib/utils/isFun';
import error from '../../lib/utils/error';
import PolyEditor from '../../components/PolyEditor';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

const Component = React.Component;

const defaultOpts = {
  style: {
    isOutline: false,
    outlineColor: '#000',
    strokeColor: '#3366ff',
    strokeOpacity: 0.8,
    strokeWeight: 4,
    strokeStyle: 'solid',
    strokeDasharray: [0, 0, 0],
  }
};

class Polyline extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      error('NO_MAP_INSTANCE', true);
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.prevPath = [];
      this.lineEditable = false;
      this.initMapPolyline(props);
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
    if (this.map) {
      if (this.setVisible(nextProps)) {
        this.setPath(nextProps);
        this.setStyle(nextProps);
      }
    }
  }
  
  initMapPolyline(props) {
    let opts = {};
    if ('createOptions' in props) {
      opts = props.createOptions;
    }
    opts.map = this.map;
    this.polyline = new window.AMap.Polyline(opts);
    
    const events = this.exposeLineInstance(props);
    events && this.bingLineEvents(events);
    
    if (this.setVisible(props)) {
      this.setPath(props);
      this.setStyle(props);
    }
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
  
  setStyle(props) {
    let style;
    if ('style' in props) {
      style = this.buildStyle(props.style);
      this.polyline.setOptions(style);
    }
  }
  
  buildStyle(styleOpts) {
    const keys = [
      'isOutline',
      'outlineColor',
      'strokeColor',
      'strokeOpacity',
      'strokeWeight',
      'strokeStyle',
      'strokeDasharray',
    ];
    const style = {};
    keys.forEach(key => {
      style[key] = (key in styleOpts) ? styleOpts[key] : defaultOpts.style[key];
    });
    return style;
  }
  
  
  setVisible(props) {
    let visible = true;
    if ('visible' in props && props.visible === false) {
      visible = false;
    }
    if (visible) {
      this.polyline.show();
    } else {
      this.polyline.hide();
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
  
  buildPath(path) {
    if(path && path.length) {
      const mapPath = [];
      path.forEach((p) => {
        mapPath.push(new window.AMap.LngLat(p.longitude, p.latitude));
      });
      this.polyline.setPath(mapPath);
      this.setFitView();
    } else {
      this.clearPath();
    }
  }
  
  clearPath() {
    this.polyline.setPath([]);
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
