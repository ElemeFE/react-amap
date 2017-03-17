const errorMap = {
  'MARKER_ID_CONFLICT': 'Marker 的 id 属性重复',
  'MARKER_ID_REQUIRED': '每一个 Marker 必需有一个 id 属性',
  'MAP_INSTANCE_REQUIRED': '没有地图实例；组件必须作为 Map 的子组件使用',
  'CIRCLE_INSTANCE_REQUIRED': '',
  'CIRCLE_CENTER_REQUIRED': 'Circle 组件必需设置 center 属性',
  'CIRCLE_RADIUS_REQUIRED': 'Circle 组件必需设置 radius 属性',
  'SRC_REQUIRED': 'GroundImage 组件必需设置 src 属性',
  'BOUNDS_REQUIRED': 'GroundImage 组件必需设置 bounds 属性',
  'WINDOW_POSITION_REQUIRED': 'InfoWindow 组件必需设置 position 属性',
  'INVALID_AMAP_PLUGIN': 'plugins 属性不正确；目前支持的插件有\'Scale\', \'ToolBar\', \'MapType\', \'OverView\''
};

const getMessage = (key) => {
  return key in errorMap ? errorMap[key] : key;
};

const log = {
  // 开发者必须修正的问题，否则会影响其他程序运行
  error: (key) => { throw new Error(getMessage(key));},

  // 是一个错误，导致本插件无法运行，但是不会影响开发者的其他功能
  warning: (key) => {
    // console.log(`%c${getMessage(key)}`, 'color:#f66;border-left: 2px solid red;padding-left: 4px;');
    console.warn(getMessage(key));
  },

  // 不影响使用，但不是本插件理想的使用方式
  optimize: (key) => {
    console.log(`%c${getMessage(key)}`, 'color:#d4d483;border-left: 2px solid #d4d483;padding-left: 4px;');
  }
};

export default log;
