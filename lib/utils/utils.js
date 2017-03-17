export const getAMapPosition = (pos) => {
  if (!pos) {
    return pos;
  }
  if ('getLng' in pos) {
    return pos;
  }
  return new window.AMap.LngLat(pos.longitude, pos.latitude);
};

export const getAMapPixel = (ofst) => {
  if (!ofst) {
    return ofst;
  }
  if ('getX' in ofst) {
    return ofst;
  }
  return new window.AMap.Pixel(ofst[0], ofst[1]);
};

export const getAMapSize = (size) => {
  if (!size) {
    return size;
  }
  if ('getWidth' in size) {
    return size;
  }
  return new window.AMap.Size(size.width, size.height);
};
