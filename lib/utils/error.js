const errorMap = {
  'MARKER_ID_CONFLICT': '标记的 ID 属性重复',
  'NO_MAP_INSTANCE': '没有地图实例',
};

const error = (desc) => {
  const text = (desc in errorMap) ? errorMap.desc : '未知错误';
  throw new Error(text);
};

export default error;