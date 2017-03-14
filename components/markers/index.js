import React from 'react';
import { render } from 'react-dom';
import isFun from '../../lib/utils/isFun';
import log from '../../lib/utils/log';
import clusterIcon from '../../lib/assets/map_cluster.png';
import waitIcon from '../../lib/assets/map_wait.png';
import waitHoverIcon from '../../lib/assets/map_wait_emphsis.png';
import selectedIcon from '../../lib/assets/map_selected.png';
import selectedHoverIcon from '../../lib/assets/map_selected_emphsis.png';

import {
  MarkerConfigurableProps,
  MarkerAllProps,
  getPropValue,
} from '../../lib/utils/markerUtils';


// import css from './assets/marker.css';

require('../../lib/assets/marker.css');

const Component = React.Component;

const SCALE = 0.8;
const SIZE_WIDTH = 32 * SCALE;
const SIZE_HEIGHT = 46 * SCALE - 2;
const SIZE_HOVER_WIDTH = 46 * SCALE;
const SIZE_HOVER_HEIGHT = 66 * SCALE - 2;
const MAX_INFO_MARKERS = 42;
// 每次刷新地图上的坐标点时，根据坐标点数量的不同采取不同的刷新策略
// 其中一个策略比较耗性能，但是交互效果更好，所以设置极限值
const REFRESH_LIMIT = 10000;

const defaultOpts = {
  useCluster: true,
  markersCache: [],
  markerIDCache: [],
};

const IdKey = '__react_amap__';

/*
 * props
 * {
 *  useCluster(boolean)是否使用聚合点
 *  markers(array<>)坐标列表
 *  __map__ 父级组件传过来的地图实例
 *  __ele__ 父级组件传过来的地图容器
 *
 * }
 */

class Markers extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      log.warning('MAP_INSTANCE_REQUIRED');
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.markersCache = defaultOpts.markersCache;
      this.useCluster = null;
      this.markerIDCache = defaultOpts.markerIDCache;
      this.resetOffset = new window.AMap.Pixel(- SIZE_WIDTH / 2, - SIZE_HEIGHT);
      this.hoverOffset = new window.AMap.Pixel(- SIZE_HOVER_WIDTH / 2, - SIZE_HOVER_HEIGHT);
      
      // this.handleCluster(props);
      // this.buildMapMarkers(props.markers);
      // this.renderMarkers();
      
      this.createMarkers(props);
    }
  }
  
  shouldComponentUpdate(){
    return false;
  }
  
  createMarkers(props) {
    const markers = props.markers || [];
    let renderFn;
    if (isFun(props.render)) {
      renderFn = props.render;
    }
    const mapMarkers = [];
    const markerReactChildDOM = {};
    markers.length && markers.forEach((raw, idx) => {
      const options = this.buildCreateOptions(props, raw, idx);
      options.map = this.map;
      
      let markerContent = null;
      if (isFun(props.render)) {
        let markerChild = props.render.call(null, raw, idx);
        if (markerChild !== false) {
          const div = document.createElement('div');
          div.setAttribute(IdKey, '1');
          markerContent = div;
          markerReactChildDOM[idx] = markerChild;
        }
      }
      
      if (!markerContent){
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
  
      this.bindMarkerEvents(marker);
      mapMarkers.push(marker);
    });
    this.markersCache = mapMarkers;
    this.markerReactChildDOM = markerReactChildDOM;
    this.exposeMarkerInstance();
  
    if (props.useCluster === true) {
      this.createCluster();
    }
  }
  
  createCluster(){
    if (!this.mapCluster) {
      const style = {
        url: clusterIcon,
        size: new window.AMap.Size(56, 56),
        offset: new window.AMap.Pixel(-28, -28),
      };
      const clusterStyles = [style, style, style];
      this.mapCluster = new window.AMap.MarkerClusterer(this.map, this.markersCache, {
        minClusterSize: 2,
        zoomOnClick: false,
        gridSize: 60,
        styles: clusterStyles,
        averageCenter: true,
      });
      this.initClusterMarkerWindow();
      this.bindClusterEvent();
    }
  }
  
  componentDidMount() {
    this.setMarkerChild(this.props);
  }
  
  setMarkerChild(props){
    Object.keys(this.markerReactChildDOM).forEach((idx) => {
      const dom = this.markersCache[idx].getContent();
      const child = this.markerReactChildDOM[idx];
      this.renderMarkerChild(dom, child);
    })
  }
  
  renderMarkerChild(dom, child){
    render(<div>{child}</div>, dom);
  }
  
  buildCreateOptions(props, raw, idx){
    const result = {};
    // 强制用户通过 render 函数来定义外观
    // const disabledKeys = ['label', 'icon', 'content'];
    // 还是不强制好，通过覆盖的方式来(如果有 render，覆盖 content/icon);
    const disabledKeys = [];
    MarkerAllProps.forEach((key) => {
      if ((key in raw) && (disabledKeys.indexOf(key) === -1)) {
        result[key] = getPropValue(key, raw[key]);
      } else if(key in props) {
        if (isFun(props[key])) {
          const tmpValue = props[key].call(null, raw, idx);
          result[key] = getPropValue(key, tmpValue);
        } else {
          if (key === 'extData') {
            result.extData = raw;
          } else {
            result[key] = getPropValue(key, props[key]);
          }
        }
      }
    });
    return result;
  }
  
  componentWillReceiveProps(nextProps) {
    // if (this.map) {
    //   let markerChanged = false;
    //   const clusterSettingChanged = this.handleCluster(nextProps);
    //   if (nextProps.markers !== this.props.markers) {
    //     this.buildMapMarkers(nextProps.markers);
    //     markerChanged = true;
    //   }
    //   if (clusterSettingChanged || markerChanged) {
    //     this.renderMarkers();
    //   }
    // }
  }
  
  handleCluster(props) {
    let clusterSettingChanged = false;
    let useCluster;
    if ('useCluster' in props && (typeof props.useCluster === 'boolean')) {
      useCluster = props.useCluster;
    } else {
      useCluster = defaultOpts.useCluster;
    }
    if (useCluster !== this.useCluster) {
      this.useCluster = useCluster;
      this.initMapCluster();
      clusterSettingChanged = true;
    }
    return clusterSettingChanged;
  }
  
  onMarkerClick(e) {
    const marker = e.target;
    this.triggerMarkerClick(e, marker);
  }
  
  onMarkerHover(e) {
    e.target.setTop(true);
    this.setMarkerHovered(e, e.target);
  }
  
  onMarkerHoverOut(e) {
    e.target.setTop(false);
    this.setMarkerHoverOut(e, e.target);
  }
  
  onWindowMarkerClick(element) {
    const marker = element.markerRef;
    this.triggerMarkerClick(null, marker);
  }
  
  onWindowMarkerHover(element) {
    const marker = element.markerRef;
    this.setMarkerHovered(null, marker);
  }
  
  onWindowMarkerHoverOut(element) {
    const marker = element.markerRef;
    this.setMarkerHoverOut(null, marker);
  }
  
  setMarkerHovered(e, marker) {
    this.triggerMarkerHover(e, marker);
  }
  
  setMarkerHoverOut(e, marker) {
    this.triggerMarkerHoverOut(e, marker);
  }
  
  setMarkerIcon(marker) {
    const extData = marker.getExtData() || {};
    const label = ('label' in extData) ? extData.label : '';
    const isSelected = extData.isSelected;
    const isHover = extData.isHover;
    const html = this.generateMarkerContent(isSelected, isHover, label);
    marker.setContent(html);
    if (isHover) {
      marker.setOffset(this.hoverOffset);
    } else {
      marker.setOffset(this.resetOffset);
    }
  }
  
  triggerMarkerClick(e, marker) {
    const raw = marker.getExtData();
    const events = this.props.events || {};
    if (isFun(events.click)) {
      events.click(e, raw);
    }
  }
  
  triggerMarkerHover(e, marker) {
    const raw = marker.getMarkerData();
    const events = this.props.events || {};
    if (isFun(events.mouseover)) {
      events.mouseover(e, raw);
    }
  }
  
  triggerMarkerHoverOut(e, marker) {
    const raw = marker.getMarkerData();
    const events = this.props.events || {};
    if (isFun(events.mouseout)) {
      events.mouseout(e, raw);
    }
  }
  
  initMapCluster() {
    if (this.useCluster) {
      if (!this.mapCluster) {
        const style = {
          url: clusterIcon,
          size: new window.AMap.Size(56, 56),
          offset: new window.AMap.Pixel(-28, -28),
        };
        const clusterStyles = [style, style, style];
        this.mapCluster = new window.AMap.MarkerClusterer(this.map, [], {
          minClusterSize: 2,
          zoomOnClick: false,
          gridSize: 60,
          styles: clusterStyles,
          averageCenter: true,
        });
        this.initClusterMarkerWindow();
        this.bindClusterEvent();
      }
    } else {
      if (this.mapCluster) {
        this.mapCluster.setMarkers([]);
      }
    }
  }
  
  initClusterMarkerWindow() {
    this.markersWindow = new window.AMap.InfoWindow({
      isCustom: true,
      autoMove: true,
      closeWhenClickMap: true,
      content: '<span>loading...</span>',
      showShadow: false,
      offset: new window.AMap.Pixel(0, -20),
    });
    this.markersDOM = document.createElement('div');
    this.markersDOM.className = 'amap_markers_pop_window';
    this.markersWindow.setContent(this.markersDOM);
  }
  
  bindClusterEvent() {
    this.mapCluster.on('click', (e) => {
      this.showMarkersInfoWindow(e);
    });
  }
  
  
  showMarkersInfoWindow(e) {
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
        const itemDOM = document.createElement('div');
        itemDOM.className = 'window_marker_item';
        itemDOM.appendChild(contentDOM);
        itemDOM.markerRef = m;
  
        itemDOM.addEventListener('click', this.onWindowMarkerClick.bind(this, itemDOM), true);
        itemDOM.addEventListener('mouseover', this.onWindowMarkerHover.bind(this, itemDOM), true);
        itemDOM.addEventListener('mouseout', this.onWindowMarkerHoverOut.bind(this, itemDOM), true);
        
        this.markersDOM.appendChild(itemDOM);
  
   
        // const id = this.getMarkerData(m, 'id');
        // const pointIndex = this.getMarkerData(m, 'pointIndex');
        // const label = this.getMarkerData(m, 'label');
        // const tmp = this.generateMarkerContent(
        //   this.getMarkerData(m, 'isSelected'),
        //   this.getMarkerData(m, 'isHover'),
        //   label
        // );
        //
        // const tmpSpan = document.createElement('span');
        // tmpSpan.className = `amap_markers_pop_window_item map_marker_in_window_${id}`;
        // tmpSpan.setAttribute('markerId', id);
        // tmpSpan.setAttribute('pointIndex', pointIndex);
        // tmpSpan.innerHTML = tmp;
        //

        // this.markersDOM.appendChild(tmpSpan);
        console.log(m.getContent());
      });
      // if (length > MAX_INFO_MARKERS) {
      //   const warning = document.createElement('div');
      //   warning.className = 'amap_markers_window_overflow_warning';
      //   warning.innerText = '更多坐标请放大地图查看';
      //   this.markersDOM.appendChild(warning);
      // }
    }
    this.markersWindow.open(this.map, pos);
  }
  
  buildMapMarkers(rawMarkerData) {
    this.clearPrevMarkers();
    this.markersCache = [];
    this.markerIDCache = [];
    if (rawMarkerData && rawMarkerData.length) {
      rawMarkerData.forEach((m, idx) => {
        const label = ('label' in m) ? m.label : '';
        let id;
        if ('id' in m) {
          id = m.id;
          if (this.markerIDCache.indexOf(id) !== -1) {
            log.warning('MARKER_ID_CONFLICT');
          } else {
            this.markerIDCache.push(id);
          }
        } else {
          log.warning('MARKER_ID_REQUIRED');
        }
        const marker = new window.AMap.Marker({
          position: [m.position.longitude, m.position.latitude],
          visible: true,
          draggable: false,
          offset: this.resetOffset,
          content: this.generateMarkerContent(!!m.isSelected, false, label),
          extData: {
            id,
            raw: m,
            label,
            isSelected: !!m.isSelected,
            isHover: false,
            pointIndex: idx,
          },
        });
        marker.on('click', (e) => { this.onMarkerClick(e); });
        marker.on('mouseover', (e) => { this.onMarkerHover(e); });
        marker.on('mouseout', (e) => { this.onMarkerHoverOut(e); });
        
        this.bindMarkerEvents(marker);
        this.markersCache.push(marker);
      });
    }
    this.exposeMarkerInstance();
  }
  
  exposeMarkerInstance() {
    if ('events' in this.props) {
      const events = this.props.events || {};
      if (isFun(events.created)) {
        events.created(this.markersCache);
      }
    }
  }
  
  bindMarkerEvents(marker) {
    const events = this.props.events || {};
    const list = Object.keys(events);
    const preserveEv = ['click', 'mouseover', 'mouseout', 'created'];
    list.length && list.forEach((evName) => {
      if (preserveEv.indexOf(evName) === -1) {
        marker.on(evName, events[evName]);
      }
    });
  }
  
  clearPrevMarkers() {
    this.markersCache.forEach(m => {
      m.setMap(null);
    });
    // TODO(slh) 要确认这个清除的范围
    if (this.useCluster && this.mapCluster){
      this.mapCluster.clearMarkers();
    }
  }
  
  generateMarkerContent(isSelected, isHover, content) {
    let img;
    let sizeWidth;
    let sizeHeight;
    if (isHover) {
      sizeWidth = SIZE_HOVER_WIDTH;
      sizeHeight = SIZE_HOVER_HEIGHT;
      if (isSelected) {
        img = selectedHoverIcon;
      } else {
        img = waitHoverIcon;
      }
    } else {
      sizeWidth = SIZE_WIDTH;
      sizeHeight = SIZE_HEIGHT;
      if (isSelected) {
        img = selectedIcon;
      } else {
        img = waitIcon;
      }
    }
    const styleString = [
      'display:inline-block',
      `width:${sizeWidth}px`,
      `height:${sizeHeight}px`,
      'text-align:center',
      'font-size:12px',
      'background-size:100%',
      `line-height:${sizeHeight * 0.6}px`,
      'color:#fff',
      `background-image:url(${img})`,
      'background-repeat: no-repeat',
      'background-size: contain',
      'user-select: none',
      'text-shadow: 1px 1px 2px #000',
      'pointer-events: none',
    ];
    const iconHtml = `<span style="${styleString.join(';')}">${content}</span>`;
    return iconHtml;
  }
  
  
  renderMarkers() {
    if (this.useCluster) {
      if (this.markersCache.length < REFRESH_LIMIT) {
        this.markersCache.forEach(m => m.setMap(this.map));
        this.map.setFitView();
        this.markersCache.forEach(m => m.setMap(null));
      }
      this.mapCluster.setMarkers(this.markersCache);
    } else {
      this.markersCache.forEach(m => m.setMap(this.map));
      this.map.setFitView();
    }
  }
  
  render() {
    return (null);
  }
}

export default Markers;
