import React from 'react';
import APILoader from '../../lib/utils/APILoader';
import isFun from '../../lib/utils/isFun';
import log from '../../lib/utils/log';
import toCapitalString from '../../lib/utils/toCapitalString';
import { getAMapPosition } from '../../lib/utils/utils';
import Marker from '../marker';
import Markers from '../markers';
import Polygon from '../polygon';
import Polyline from '../polyline';
import InfoWindow from '../infowindow';
import Circle from '../circle';
import GroundImage from '../groundimage';
// import CircleEditor from '../circleeditor';
// import PolyEditor from '../polyeditor';

/*
 * props
 * {
 *  center,
 *  zoom
 * }
 */

const Component = React.Component;
const Children = React.Children;
const ComponentList = [
  Circle,
  GroundImage,
  InfoWindow,
  Markers,
  Marker,
  Polyline,
  Polygon
];

const configurableProps = [
  'layers',
  'zoom',
  'center',
  'labelzIndex',
  'lang',
  'rotateEnable',
  'mapStyle',
  'features',
  'cursor',
  'defaultLayer'
];

const allProps = configurableProps.concat([
  'view',
  'zooms',
  'crs',
  'animateEnable',
  'isHotspot',
  'resizeEnable',
  'showIndoorMap',
  'indoorMap',
  'expandZoomRange',
  'dragEnable',
  'zoomEnable',
  'doubleClickZoom',
  'keyboardEnable',
  'jogEnable',
  'scrollWheel',
  'touchZoom',
  'showBuildingBlock'
]);

const defaultOpts = {
  MapType: {
    showRoad: false,
    showTraffic: false,
    defaultType: 0
  },
  ToolBar: {
    position: 'RB',
    noIpLocate: true,
    locate: true,
    liteStyle: true,
    autoPosition: false
  },
  OverView: {}
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapLoaded: false
    };
    this.pluginMap = {};
    this.prevCenter = undefined;
    this.prevZoom = undefined;
    this.loader = new APILoader(props.amapkey).load();
  }

  componentWillReceiveProps(nextProps) {
    const prevProps = this.props;
    this.loader.then(() => {
      if (this.map) {
        // this.setZoomAndCenter(nextProps);
        // this.setPlugins(nextProps);
        this.refreshMapLayout(prevProps, nextProps);
      }
    });
  }

  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate() {
    this.loadMap();
  }

  loadMap() {
    this.loader.then(() => {
      this.initMapInstance();
      if (!this.state.mapLoaded) {
        this.setState({
          mapLoaded: true
        });
      }
    });
  }

  renderChildren() {
    return Children.map(this.props.children, (child) => {
      if (child) {
        if (ComponentList.indexOf(child.type) === -1) {
          return child;
        }
        return React.cloneElement(child, {
          __map__: this.map,
          __ele__: this.mapWrapper
        });
      }
      return child;
    });
  }

  initMapInstance() {
    if (!this.map) {
      // let opts = {};
      // if ('createOptions' in this.props) {
      //   opts = this.props.createOptions;
      // } else {
      //   if ('zoom' in this.props) {
      //     opts.zoom = this.props.zoom;
      //     this.prevZoom = opts.zoom;
      //   }
      //   if ('center' in this.props) {
      //     opts.center = new window.AMap.LngLat(
      //       this.props.center.longitude,
      //       this.props.center.latitude
      //     );
      //     this.prevCenter = opts.center;
      //   }
      // }
      const options = this.buildCreateOptions();
      this.map = new window.AMap.Map(this.mapWrapper, options);
      const events = this.exposeMapInstance();
      events && this.bindAMapEvents(events);
      this.setPlugins(this.props);

      if ('rotateEnable' in this.props) {
        if (typeof this.props.rotateEnable === 'number') {
          this.map.setRotation(this.props.rotateEnable);
        }
      }
    }
  }

  buildCreateOptions() {
    const props = this.props;
    const options = {};
    allProps.forEach((key) => {
      if (key in props) {
        if (key === 'rotateEnable') {
          if (typeof props.rotateEnable === 'number') {
            options[key] = true;
          } else {
            options[key] = props.rotateEnable;
          }
        } else {
          options[key] = this.getSetterParam(key, props);
        }
      }
    });
    return options;
  }

  bindAMapEvents(events) {
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      this.map.on(evName, events[evName]);
    });
  }

  refreshMapLayout(prevProps, nextProps) {
    configurableProps.forEach((key) => {
      if (key in nextProps) {
        if (this.detectPropChanged(key, prevProps, nextProps)) {
          const setterName = this.getSetterName(key);
          const setterParam = this.getSetterParam(key, nextProps);
          this.map[setterName](setterParam);
        }
      }
    });
  }

  getSetterParam(key, props) {
    if (key === 'center') {
      return getAMapPosition(props.center);
    }
    return props[key];
  }

  getSetterName(key) {
    if (key === 'labelzIndex') {
      return 'setlabelzIndex';
    } else if (key === 'cursor') {
      return 'setDefaultCursor';
    } else if (key === 'rotateEnable') {
      return 'setRotation';
    }
    return `set${toCapitalString(key)}`;
  }

  detectPropChanged(key, prevProps, nextProps) {
    return prevProps[key] !== nextProps[key];
  }

  setZoomAndCenter(props) {
    if ((this.prevCenter === props.center) && (this.prevZoom === props.zoom)) {
      // do nothing
    } else {
      this.prevCenter = props.center;
      this.prevZoom = props.zoom;
      let zoomChange = false;
      let centerChange = false;
      let newCenter;
      if ('zoom' in props) {
        if (props.zoom !== this.map.getZoom()) {
          zoomChange = true;
        }
      }

      if ('center' in props) {
        newCenter = new window.AMap.LngLat(props.center.longitude, props.center.latitude);
        if (props.center !== this.props.center) {
          centerChange = true;
        }
      }
      if (zoomChange) {
        if (centerChange) {
          this.map.setZoomAndCenter(props.zoom, newCenter);
        } else {
          this.map.setZoom(props.zoom);
        }
      } else {
        if (centerChange) {
          this.map.setCenter(newCenter);
        }
      }
    }
  }

  setPlugins(props) {
    const pluginList = ['Scale', 'ToolBar', 'MapType', 'OverView'];
    if ('plugins' in props) {
      const plugins = props.plugins;
      if (plugins && plugins.length) {
        plugins.forEach((p) => {
          let name, config, visible;
          if (typeof p === 'string') {
            name = p;
            config = null;
            visible = true;
          } else {
            name = p.name;
            config = p.options;
            visible = (('visible' in config) && (typeof config.visible === 'boolean')) ? config.visible : true;
            delete config.visible;
          }
          const idx = pluginList.indexOf(name);
          if (idx === -1) {
            log.warning('INVALID_MAP_PLUGIN');
          } else {
            if (visible) {
              pluginList.splice(idx, 1);
              this.installPlugin(name, config);
            }
          }
        });
      }
    }
    this.removeOrDisablePlugins(pluginList);
  }

  removeOrDisablePlugins(plugins) {
    if (plugins && plugins.length) {
      plugins.forEach((p) => {
        if (p in this.pluginMap) {
          this.pluginMap[p].hide();
        }
      });
    }
  }

  installPlugin(name, opts) {
    opts = opts || {};
    switch (name) {
      case 'Scale':
        this.setScalePlugin(opts);
        break;
      case 'ToolBar':
        this.setToolbarPlugin(opts);
        break;
      case 'OverView':
        this.setOverviewPlugin(opts);
        break;
      case 'MapType':
        this.setMapTypePlugin(opts);
        break;
      default:
      // do nothing
    }
  }

  setMapTypePlugin(opts) {
    if (this.pluginMap['MapType']) {
      this.pluginMap.MapType.show();
    } else {
      const { onCreated, ...restOpts } = opts;
      const initOpts = {...defaultOpts.MapType, ...restOpts};
      this.map.plugin(['AMap.MapType'], () => {
        this.pluginMap.MapType = new window.AMap.MapType(initOpts);
        this.map.addControl(this.pluginMap.MapType);
        if (isFun(onCreated)) {
          onCreated(this.pluginMap.MapType);
        }
      });
    }
  }

  setOverviewPlugin(opts) {
    if (this.pluginMap['OverView']) {
      this.pluginMap.OverView.show();
    } else {
      const { onCreated, ...restOpts } = opts;
      const initOpts = {...defaultOpts.OverView, ...restOpts};
      this.map.plugin(['AMap.OverView'], () => {
        this.pluginMap.OverView = new window.AMap.OverView(initOpts);
        this.map.addControl(this.pluginMap.OverView);
        if (isFun(onCreated)) {
          onCreated(this.pluginMap.OverView);
        }
      });
    }
  }

  setScalePlugin(opts) {
    if (this.pluginMap['Scale']) {
      this.pluginMap.Scale.show();
    } else {
      this.map.plugin(['AMap.Scale'], () => {
        this.pluginMap.Scale = new window.AMap.Scale();
        this.map.addControl(this.pluginMap.Scale);
        if (isFun(opts.onCreated)) {
          opts.onCreated(this.pluginMap.Scale);
        }
      });
    }
  }

  setToolbarPlugin(opts) {
    if (this.pluginMap['ToolBar']) {
      this.pluginMap.ToolBar.show();
    } else {
      const { onCreated, ...restOpts } = opts;
      const initOpts = {...defaultOpts.ToolBar, ...restOpts};
      this.map.plugin(['AMap.ToolBar'], () => {
        this.pluginMap.ToolBar = new window.AMap.ToolBar(initOpts);
        this.map.addControl(this.pluginMap.ToolBar);
        if (isFun(onCreated)) {
          onCreated(this.pluginMap.ToolBar);
        }
      });
    }
  }

  // 用户可以通过 onCreated 事件获取 map 实例
  exposeMapInstance() {
    if ('events' in this.props) {
      const events = this.props.events || {};
      if (isFun(events.created)) {
        events.created(this.map);
        delete events.created;
      }
      return events;
    }
    return false;
  }

  render() {
    return (<div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={(div)=>{this.mapWrapper = div; }} style={{ width: '100%', height: '100%' }}>
        <div style={{ background: '#eee', width: '100%', height: '100%' }}></div>
      </div>
      <div>
        { this.state.mapLoaded ? this.renderChildren() : null }
      </div>
    </div>);
  }
}

// Map.Marker = Marker;
// Map.Markers = Markers;
// Map.Polygon = Polygon;
// Map.Polyline = Polyline;
// Map.InfoWindow = InfoWindow;
// Map.Circle = Circle;
// Map.GroundImage = GroundImage;
// Map.CircleEditor = CircleEditor;
// Map.PolyEditor = PolyEditor;

export default Map;
