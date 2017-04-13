const hasWindow = (typeof window !== 'undefined');

export const getAMapPosition = (pos) => {
  if (!pos) {
    return pos;
  }
  if ('getLng' in pos) {
    return pos;
  }
  return hasWindow ? new window.AMap.LngLat(pos.longitude, pos.latitude) : null;
};

export const getAMapPixel = (ofst) => {
  if (!ofst) {
    return ofst;
  }
  if ('getX' in ofst) {
    return ofst;
  }
  return hasWindow ? new window.AMap.Pixel(ofst[0], ofst[1]) : null;
};

export const getAMapSize = (size) => {
  if (!size) {
    return size;
  }
  if ('getWidth' in size) {
    return size;
  }
  return hasWindow ? new window.AMap.Size(size.width, size.height) : null;
};
