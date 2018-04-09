/* eslint-disable */
import React from 'react';

declare type AMapLngLat = {
  getLng: Function,
  getLat: Function,
};

declare type PureLngLat = {
  longitude: number,
  latitude: number,
};

declare type LngLat = PureLngLat & AMapLngLat;

declare type AMapSize = {
  getWidth: Function,
  getHeight: Function,
};

declare type PureSize = {
  width: number,
  height: number,
};

declare type Size = AMapSize & PureSize;

declare type AMapPixel = {
  getX: Function,
  getY: Function,
};

declare type PurePixel = [number, number];

declare type Pixel = AMapPixel & PurePixel;

declare type MarkerContent = string | HTMLElement;

declare type PolylinePath = Array<PureLngLat> & Array<AMapLngLat>;

declare type PolygonPath = PolylinePath | Array<PolylinePath>;

declare type EventMap = {[evName: string]: Function};

declare type MapLang = 'zh_cn' | 'zh_en' | 'en';

declare type MapFeature = 'bg' | 'point' | 'road' | 'building';

declare type MapProps = {
  protocol?: string,
  amapkey?: string,
  version?: string,
  useAMapUI?: boolean | Function,
  onInstanceCreated?: Function,
  children: React.Node,
  events?: EventMap,
  plugins?: Object,
  loading: React.Node,
  center?: LngLat,
  zoom?: number,
  zooms?: [number, number],
  animateEnable?: boolean,
  doubleClickZoom?: boolean,
  dragEnable?: boolean,
  isHotspot?: boolean,
  jogEnable?: boolean,
  keyboardEnable?: boolean,
  resizeEnable?: boolean,
  rotateEnable?: boolean,
  scrollWheel?: boolean,
  touchZoom?: boolean,
  zoomEnable?: boolean,
  showIndoorMap?: boolean,
  expandZoomRange?: boolean,
  viewMode?: '2D' | '3D',
  features?: Array<MapFeature>,
  pitch?: number,
  mapStyle?: string,
  labelzIndex?: number,
  skyColor?: string,
  buildingAnimation?: boolean,
  pitchEnable?: boolean,
  showBuildingBlock?: boolean,
  indoorMap?: any,
  cursor?: string,
  layers?: Array<any>,
  view?: any,
  city?: string,
  bounds?: any,
  limitBounds?: any,
  status?: any,
  rotation?: number
  // lang?: MapLang,
}

declare type MarkerProps = {
  position?: LngLat,
  offset?: Pixel,
  onInstanceCreated?: Function,
  icon?: any,
  content?: MarkerContent,
  className?: string,
  draggable?: boolean,
  visible?: boolean,
  cursor?: string,
  zIndex?: number,
  angle?: number,
  animation?: string,
  markers?: Array<Object>,
  shadow?: Object,
  title?: string,
  clickable?: boolean,
  extData?: any,
  label?: Object,
  topWhenClick?: boolean,
  bubble?: boolean,
  raiseOnDrag?: boolean,
  autoRotation?: boolean,
  shape?: Object,
  events?: Object,
  render?: Function,
  children?: any,
  useCluster?: Object | boolean,
  __map__: Object,
  __ele__: HTMLDivElement,
};

declare type MapEvent = {
  lnglat: AMapLngLat,
  target: Object,
  markers?: Array<Object>
};
