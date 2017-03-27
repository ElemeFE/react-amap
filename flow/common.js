/* eslint-disable */
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

// TODO 如何区分 & 和 |
// declare type PolylinePath = PureLngLat[] & AMapLngLat[];

declare type PolylinePath = Array<PureLngLat> & Array<AMapLngLat>;

declare type PolygonPath = PolylinePath & Array<PolylinePath>;

declare type MarkerProps = {
  position?: LngLat,
  offset?: Pixel,
  icon?: any,
  content?: MarkerContent,
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
  useCluster?: boolean,
  __map__: Object,
  __ele__: HTMLElement,
};

declare type MapEvent = {
  lnglat: AMapLngLat,
  target: Object,
  markers?: Array<Object>
};