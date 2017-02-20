import { PropTypes, Component } from 'react';
import isFun from './utils/isFun';
import error from './utils/error';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

class Polyline extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      /* eslint-disable no-console */
      error('NO_MAP_INSTANCE');
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.initMapPolyline();
      this.drawPolyline(props);
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
    this.drawPolyline(nextProps);
  }
  
  drawPolyline(props) {
    if(this.map) {
      if ('path' in props) {
        this.buildPath(props.path);
      } else {
        this.clearPath();
      }
      if ('editable' in props) {
        this.toggleEditable(props.editable);
      }
    }
  }
  
  initMapPolyline() {
    this.polyline = new window.AMap.Polyline({
      map: this.map,
      path: [],
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
  
  toggleEditable(editable) {
    if (editable) {
      this.activeEditable();
    } else {
      this.inactiveEditable();
    }
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
      editor.open();
    });
  }
  
  inactiveEditable() {
    if (this.polyEditor) {
      this.polyEditor.close();
    }
  }
  
  render() {
    return (null);
  }
}

export default Polyline;
