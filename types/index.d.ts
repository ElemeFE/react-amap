/// <reference types="react" />
import * as React from 'react';

export type EventMap = Object;

export type PluginList = 'Scale' | 'ToolBar' | 'MapType' | 'OverView' | 'ControlBar'

export interface PluginConfig {
  name: PluginList;
  options?: Object;
}

export type ArrayLngLat = [number, number];
export interface LngLatPos {
  lng: number;
  lat: number;
}
export interface FullLngLatPos {
  longitude: number;
  latitude: number;
}
export interface AMapLngLat {
  offset(): AMapLngLat;
  distance(): number;
  getLng(): number;
  getLat(): number;
  equanls(): boolean;
  toString(): string;
}
export type LngLat = ArrayLngLat | LngLatPos | FullLngLatPos | AMapLngLat;

export type Path = Array<ArrayLngLat> | Array<FullLngLatPos> | Array<AMapLngLat>;

export type PolygonPath = Path | [Path, Path];

export type ArrayPixel = [number, number];

export interface AMapPixel {
  getX(): number;
  getY(): number;
  equals(): boolean;
  toString(): string;
}

export type Pixel = AMapPixel | ArrayPixel;

export interface ObjSize {
  width: number;
  height: number;
}

export interface AMapSize {
  getWidth(): number;
  getHeight(): number;
  toString(): string;
}

export type Size = ObjSize | AMapSize;

export type MapFeature = 'bg' | 'point' | 'road' | 'building';

export interface MapProps {
  protocol?: string;
  amapkey?: string;
  version?: string;
  useAMapUI?: boolean | Function;
  children?: any;
  onInstanceCreated?: Function;
  plugins?: Array<PluginList|PluginConfig>;
  events?: EventMap;
  loading?: any;
  viewMode?: '2D'|'3D';
  center?: LngLat;
  zoom?: number;
  zooms?: [number, number];
  animateEnable?: boolean;
  doubleClickZoom?: boolean;
  dragEnable?: boolean;
  isHotspot?: boolean;
  jogEnable?: boolean;
  keyboardEnable?: boolean;
  resizeEnable?: boolean;
  rotateEnable?: boolean;
  scrollWheel?: boolean;
  touchZoom?: boolean;
  zoomEnable?: boolean;
  showIndoorMap?: boolean;
  expandZoomRange?: boolean;
  pitch?: number;
  mapStyle?: string;
  labelzIndex?: number;
  skyColor?: string;
  buildingAnimation?: boolean;
  pitchEnable?: boolean;
  showBuildingBlock?: boolean;
  features?: Array<MapFeature>;
  indoorMap?: any;
  cursor?: string;
  layers?: Array<any>;
  view?: any;
  city?: string;
  bounds?: any;
  limitBounds?: any;
  status?: any;
  rotation?: number;
}

export interface MarkerProps {
  position?: LngLat;
  offset?: Pixel;
  icon?: any;
  onInstanceCreated?: Function;
  className?: string;
  content?: string | HTMLElement;
  draggable?: boolean;
  visible?: boolean;
  cursor?: string;
  zIndex?: number;
  angle?: number;
  animation?: string;
  markers?: Array<Object>;
  shadow?: Object;
  title?: string;
  clickable?: boolean;
  extData?: any;
  label?: Object;
  topWhenClick?: boolean;
  bubble?: boolean;
  raiseOnDrag?: boolean;
  autoRotation?: boolean;
  shape?: Object;
  events?: Object;
  render?: Function;
  children?: any;
  useCluster?: Object | boolean;
}

export interface CircleProps {
  center: LngLat;
  radius: number;
  draggable?: boolean;
  extData?: any;
  visible?: boolean;
  style?: Object;
  zIndex?: number;
  bubble: boolean;
  events?: Object;
  children?: any;
}

export interface CircleEditorProps {
  active?: boolean;
  events?: EventMap;
}

export interface PolygonProps {
  path: PolygonPath;
  draggable?: boolean;
  extData?: any;
  style?: Object;
  visible?: boolean;
  zIndex?: number;
  bubble?: boolean;
  events?: Object;
  children?: any;
}

export interface PolylineProps {
  path: Path;
  extData?: any;
  draggable?: boolean;
  visible?: boolean;
  style?: Object;
  zIndex?: number;
  bubble?: boolean;
  showDir?: boolean;
  events?: Object;
  children?: any;
}

export interface PolyEditorProps {
  active?: boolean;
  events?: EventMap;
}

export interface GroungImageProps {
  opacity?: number;
  src?: string;
  bounds: Object;
  visible?: boolean;
  clickable?: boolean;
  events?: EventMap;
}

export interface InfoWindowProps {
  content?: any;
  position: LngLat;
  size?: Size;
  visible?: boolean;
  offset?: Pixel;
  isCustom?: boolean;
  autoMove?: boolean;
  closeWhenClickMap?: boolean;
  showShadow?: boolean;
  events?: EventMap;
  children?: any;
  className?: string;
}

export interface MouseToolProps {
  events?: EventMap;
}

export class Map extends React.Component<MapProps, {mapLoaded: boolean}> {}

export class Marker extends React.Component<MarkerProps, {}> {}

export class Markers extends React.Component<any, any> {}

export class Circle extends React.Component<CircleProps, {}> {}

export class CircleEditor extends React.Component<CircleEditorProps, {}> {}

export class Polygon extends React.Component<PolygonProps, {}> {}

export class Polyline extends React.Component<PolylineProps, {}> {}

export class PolyEditor extends React.Component<PolyEditorProps, {}> {}

export class GroundImage extends React.Component<GroungImageProps, {}> {}

export class InfoWindow extends React.Component<InfoWindowProps, {}> {}

export class MouseTool extends React.Component<MouseToolProps, {}> {}
