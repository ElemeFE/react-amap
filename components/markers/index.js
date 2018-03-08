// @flow
import React from 'react';
import { render } from 'react-dom';
import isFun from '../utils/isFun';
import log from '../utils/log';
import {
  MarkerAllProps,
  getPropValue,
  renderMarkerComponent
} from '../utils/markerUtils';

if (typeof window !== 'undefined') {
  const styleText = `.amap_markers_pop_window{
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.amap_markers_pop_window::before{
    content: ' ';
    display: block;
    position: absolute;
    bottom: -12px;
    left: 50%;
    margin-left: -7px;
    width: 0;
    height: 0;
    border-top: 12px solid #ddd;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
}
.amap_markers_pop_window::after{
    content: ' ';
    display: block;
    position: absolute;
    bottom: -11px;
    left: 50%;
    margin-left: -6px;
    width: 0;
    height: 0;
    border-top: 11px solid #fff;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
}
.amap_markers_pop_window_item{
    cursor:pointer;
    width: 40px;
    height: 50px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}
.amap_markers_pop_window_item span{
    pointer-events: none;
}
.amap_markers_window_overflow_warning{
    text-align: center;
    width: 100%;
    margin: 5px 0;
    color: #666;
}`;
  const headEl = document.head || document.getElementsByTagName('head')[0];
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.textContent = styleText;
  headEl.appendChild(styleEl);
}

const Component = React.Component;

const SCALE = 0.8;
const SIZE_WIDTH = 32 * SCALE;
const SIZE_HEIGHT = 46 * SCALE - 2;
const SIZE_HOVER_WIDTH = 46 * SCALE;
const SIZE_HOVER_HEIGHT = 66 * SCALE - 2;
const MAX_INFO_MARKERS = 42;

const defaultOpts = {
  useCluster: false,
  markersCache: [],
  markerIDCache: []
};

const ClusterProps = [
  'gridSize',
  'minClusterSize',
  'maxZoom',
  'averageCenter',
  'styles',
  'zoomOnClick',
  'renderCluserMarker'
];

const IdKey = '__react_amap__';

type MarkerDOM = HTMLDivElement & { markerRef: Object };
/*
 * props
 * {
 *  useCluster(boolean)是否使用聚合点
 *  markers(array<>)坐标列表
 *  __map__ 父级组件传过来的地图实例
 *  __ele__ 父级组件传过来的地图容器
 * }
 */

class Markers extends Component<MarkerProps, {}> {

  map: Object;
  element: HTMLDivElement & {markerRef: Object};
  markersCache: Array<Object>;
  markerIDCache: Array<number>;
  useCluster: ?boolean;
  resetOffset: Object;
  hoverOffset: Object;
  markersWindow: Object;
  mapCluster: Object;
  markersDOM: MarkerDOM;
  markerReactChildDOM: any;

  constructor(props: MarkerProps) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        log.warning('MAP_INSTANCE_REQUIRED');
      } else {
        this.map = props.__map__;
        this.element = this.map.getContainer();
        this.markersCache = defaultOpts.markersCache;
        this.useCluster = null;
        this.markerIDCache = defaultOpts.markerIDCache;
        this.resetOffset = new window.AMap.Pixel(-SIZE_WIDTH / 2, -SIZE_HEIGHT);
        this.hoverOffset = new window.AMap.Pixel(-SIZE_HOVER_WIDTH / 2, -SIZE_HOVER_HEIGHT);
        this.createMarkers(props);
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  createMarkers(props: MarkerProps) {
    const markers = props.markers || [];

    const mapMarkers = [];
    const markerReactChildDOM = {};
    markers.length && markers.forEach((raw, idx) => {
      const options = this.buildCreateOptions(props, raw, idx);
      options.map = this.map;

      let markerContent = null;
      if (isFun(props.render)) {
        // $FlowFixMe
        let markerChild = props.render(raw);
        if (markerChild !== false) {
          const div = document.createElement('div');
          div.setAttribute(IdKey, '1');
          markerContent = div;
          markerReactChildDOM[idx] = markerChild;
        }
      }

      if (!markerContent) {
        markerContent = document.createElement('div');
        const img = document.createElement('img');
        img.src = '//webapi.amap.com/theme/v1.3/markers/n/mark_bs.png';
        markerContent.appendChild(img);
      }
      options.content = markerContent;

      const marker = new window.AMap.Marker(options);
      marker.on('click', (e) => { this.onMarkerClick(e); });
      marker.on('mouseover', (e) => { this.onMarkerHover(e); });
      marker.on('mouseout', (e) => { this.onMarkerHoverOut(e); });

      marker.render = (function(marker) {
        return function(component) {
          return renderMarkerComponent(component, marker);
        };
      }(marker));

      this.bindMarkerEvents(marker);
      mapMarkers.push(marker);
    });
    this.markersCache = mapMarkers;
    this.markerReactChildDOM = markerReactChildDOM;
    this.exposeMarkerInstance();

    this.checkClusterSettings(props);
  }

  checkClusterSettings(props: MarkerProps) {
    if (props.useCluster) {
      this.loadClusterPlugin(props.useCluster).then((cluster) => {
        cluster.setMarkers(this.markersCache);
      });
    } else {
      if (this.mapCluster) {
        const markers = this.mapCluster.getMarkers();
        this.mapCluster.clearMarkers();
        markers.forEach((marker) => {
          marker.setMap(this.map);
        });
      }
    }
  }

  componentDidMount() {
    if (this.map) {
      this.setMarkerChild();
    }
  }

  setMarkerChild() {
    Object.keys(this.markerReactChildDOM).forEach((idx) => {
      const dom = this.markersCache[idx].getContent();
      const child = this.markerReactChildDOM[idx];
      this.renderMarkerChild(dom, child);
    });
  }

  renderMarkerChild(dom: HTMLElement, child: any) {
    render(<div>{child}</div>, dom);
  }

  buildCreateOptions(props: MarkerProps, raw: any, idx: number) {
    const result = {};
    // 强制用户通过 render 函数来定义外观
    // const disabledKeys = ['label', 'icon', 'content'];
    // 还是不强制好，通过覆盖的方式来(如果有 render，覆盖 content/icon);
    const disabledKeys = ['extData'];
    MarkerAllProps.forEach((key) => {
      if ((key in raw) && (disabledKeys.indexOf(key) === -1)) {
        result[key] = getPropValue(key, raw[key]);
      } else if (key in props) {
        if (isFun(props[key])) {
          const tmpValue = props[key].call(null, raw, idx);
          result[key] = getPropValue(key, tmpValue);
        } else {
          result[key] = getPropValue(key, props[key]);
        }
      }
    });
    result.extData = raw;
    return result;
  }

  componentWillReceiveProps(nextProps: MarkerProps) {
    if (this.map) {
      this.refreshMarkersLayout(nextProps);
    }
  }

  refreshMarkersLayout(nextProps: MarkerProps) {
    const markerChanged = (nextProps.markers !== this.props.markers);
    const clusterChanged = ((!!this.props.useCluster) !== (!!nextProps.useCluster));
    if (markerChanged) {
      this.markersCache.length && this.markersCache.forEach((marker) => {
        if (marker) {
          marker.setMap(null);
          marker = null;
        }
      });
      this.markersCache = defaultOpts.markersCache;
      this.createMarkers(nextProps);
      this.setMarkerChild();
    }
    if (markerChanged || (clusterChanged)) {
      if (this.markersWindow) {
        this.markersWindow.close();
      }
    }
    if (clusterChanged) {
      this.checkClusterSettings(nextProps);
    }
  }

  loadClusterPlugin(clusterConfig: Object | boolean): Promise<Object> {
    if (this.mapCluster) {
      return Promise.resolve(this.mapCluster);
    }
    const config = (typeof clusterConfig === 'boolean') ? {} : clusterConfig;
    return new Promise((resolve) => {
      this.map.plugin(['AMap.MarkerClusterer'], () => {
        resolve(this.createClusterPlugin(config));
      });
    });
  }

  createClusterPlugin(config: Object) {
    let options = {};
    // const style = {
    //   url: clusterIcon,
    //   size: new window.AMap.Size(56, 56),
    //   offset: new window.AMap.Pixel(-28, -28)
    // };
    const defalutOptions: Object = {
      minClusterSize: 2,
      zoomOnClick: false,
      maxZoom: 18,
      gridSize: 60,
      // styles: [style, style, style],
      averageCenter: true
    };

    ClusterProps.forEach((key) => {
      if (key in config) {
        options[key] = config[key];
      } else {
        options[key] = defalutOptions[key];
      }
    });

    this.mapCluster = new window.AMap.MarkerClusterer(this.map, [], options);
    let events = {};
    if ('events' in config) {
      events = config.events;
      if ('created' in events) {
        events.created(this.mapCluster);
      }
    }
    this.initClusterMarkerWindow();
    this.bindClusterEvent(events);
    return this.mapCluster;
  }

  onMarkerClick(e: MapEvent) {
    const marker = e.target;
    this.triggerMarkerClick(e, marker);
  }

  onMarkerHover(e: MapEvent) {
    e.target.setTop(true);
    this.setMarkerHovered(e, e.target);
  }

  onMarkerHoverOut(e: MapEvent) {
    e.target.setTop(false);
    this.setMarkerHoverOut(e, e.target);
  }

  onWindowMarkerClick(element: MarkerDOM) {
    const marker = element.markerRef;
    this.triggerMarkerClick(null, marker);
  }

  onWindowMarkerHover(element: MarkerDOM) {
    const marker = element.markerRef;
    this.setMarkerHovered(null, marker);
  }

  onWindowMarkerHoverOut(element: MarkerDOM) {
    const marker = element.markerRef;
    this.setMarkerHoverOut(null, marker);
  }

  setMarkerHovered(e: MapEvent | null, marker: Object) {
    this.triggerMarkerHover(e, marker);
  }

  setMarkerHoverOut(e: MapEvent | null, marker: Object) {
    this.triggerMarkerHoverOut(e, marker);
  }

  triggerMarkerClick(e: MapEvent | null, marker: Object) {
    // const raw = marker.getExtData();
    const events = this.props.events || {};
    if (isFun(events.click)) {
      events.click(e, marker);
    }
  }

  triggerMarkerHover(e: MapEvent | null, marker: Object) {
    // const raw = marker.getExtData();
    const events = this.props.events || {};
    if (isFun(events.mouseover)) {
      events.mouseover(e, marker);
    }
  }

  triggerMarkerHoverOut(e: MapEvent | null, marker: Object) {
    // const raw = marker.getExtData();
    const events = this.props.events || {};
    if (isFun(events.mouseout)) {
      events.mouseout(e, marker);
    }
  }

  initClusterMarkerWindow() {
    this.markersWindow = new window.AMap.InfoWindow({
      isCustom: true,
      autoMove: true,
      closeWhenClickMap: true,
      content: '<span>loading...</span>',
      showShadow: false,
      offset: new window.AMap.Pixel(0, -20)
    });
    this.markersDOM = document.createElement('div');
    this.markersDOM.className = 'amap_markers_pop_window';
    this.markersWindow.setContent(this.markersDOM);
  }

  bindClusterEvent(events: Object) {
    this.mapCluster.on('click', (e) => {
      if (this.props.useCluster && this.props.useCluster.zoomOnClick) {
        //
      } else {
        let returnValue = true;
        if (isFun(events.click)) {
          returnValue = events.click(e);
        }
        if (returnValue !== false) {
          this.showMarkersInfoWindow(e);
        }
      }
    });
  }

  showMarkersInfoWindow(e: MapEvent) {
    const pos = e.lnglat;
    let markers = e.markers;
    this.markersDOM.innerHTML = '';
    if (markers && markers.length) {
      const length = markers.length;
      if (length > MAX_INFO_MARKERS) {
        markers = markers.slice(0, MAX_INFO_MARKERS);
      }
      markers.forEach((m) => {
        const contentDOM = m.getContent();
        const itemDOM: MarkerDOM = document.createElement('div');
        itemDOM.className = 'window_marker_item';
        itemDOM.appendChild(contentDOM);
        itemDOM.markerRef = m;
        itemDOM.addEventListener('click', this.onWindowMarkerClick.bind(this, itemDOM), true);
        itemDOM.addEventListener('mouseover', this.onWindowMarkerHover.bind(this, itemDOM), true);
        itemDOM.addEventListener('mouseout', this.onWindowMarkerHoverOut.bind(this, itemDOM), true);

        this.markersDOM.appendChild(itemDOM);

      });
      if (length > MAX_INFO_MARKERS) {
        const warning = document.createElement('div');
        warning.className = 'amap_markers_window_overflow_warning';
        warning.innerText = '更多坐标请放大地图查看';
        this.markersDOM.appendChild(warning);
      }
    }
    this.markersWindow.open(this.map, pos);
  }

  exposeMarkerInstance() {
    if ('events' in this.props) {
      const events = this.props.events || {};
      if (isFun(events.created)) {
        events.created(this.markersCache);
      }
    }
  }

  bindMarkerEvents(marker: Object) {
    const events = this.props.events || {};
    const list = Object.keys(events);
    const preserveEv = ['click', 'mouseover', 'mouseout', 'created'];
    list.length && list.forEach((evName) => {
      if (preserveEv.indexOf(evName) === -1) {
        marker.on(evName, events[evName]);
      }
    });
  }

  render() {
    return (null);
  }
}

export default Markers;
