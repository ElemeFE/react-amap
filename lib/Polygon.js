import { PropTypes, Component } from 'react';
import isFun from './utils/isFun';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 *
 * }
 */

class Polygon extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      /* eslint-disable no-console */
      console.warn('没有地图实例 ');
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.initMapPolygon();
      this.drawPolygon(props);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    /*
     * {
     *  __map__,
     *  __ele__,
     *  path,<pos>
     *  onChange
     *
     * }
     */
    // console.log('----------------------');
    // console.log(nextProps);
    this.drawPolygon(nextProps);
  }
  
  drawPolygon(props) {
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
  
  initMapPolygon() {
    this.polygon = new window.AMap.Polygon({
      map: this.map,
      path: [],
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
    // type;
    console.log(type);
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
      this.activeEditable();
    } else {
      this.inactiveEditable();
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

export default Polygon;
