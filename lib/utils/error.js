const errorMap = {
  'MARKER_ID_CONFLICT': '标记的 ID 属性重复',
  'NO_MAP_INSTANCE': '没有地图实例',
  'INFO_WINDOW_CHILD_INVALID': 'InfoWindow 组件的子组件必必需包裹在一个元素里'
};

const error = (desc) => {
  const text = (desc in errorMap) ? errorMap.desc : '未知错误';
  throw new Error(text);
};

export default error;