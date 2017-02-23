import React from 'react';
import isFun from './utils/isFun';
import error from './utils/error';
import bindEvent from './utils/bindEvent';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */
const Component = React.Component;

const defaultOpts = {
  style: {
    strokeColor: '#f33',
    strokeOpacity: 0.6,
    strokeWeight: 4,
    fillColor: '#ee2200',
    fillOpacity: 0.35,
    strokeStyle: 'solid',
  },
};

class Circle extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      error('NO_MAP_INSTANCE', true);
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.circleEditable = false;
      this.initMapCircle(props);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.setVisible(nextProps)) {
      this.setCenter(nextProps);
      this.setRadius(nextProps);
      this.setStyle(nextProps);
      this.setEditable(nextProps);
    }
  }
  
  initMapCircle(props) {
    this.mapCircle = new window.AMap.Circle({
      map: this.map
    });
    const eventList = [
      'Click',
      'DblClick',
      'MouseDown',
      'MouseUp',
      'MouseOver',
      'MouseOut',
    ];
    bindEvent(this.mapCircle, eventList, this);
  
    if (this.setVisible(props)) {
      this.setCenter(props);
      this.setRadius(props);
      this.setStyle(props);
      this.setEditable(props);
    }
  }
  
  setEditable(props) {
    let editable = false;
    if ('editable' in props && props.editable === true ) {
      editable = true;
    }
    
    if (editable) {
      if (!this.circleEditable) {
        this.activeEdit();
      }
    } else {
      if (this.circleEditable) {
        this.inactiveEdit();
      }
    }
  }
  
  loadCircleEditor() {
    if (this.circleEditor) {
      return new Promise((resolve) => {
        resolve(this.circleEditor);
      });
    }
    return new Promise((resolve, reject) => {
      this.map.plugin(['AMap.CircleEditor'], () => {
        resolve(this.initEditorInstance());
      });
    });
  }
  
  initEditorInstance() {
    this.circleEditor = new window.AMap.CircleEditor(this.map, this.mapCircle);
    this.circleEditor.on('move',() => {
      this.onCircleChange('move');
    });
    this.circleEditor.on('adjust',() => {
      this.onCircleChange('adjust');
    });
    this.circleEditor.on('end',() => {
      this.onCircleChange('end');

    });
    return this.circleEditor;
  }
  
  activeEdit() {
    this.loadCircleEditor().then((editor) => {
      this.circleEditable = true;
      editor.open();
    });
  }
  
  inactiveEdit() {
    this.circleEditable = false;
    if (this.circleEditor) {
      this.circleEditor.close();
    }
  }
  
  setCenter(props) {
    let center;
    if ('center' in props) {
      center = new window.AMap.LngLat(props.center.longitude, props.center.latitude);
    } else {
      error('CIRCLE_CENTER_REQUIRED', true);
    }
    const curCenter = this.mapCircle.getCenter();
    if (curCenter) {
      if (!curCenter.equals(center)) {
        this.mapCircle.setCenter(center);
      }
    } else {
      this.mapCircle.setCenter(center);
    }
  }
  
  setRadius(props) {
    let radius;
    if ('radius' in props) {
      radius = props.radius;
    } else {
      error('CIRCLE_RADIUS_REQUIRED', true);
    }
    if (this.mapCircle.getRadius() !== radius) {
      this.mapCircle.setRadius(radius);
    }
  }
  
  setStyle(props) {
    let style;
    if ('style' in props) {
      style = this.buildStyle(props.style);
    } else {
      style = defaultOpts.style;
    }
    this.mapCircle.setOptions(style);
  }
  
  setVisible(props) {
    let visible = true;
    if ('visible' in props && props.visible === false) {
      visible = false;
    }
    if (visible) {
      this.mapCircle.show();
    } else {
      this.mapCircle.hide();
    }
    return visible;
  }
  
  buildStyle(styleOpts) {
    const keys = [
      'strokeColor',
      'strokeOpacity',
      'strokeWeight',
      'fillColor',
      'fillOpacity',
      'strokeStyle'
    ];
    const style = {};
    keys.forEach(key => {
      style[key] = (key in styleOpts) ? styleOpts[key] : defaultOpts.style[key];
    });
    return style;
  }
  
  onCircleChange(type) {
    if (isFun(this.props.onChange) && type !== 'end') {
      const center = this.mapCircle.getCenter();
      const radius = this.mapCircle.getRadius();
      this.props.onChange({
        center: {
          longitude: center.getLng(),
          latitude: center.getLat(),
        },
        radius,
      })
    }
  }
  
  
  render() {
    return (null);
  }
}

export default Circle;
