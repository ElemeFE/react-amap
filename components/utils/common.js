const hasWindow = (typeof window !== 'undefined')

/*
 * [lng, lat]
 * {lng, lat}
 * {longitude, latitude}
 */
export const toLnglat = (pos) => {
  if (!pos) {
    return pos
  }
  // 高德原生 AMap.LngLat 类
  if ('getLng' in pos && 'getLat' in pos) {
    return pos
  }
  let lng = 0
  let lat = 0
  if (({}).toString.call(pos) === '[object Array]') {
    lng = pos[0]
    lat = pos[1]
  } else if ('lng' in pos && 'lat' in pos) {
    lng = pos.lng
    lat = pos.lat
  } else if ('longitude' in pos && 'latitude' in pos) {
    lng = pos.longitude
    lat = pos.latitude
  }
  return hasWindow ? new window.AMap.LngLat(lng, lat) : null
}

export const toPixel = (ofst) => {
  if (!ofst) {
    return ofst
  }
  if ('getX' in ofst && 'getY' in ofst) {
    return ofst
  }
  let x = 0
  let y = 0
  if (({}).toString.call(ofst) === '[object Array]') {
    x = ofst[0]
    y = ofst[1]
  } else if ('x' in ofst && 'y' in ofst) {
    x = ofst.x;
    y = ofst.y;
  }
  return hasWindow ? new window.AMap.Pixel(x, y) : null
}

export const toSize = (size) => {
  if (!size) {
    return size
  }
  if ('getWidth' in size) {
    return size
  }
  return hasWindow ? new window.AMap.Size(size.width, size.height) : null
}

export default {
  toLnglat,
  toPixel,
  toSize
}
