declare type AMapLngLat= {
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
declare type PolylinePath = PureLngLat[] & AMapLngLat[];

declare type PolygonPath = PolylinePath | [ PolylinePath, PolylinePath ];