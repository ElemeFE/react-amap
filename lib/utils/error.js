const errorMap = {
  'MARKER_ID_CONFLICT': '标记的 ID 属性重复'
};

const error = (desc) => {
  const text = (desc in errorMap) ? errorMap.desc : '未知错误';
  throw new Error(text);
};

export default error;