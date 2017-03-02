import React from 'react';
import isFun from '../../lib/utils/isFun';
import error from '../../lib/utils/error';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 *
 * }
 */

const Component = React.Component;

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
      this.polyEditable = false;
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
        this.setEditable(nextProps);
        this.setStyle(nextProps);
      }
    }
  }
  
  initMapPolygon(props) {
    this.polygon = new window.AMap.Polygon({
      map: this.map,
      path: this.prevPath,
    });
    this.polygon.on('click', (e) => {
      this.onPolygonClick(e);
    });
    this.polygon.on('mouseover', (e) => {
      this.onPolygonMouseOver(e);
    });
    this.polygon.on('mouseout', (e) => {
      this.onPolygonMouseOut(e);
    });
    
    if (this.setVisible(props)) {
      this.setPath(props);
      this.setEditable(props);
      this.setStyle(props);
    }
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
    } else {
      this.clearPath();
    }
  }
  
  setEditable(props) {
    this.toggleEditable(props.editable);
    // if ('editable' in props) {
    // }
  }
  
  setStyle(props) {
    let style;
    if ('style' in props) {
      style = this.buildStyle(props.style);
    } else {
      style = defaultOpts.style;
    }
    this.polygon.setOptions(style);
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
  
  onPolygonClick(e) {
    if (isFun(this.props.onClick)) {
      this.props.onClick(e);
    }
  }
  
  onPolygonMouseOver(e) {
    if (isFun(this.props.onMouseOver)) {
      this.props.onMouseOver(e);
    }
  }
  
  onPolygonMouseOut(e) {
    if (isFun(this.props.onMouseOut)) {
      this.props.onMouseOut(e);
    }
  }
  
  onPolygonChange(type) {
    if (isFun(this.props.onChange) && type !== 'end') {
      const path = this.polygon.getPath();
      const externalPath = [];
      if (path && path.length) {
        path.forEach((p) => {
          externalPath.push({
            longitude: p.getLng(),
            latitude: p.getLat(),
          });
        });
      }
      this.props.onChange(externalPath);
    }
  }
  
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
  
  toggleEditable(editable) {
    if (editable) {
      if (!this.polyEditable) {
        this.activeEditable();
      }
    } else {
      if (this.polyEditable) {
        this.inactiveEditable();
      }
    }
  }
  
  initEditorInstance() {
    this.polyEditor = new window.AMap.PolyEditor(this.map, this.polygon);
    this.polyEditor.on('addnode',() => {
      this.onPolygonChange('addnode');
    });
    this.polyEditor.on('adjust',() => {
      this.onPolygonChange('adjust');
    });
    this.polyEditor.on('removenode',() => {
      this.onPolygonChange('removenode');
      
    });
    this.polyEditor.on('end',() => {
      this.onPolygonChange('end');
    });
    return this.polyEditor;
  }
  
  // PolyEditor 是需要额外加载的插件
  loadPolyEditor() {
    if (this.polyEditor) {
      return new Promise((resolve) => {
        resolve(this.polyEditor);
      });
    }
    return new Promise((resolve, reject) => {
      this.map.plugin(['AMap.PolyEditor'], () => {
        resolve(this.initEditorInstance());
      });
    });
  }
  
  activeEditable() {
    this.loadPolyEditor().then((editor) => {
      this.polyEditable = true;
      editor.open();
    });
  }
  
  inactiveEditable() {
    this.polyEditable = false;
    if (this.polyEditor) {
      this.polyEditor.close();
    }
  }
  
  render() {
    return (null);
  }
}

export default Polygon;
