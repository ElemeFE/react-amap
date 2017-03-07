const errorMap = {
  'MARKER_ID_CONFLICT': 'Marker 的 id 属性重复',
  'MARKER_ID_REQUIRED': '每一个 Marker 必需有一个 id 属性',
  'NO_MAP_INSTANCE': '没有地图实例；组件必须作为 AMap 的子组件使用',
  'CIRCLE_CENTER_REQUIRED': 'Circle 组件必需设置 center 属性',
  'CIRCLE_RADIUS_REQUIRED': 'Circle 组件必需设置 radius 属性',
  'SRC_REQUIRED': 'GroundImage 组件必需设置 src 属性',
  'BOUNDS_REQUIRED': 'GroundImage 组件必需设置 bounds 属性',
  'WINDOW_POSITION_REQUIRED': 'InfoWindow 组件必需设置 position 属性',
  'INVALID_AMAP_PLUGIN': 'plugins 属性不正确；目前支持的插件有\'scale\', \'toolbar\', \'maptype\', \'overview\'',
};

const error = (desc, isSerious) => {
  const text = (desc in errorMap) ? errorMap[desc] : '未知错误';
  if (isSerious) {
    console.log(`%c${text}`, 'color:#f66;border-left: 2px solid red;padding-left: 4px;');
  } else {
    console.log(`%c${text}`, 'color:#d4d483;border-left: 2px solid #d4d483;padding-left: 4px;');
  }
};

// const log = {
//   // 警告，会造成错误，但是程序仍然能正常运行
//   warning: (msg) => {
//     console.log(`%c${msg}`, '');
//   },
//
//   // 程序中断，开发者必需修复错误
//   error: (msg) => {
//     //
//   },
//
//   // 可以优化，不影响程序执行，但是不是我希望的用法
//   optimize: () => {},
// };

export default error;




