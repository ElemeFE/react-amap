import React from 'react';
import isFun from './utils/isFun';
import error from './utils/error';
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
        this.setEditable(nextProps);
        this.setStyle(nextProps);
      }
    }
  }
  
  initMapPolyline(props) {
    this.polyline = new window.AMap.Polyline({
      map: this.map,
      path: this.prevPath,
    });
    this.polyline.on('click', (e) => {
      this.onPolylineClick(e);
    });
    this.polyline.on('mouseover', (e) => {
      this.onPolylineMouseOver(e);
    });
    this.polyline.on('mouseout', (e) => {
      this.onPolylineMouseOut(e);
    });
    if (this.setVisible(props)) {
      this.setPath(props);
      this.setEditable(props);
      this.setStyle(props);
    }
  }
  
  setStyle(props) {
    let style;
    if ('style' in props) {
      style = this.buildStyle(props.style);
    } else {
      style = defaultOpts.style;
    }
    this.polyline.setOptions(style);
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
    } else {
      this.clearPath();
    }
  }
  
  setEditable(props) {
    let editable = false;
    if ('editable' in props && props.editable === true ) {
      editable = true;
    }
    if (editable) {
      if (!this.lineEditable) {
        this.activeEditable();
      }
    } else {
      if (this.lineEditable) {
        this.inactiveEditable();
      }
    }
  }
  
  onPolylineClick(e) {
    if (isFun(this.props.onClick)) {
      this.props.onClick(e);
    }
  }
  
  onPolylineMouseOver(e) {
    if (isFun(this.props.onMouseOver)) {
      this.props.onMouseOver(e);
    }
  }

  onPolylineMouseOut(e) {
    if (isFun(this.props.onMouseOut)) {
      this.props.onMouseOut(e);
    }
  }
  
  onPolylineChange(type) {
    if (isFun(this.props.onChange) && type !== 'end') {
      const path = this.polyline.getPath();
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
  
  initEditorInstance() {
    this.polyEditor = new window.AMap.PolyEditor(this.map, this.polyline);
    this.polyEditor.on('addnode',() => {
      this.onPolylineChange('addnode');
    });
    this.polyEditor.on('adjust',() => {
      this.onPolylineChange('adjust');
    });
    this.polyEditor.on('removenode',() => {
      this.onPolylineChange('removenode');
    });
    this.polyEditor.on('end',() => {
      this.onPolylineChange('end');
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
      this.lineEditable = true;
      editor.open();
    });
  }
  
  inactiveEditable() {
    this.lineEditable = false;
    if (this.polyEditor) {
      this.polyEditor.close();
    }
  }
  
  render() {
    return (null);
  }
}

export default Polyline;
