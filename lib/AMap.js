import React, { PropTypes, Component, Children } from 'react';
import { render } from 'react-dom';
import APILoader from './utils/APILoader';
import isFun from './utils/isFun';
import bindEvent from './utils/bindEvent';
import Markers from './Markers';
import Polygon from './Polygon';
import Polyline from './Polyline';
import InfoWindow from './InfoWindow';
import Circle from './Circle';
/*
 * props
 * {
 *  onInit(func),
 *  center,
 *  zoom
 * }
 */

const defaultOpts = {
  maptype: {
    showRoad: false,
    showTraffic: false,
    defaultType: 0,
  },
  toolbar: {
    position: 'RB',
    noIpLocate: true,
    locate: true,
    liteStyle: true,
    autoPosition: false,
  },
  overview: {},
};

class AMap extends Component {
  constructor() {
    super();
    this.state = {
      mapLoaded: false,
    };
    this.pluginMap = {};
    this.prevCenter = undefined;
    this.prevZoom = undefined;
    this.loader = new APILoader().load();
  }
  
  componentWillReceiveProps(nextProps) {
    this.loader.then(() => {
      if (this.map) {
        this.setZoomAndCenter(nextProps);
        this.setPlugins(nextProps);
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
          mapLoaded: true,
        });
      }
    });
  }
  
  renderChildren() {
    return Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        __map__: this.map,
        __ele__: this.mapWrapper,
      })
    });
  }
  
  initMapInstance() {
    if (!this.map) {
      const opts = {
        showIndoorMap: false
      };
      if ('zoom' in this.props) {
        opts.zoom = this.props.zoom;
        this.prevZoom = opts.zoom;
      }
      if ('center' in this.props) {
        opts.center = new window.AMap.LngLat(
          this.props.center.longitude,
          this.props.center.latitude
        );
        this.prevCenter = opts.center;
      }
      this.map = new window.AMap.Map(this.mapWrapper, opts);
      
      const eventList = [
        'Complete',
        'Click',
        'DblClick',
        'MapMove',
        'MoveStart',
        'MoveEnd',
        'ZoomChange',
        'ZoomStart',
        'ZoomEnd'
      ];
      bindEvent(this.map, eventList, this);
      this.liftMapInstance();
      this.setPlugins(this.props);
    }
  }
  
  setZoomAndCenter(props) {
    if ((this.prevCenter === props.center) && (this.prevZoom === props.zoom)) {
      // do nothing
    } else {
      this.prevCenter = props.center;
      this.prevZoom = props.zoom;
      let zoomChange = false,
        centerChange = false,
        newCenter;
      if ('zoom' in props) {
        if (props.zoom !== this.map.getZoom()) {
          zoomChange = true;
        }
      }
  
      if ('center' in props) {
        newCenter = new window.AMap.LngLat(props.center.longitude, props.center.latitude);
        if (!newCenter.equals(this.map.getCenter())) {
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
    const pluginList = ['scale', 'toolbar', 'maptype', 'overview'];
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
            visible = !!p.visible;
          }
          const idx = pluginList.indexOf(name);
          if (idx === -1) {
            // error('INVALID_AMAP_PLUGIN');
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
      })
    }
  }
  
  //
  installPlugin(name, opts) {
    switch(name) {
      case 'scale':
        this.setScalePlugin(opts);
        break;
      case 'toolbar':
        this.setToolbarPlugin(opts);
        break;
      case 'overview':
        this.setOverviewPlugin(opts);
        break;
      case 'maptype':
        this.setMapTypePlugin(opts);
        break;
      default:
        // do nothing
    }
  }
  
  setMapTypePlugin(opts) {
    if (this.pluginMap['maptype']) {
      this.pluginMap.maptype.show();
    } else {
      const initOpts = opts || defaultOpts.maptype;
      this.map.plugin(['AMap.MapType'], () => {
        this.pluginMap.maptype = new window.AMap.MapType(initOpts);
        this.map.addControl(this.pluginMap.maptype);
      });
    }
  }
  
  setOverviewPlugin(opts) {
    if (this.pluginMap['overview']) {
      this.pluginMap.overview.show();
    } else {
      const initOpts = opts || defaultOpts.overview;
      this.map.plugin(['AMap.OverView'], () => {
        this.pluginMap.overview = new window.AMap.OverView(initOpts);
        this.map.addControl(this.pluginMap.overview);
      });
    }
  }
  
  setScalePlugin() {
    if (this.pluginMap['scale']) {
      this.pluginMap.scale.show();
    } else {
      this.map.plugin(['AMap.Scale'], () => {
        this.pluginMap.scale = new window.AMap.Scale();
        this.map.addControl(this.pluginMap.scale);
      });
    }
  }
  
  setToolbarPlugin(opts) {
    if (this.pluginMap['toolbar']) {
      this.pluginMap.toolbar.show();
    } else {
      const initOpts = opts || defaultOpts.toolbar;
      this.map.plugin(['AMap.ToolBar'], () => {
        this.pluginMap.toolbar = new window.AMap.ToolBar(initOpts);
        this.map.addControl(this.pluginMap.toolbar);
      });
    }
  }
  
  // 用户可以通过 onInit 事件获取 map 实例
  liftMapInstance() {
    if (isFun(this.props.onInit)) {
      this.props.onInit(this.map);
    }
  }
  
  render() {
    return (<div style={{ width: '100%', height: '100%' }}>
      <div ref={(div)=>{this.mapWrapper = div }} style={{ width: '100%', height: '100%' }}>
        <div style={{ background: '#eee', width: '100%', height: '100%' }}></div>
      </div>
      <div ref={(div) => {this.innerBridge = div;}} style={{ width: '100%', height: '100%' }}>
        { this.state.mapLoaded ? this.renderChildren() : null }
      </div>
    </div>);
  }
}

AMap.Markers = Markers;
AMap.Polygon = Polygon;
AMap.Polyline = Polyline;
AMap.InfoWindow = InfoWindow;
AMap.Circle = Circle;

export default AMap;
