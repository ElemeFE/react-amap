(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["AMap"] = factory(require("react"), require("react-dom"));
	else
		root["AMap"] = factory(root["react"], root["react-dom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var errorMap = {
  'MARKER_ID_CONFLICT': 'Marker 的 id 属性重复',
  'MARKER_ID_REQUIRED': '每一个 Marker 必需有一个 id 属性',
  'NO_MAP_INSTANCE': '没有地图实例；组件必须作为 AMap 的子组件使用',
  'CIRCLE_CENTER_REQUIRED': 'Circle 组件必需设置 center 属性',
  'CIRCLE_RADIUS_REQUIRED': 'Circle 组件必需设置 radius 属性',
  'SRC_REQUIRED': 'GroundImage 组件必需设置 src 属性',
  'BOUNDS_REQUIRED': 'GroundImage 组件必需设置 bounds 属性',
  'WINDOW_POSITION_REQUIRED': 'InfoWindow 组件必需设置 position 属性',
  'INVALID_AMAP_PLUGIN': 'plugins 属性不正确；目前支持的插件有\'scale\', \'toolbar\', \'maptype\', \'overview\''
};

var error = function error(desc, isSerious) {
  var text = desc in errorMap ? errorMap[desc] : '未知错误';
  if (isSerious) {
    console.log('%c' + text, 'color:#f66;border-left: 2px solid red;padding-left: 4px;');
  } else {
    console.log('%c' + text, 'color:#d4d483;border-left: 2px solid #d4d483;padding-left: 4px;');
  }
};

exports.default = error;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isFun = function isFun(arg) {
  return !!arg && typeof arg === 'function';
};

exports.default = isFun;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFun = __webpack_require__(1);

var _isFun2 = _interopRequireDefault(_isFun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 先检查组件实例中是否有对应方法；如果有执行该方法；
// 如果没有，检查实例的 props 属性中是否有，有的话直接调用
var bindEvent = function bindEvent(mapObj, eventList, instance) {
  eventList.forEach(function (ev) {
    mapObj.on(ev.toLowerCase(), function (e) {
      var evName = 'on' + ev;
      if (evName in instance) {
        instance[evName].call(instance, e);
      } else if ((0, _isFun2.default)(instance.props[evName])) {
        instance.props[evName].call(null, e);
      }
    });
  });
};

exports.default = bindEvent;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _isFun = __webpack_require__(1);

var _isFun2 = _interopRequireDefault(_isFun);

var _error = __webpack_require__(0);

var _error2 = _interopRequireDefault(_error);

var _bindEvent = __webpack_require__(3);

var _bindEvent2 = _interopRequireDefault(_bindEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */
var Component = _react2.default.Component;

var defaultOpts = {
  style: {
    strokeColor: '#f33',
    strokeOpacity: 0.6,
    strokeWeight: 4,
    fillColor: '#ee2200',
    fillOpacity: 0.35,
    strokeStyle: 'solid'
  }
};

var Circle = function (_Component) {
  _inherits(Circle, _Component);

  function Circle(props) {
    _classCallCheck(this, Circle);

    var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, props));

    if (!props.__map__) {
      (0, _error2.default)('NO_MAP_INSTANCE', true);
    } else {
      _this.map = props.__map__;
      _this.element = props.__ele__;
      _this.circleEditable = false;
      _this.initMapCircle(props);
    }
    return _this;
  }

  _createClass(Circle, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.setVisible(nextProps)) {
        this.setCenter(nextProps);
        this.setRadius(nextProps);
        this.setStyle(nextProps);
        this.setEditable(nextProps);
      }
    }
  }, {
    key: 'initMapCircle',
    value: function initMapCircle(props) {
      this.mapCircle = new window.AMap.Circle({
        map: this.map
      });
      var eventList = ['Click', 'DblClick', 'MouseDown', 'MouseUp', 'MouseOver', 'MouseOut'];
      (0, _bindEvent2.default)(this.mapCircle, eventList, this);

      if (this.setVisible(props)) {
        this.setCenter(props);
        this.setRadius(props);
        this.setStyle(props);
        this.setEditable(props);
      }
    }
  }, {
    key: 'setEditable',
    value: function setEditable(props) {
      var editable = false;
      if ('editable' in props && props.editable === true) {
        editable = true;
      }

      if (editable) {
        if (!this.circleEditable) {
          this.activeEdit();
        }
      } else {
        if (this.circleEditable) {
          this.inactiveEdit();
        }
      }
    }
  }, {
    key: 'loadCircleEditor',
    value: function loadCircleEditor() {
      var _this2 = this;

      if (this.circleEditor) {
        return new Promise(function (resolve) {
          resolve(_this2.circleEditor);
        });
      }
      return new Promise(function (resolve, reject) {
        _this2.map.plugin(['AMap.CircleEditor'], function () {
          resolve(_this2.initEditorInstance());
        });
      });
    }
  }, {
    key: 'initEditorInstance',
    value: function initEditorInstance() {
      var _this3 = this;

      this.circleEditor = new window.AMap.CircleEditor(this.map, this.mapCircle);
      this.circleEditor.on('move', function () {
        _this3.onCircleChange('move');
      });
      this.circleEditor.on('adjust', function () {
        _this3.onCircleChange('adjust');
      });
      this.circleEditor.on('end', function () {
        _this3.onCircleChange('end');
      });
      return this.circleEditor;
    }
  }, {
    key: 'activeEdit',
    value: function activeEdit() {
      var _this4 = this;

      this.loadCircleEditor().then(function (editor) {
        _this4.circleEditable = true;
        editor.open();
      });
    }
  }, {
    key: 'inactiveEdit',
    value: function inactiveEdit() {
      this.circleEditable = false;
      if (this.circleEditor) {
        this.circleEditor.close();
      }
    }
  }, {
    key: 'setCenter',
    value: function setCenter(props) {
      var center = void 0;
      if ('center' in props) {
        center = new window.AMap.LngLat(props.center.longitude, props.center.latitude);
      } else {
        (0, _error2.default)('CIRCLE_CENTER_REQUIRED', true);
      }
      var curCenter = this.mapCircle.getCenter();
      if (curCenter) {
        if (!curCenter.equals(center)) {
          this.mapCircle.setCenter(center);
        }
      } else {
        this.mapCircle.setCenter(center);
      }
    }
  }, {
    key: 'setRadius',
    value: function setRadius(props) {
      var radius = void 0;
      if ('radius' in props) {
        radius = props.radius;
      } else {
        (0, _error2.default)('CIRCLE_RADIUS_REQUIRED', true);
      }
      if (this.mapCircle.getRadius() !== radius) {
        this.mapCircle.setRadius(radius);
      }
    }
  }, {
    key: 'setStyle',
    value: function setStyle(props) {
      var style = void 0;
      if ('style' in props) {
        style = this.buildStyle(props.style);
      } else {
        style = defaultOpts.style;
      }
      this.mapCircle.setOptions(style);
    }
  }, {
    key: 'setVisible',
    value: function setVisible(props) {
      var visible = true;
      if ('visible' in props && props.visible === false) {
        visible = false;
      }
      if (visible) {
        this.mapCircle.show();
      } else {
        this.mapCircle.hide();
      }
      return visible;
    }
  }, {
    key: 'buildStyle',
    value: function buildStyle(styleOpts) {
      var keys = ['strokeColor', 'strokeOpacity', 'strokeWeight', 'fillColor', 'fillOpacity', 'strokeStyle'];
      var style = {};
      keys.forEach(function (key) {
        style[key] = key in styleOpts ? styleOpts[key] : defaultOpts.style[key];
      });
      return style;
    }
  }, {
    key: 'onCircleChange',
    value: function onCircleChange(type) {
      if ((0, _isFun2.default)(this.props.onChange) && type !== 'end') {
        var center = this.mapCircle.getCenter();
        var radius = this.mapCircle.getRadius();
        this.props.onChange({
          center: {
            longitude: center.getLng(),
            latitude: center.getLat()
          },
          radius: radius
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Circle;
}(Component);

exports.default = Circle;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _error = __webpack_require__(0);

var _error2 = _interopRequireDefault(_error);

var _bindEvent = __webpack_require__(3);

var _bindEvent2 = _interopRequireDefault(_bindEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */
var Component = _react2.default.Component;
var defaultOpts = {
  clickable: false,
  opacity: 1,
  visible: true
};

var GroundImage = function (_Component) {
  _inherits(GroundImage, _Component);

  function GroundImage(props) {
    _classCallCheck(this, GroundImage);

    var _this = _possibleConstructorReturn(this, (GroundImage.__proto__ || Object.getPrototypeOf(GroundImage)).call(this, props));

    if (!props.__map__) {
      (0, _error2.default)('NO_MAP_INSTANCE', true);
    } else {
      _this.map = props.__map__;
      _this.element = props.__ele__;
      _this.circleEditable = false;
      _this.initGroundImage(props);
    }
    return _this;
  }

  _createClass(GroundImage, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.setVisible(nextProps)) {
        if (
        // 高德提供的 GroundImage 不支持动态刷新 bounds 和 src；
        // 检测到这两个属性变化后，需要删除当前实例，并重新创建实例
        this.checkBoundsChange(nextProps) || nextProps.src !== this.image.getImageUrl()) {
          this.image.setMap(null);
          this.initGroundImage(nextProps);
        } else {
          this.setOpacity(nextProps);
        }
      }
    }
  }, {
    key: 'initGroundImage',
    value: function initGroundImage(props) {
      var src = void 0,
          bounds = void 0,
          opacity = void 0,
          clickable = void 0;
      if ('src' in props) {
        src = props.src;
      } else {
        (0, _error2.default)('SRC_REQUIRED', true);
      }
      if ('bounds' in props) {
        bounds = this.buildBounds(props);
      } else {
        (0, _error2.default)('BOUNDS_REQUIRED', true);
      }

      if ('clickable' in props) {
        clickable = props.clickable;
      } else {
        clickable = defaultOpts.clickable;
      }

      if ('opacity' in props) {
        opacity = props.opacity;
      } else {
        opacity = defaultOpts.opacity;
      }
      this.image = new window.AMap.GroundImage(src, bounds, {
        map: this.map,
        clickable: clickable,
        opacity: opacity
      });

      (0, _bindEvent2.default)(this.image, ['Click', 'DblClick'], this);
    }
  }, {
    key: 'checkBoundsChange',
    value: function checkBoundsChange(nextProps) {
      var changed = true;
      var nextBounds = this.buildBounds(nextProps);
      var curBounds = this.image.getBounds();
      if (curBounds.getNorthEast().equals(nextBounds.getNorthEast()) && curBounds.getSouthWest().equals(nextBounds.getSouthWest())) {
        changed = false;
      }
      return changed;
    }
  }, {
    key: 'buildBounds',
    value: function buildBounds(props) {
      var rawBounds = props.bounds;
      var bounds = new window.AMap.Bounds(new window.AMap.LngLat(rawBounds.sw.longitude, rawBounds.sw.latitude), new window.AMap.LngLat(rawBounds.ne.longitude, rawBounds.ne.latitude));
      return bounds;
    }
  }, {
    key: 'setOpacity',
    value: function setOpacity(props) {
      var opacity = defaultOpts.opacity;
      if ('opacity' in props) {
        opacity = props.opacity;
      }
      if (opacity !== this.image.getOpacity()) {
        this.image.setOpacity(opacity);
      }
    }
  }, {
    key: 'setVisible',
    value: function setVisible(props) {
      var visible = defaultOpts.visible;
      if ('visible' in props) {
        visible = props.visible;
      }
      if (visible) {
        if (!this.prevVisible) {
          this.image.setMap(this.map);
          this.prevVisible = true;
        }
      } else {
        if (this.prevVisible) {
          this.image.setMap(null);
          this.prevVisible = false;
        }
      }
      return visible;
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return GroundImage;
}(Component);

exports.default = GroundImage;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(4);

var _isFun = __webpack_require__(1);

var _isFun2 = _interopRequireDefault(_isFun);

var _error = __webpack_require__(0);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

var Component = _react2.default.Component;
var Children = _react2.default.Children;

var defaultOpts = {
  offset: [0, -30],
  closeWhenClickMap: false
};

var InfoWindow = function (_Component) {
  _inherits(InfoWindow, _Component);

  function InfoWindow(props) {
    _classCallCheck(this, InfoWindow);

    var _this = _possibleConstructorReturn(this, (InfoWindow.__proto__ || Object.getPrototypeOf(InfoWindow)).call(this, props));

    if (!props.__map__) {
      (0, _error2.default)('NO_MAP_INSTANCE', true);
    } else {
      _this.map = props.__map__;
      _this.element = props.__ele__;
      _this.initInfoWindow(props);
    }
    return _this;
  }

  _createClass(InfoWindow, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.drawWindow(this.props);
    }
  }, {
    key: 'initInfoWindow',
    value: function initInfoWindow(props) {
      this.infoDOM = document.createElement('div');
      var offset = 'offset' in props ? props.offset : defaultOpts.offset;

      this.infoWindow = new window.AMap.InfoWindow({
        isCustom: true,
        autoMove: true,
        content: this.infoDOM,
        closeWhenClickMap: false,
        offset: this.getOffset(offset)
      });

      // this.infoWindow.on('close',() => {
      //   this.onWindowClose();
      // });
      // this.infoWindow.on('open',() => {
      //   this.onWindowOpen();
      // });
    }
  }, {
    key: 'onWindowClose',
    value: function onWindowClose() {
      if ((0, _isFun2.default)(this.props.onClose)) {
        this.props.onClose();
      }
    }
  }, {
    key: 'onWindowOpen',
    value: function onWindowOpen() {
      if ((0, _isFun2.default)(this.props.onOpen)) {
        this.props.onOpen();
      }
    }
  }, {
    key: 'getOffset',
    value: function getOffset(os) {
      return new window.AMap.Pixel(os[0], os[1]);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      /*
       * {
       *  __map__,
       *  __ele__,
       * }
       */
      this.drawWindow(nextProps);
    }
  }, {
    key: 'drawWindow',
    value: function drawWindow(props) {
      // 刷新开启关闭状态
      if (this.setOpen(props)) {
        this.setClassName(props);
        this.setChild(props);
      }
    }
  }, {
    key: 'setChild',
    value: function setChild(props) {
      var child = props.children;
      if (Children.count(child) === 1) {
        (0, _reactDom.render)(child, this.infoDOM);
      } else {
        (0, _reactDom.render)(_react2.default.createElement(
          'div',
          null,
          props.children
        ), this.infoDOM);
      }
    }
  }, {
    key: 'setClassName',
    value: function setClassName(props) {
      // 刷新 className
      var cls = 'amap_markers_pop_window';
      if ('className' in props) {
        cls = 'amap_markers_pop_window ' + props.className;
      }
      this.infoDOM.className = cls;
    }
  }, {
    key: 'setOpen',
    value: function setOpen(props) {
      var open = true;
      if ('open' in props && props.open === false) {
        open = false;
      }
      if (open) {
        this.showInfoWindow(props);
      } else {
        this.infoWindow.close();
      }
      return open;
    }
  }, {
    key: 'showInfoWindow',
    value: function showInfoWindow(props) {
      if ('position' in props) {
        var position = props.position;

        this.showPos = new window.AMap.LngLat(position.longitude, position.latitude);

        var prevOpen = this.infoWindow.getIsOpen();
        var needRefresh = true;
        // 如果之前窗口已经是开启状态
        // 检测一下新属性的位置是否改变，如果没有改变，不需要调用 open 方法
        if (prevOpen) {
          var prevPosition = this.infoWindow.getPosition();
          if (prevPosition.equals(this.showPos)) {
            needRefresh = false;
          }
        }
        if (needRefresh) {
          this.infoWindow.open(this.map, this.showPos);
        }
      } else {
        (0, _error2.default)('WINDOW_POSITION_REQUIRED', true);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return InfoWindow;
}(Component);

exports.default = InfoWindow;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _isFun = __webpack_require__(1);

var _isFun2 = _interopRequireDefault(_isFun);

var _error = __webpack_require__(0);

var _error2 = _interopRequireDefault(_error);

var _map_cluster = __webpack_require__(16);

var _map_cluster2 = _interopRequireDefault(_map_cluster);

var _map_wait = __webpack_require__(19);

var _map_wait2 = _interopRequireDefault(_map_wait);

var _map_wait_emphsis = __webpack_require__(20);

var _map_wait_emphsis2 = _interopRequireDefault(_map_wait_emphsis);

var _map_selected = __webpack_require__(17);

var _map_selected2 = _interopRequireDefault(_map_selected);

var _map_selected_emphsis = __webpack_require__(18);

var _map_selected_emphsis2 = _interopRequireDefault(_map_selected_emphsis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import css from './assets/marker.css';

__webpack_require__(15);

var Component = _react2.default.Component;

var SCALE = 0.8;
var SIZE_WIDTH = 32 * SCALE;
var SIZE_HEIGHT = 46 * SCALE - 2;
var SIZE_HOVER_WIDTH = 46 * SCALE;
var SIZE_HOVER_HEIGHT = 66 * SCALE - 2;
var MAX_INFO_MARKERS = 42;
// 每次刷新地图上的坐标点时，根据坐标点数量的不同采取不同的刷新策略
// 其中一个策略比较耗性能，但是交互效果更好，所以设置极限值
var REFRESH_LIMIT = 10000;

var defaultOpts = {
  useCluster: true,
  markersCache: [],
  markerIDCache: []
};

/*
 * props
 * {
 *  useCluster(boolean)是否使用聚合点
 *  markers(array<>)坐标列表
 *  __map__ 父级组件传过来的地图实例
 *  __ele__ 父级组件传过来的地图容器
 *  onClick(func),
 *  onMouseOver(func),
 *  onMouseOut(func),
 *
 * }
 */

var Markers = function (_Component) {
  _inherits(Markers, _Component);

  function Markers(props) {
    _classCallCheck(this, Markers);

    var _this = _possibleConstructorReturn(this, (Markers.__proto__ || Object.getPrototypeOf(Markers)).call(this, props));

    if (!props.__map__) {
      (0, _error2.default)('NO_MAP_INSTANCE', true);
    } else {
      _this.map = props.__map__;
      _this.element = props.__ele__;
      _this.markersCache = defaultOpts.markersCache;
      _this.useCluster = null;
      _this.markerIDCache = defaultOpts.markerIDCache;
      _this.resetOffset = new window.AMap.Pixel(-SIZE_WIDTH / 2, -SIZE_HEIGHT);
      _this.hoverOffset = new window.AMap.Pixel(-SIZE_HOVER_WIDTH / 2, -SIZE_HOVER_HEIGHT);

      _this.handleCluster(props);
      _this.buildMapMarkers(props.markers);
      _this.renderMarkers();
    }
    return _this;
  }

  _createClass(Markers, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.map) {
        var markerChanged = false;
        var clusterSettingChanged = this.handleCluster(nextProps);
        if (nextProps.markers !== this.props.markers) {
          this.buildMapMarkers(nextProps.markers);
          markerChanged = true;
        }
        if (clusterSettingChanged || markerChanged) {
          this.renderMarkers();
        }
      }
    }
  }, {
    key: 'handleCluster',
    value: function handleCluster(props) {
      var clusterSettingChanged = false;
      var useCluster = void 0;
      if ('useCluster' in props && typeof props.useCluster === 'boolean') {
        useCluster = props.useCluster;
      } else {
        useCluster = defaultOpts.useCluster;
      }
      if (useCluster !== this.useCluster) {
        this.useCluster = useCluster;
        this.initMapCluster();
        clusterSettingChanged = true;
      }
      return clusterSettingChanged;
    }
  }, {
    key: 'onMarkerClick',
    value: function onMarkerClick(e) {
      var marker = e.target;
      this.triggerMarkerClick(marker);
    }
  }, {
    key: 'onMarkerHover',
    value: function onMarkerHover(e) {
      e.target.setTop(true);
      this.setMarkerHovered(e.target);
    }
  }, {
    key: 'onMarkerHoverOut',
    value: function onMarkerHoverOut(e) {
      e.target.setTop(false);
      this.setMarkerHoverOut(e.target);
    }
  }, {
    key: 'onWindowMarkerClick',
    value: function onWindowMarkerClick(span) {
      var pointIndex = span.getAttribute('pointIndex');
      var marker = this.markersCache[pointIndex];
      this.triggerMarkerClick(marker);
    }
  }, {
    key: 'onWindowMarkerHover',
    value: function onWindowMarkerHover(span) {
      var pointIndex = span.getAttribute('pointIndex');
      var marker = this.markersCache[pointIndex];
      this.setMarkerHovered(marker);
    }
  }, {
    key: 'onWindowMarkerHoverOut',
    value: function onWindowMarkerHoverOut(span) {
      var pointIndex = span.getAttribute('pointIndex');
      var marker = this.markersCache[pointIndex];
      this.setMarkerHoverOut(marker);
    }
  }, {
    key: 'setMarkerHovered',
    value: function setMarkerHovered(marker) {
      this.setMarkerData(marker, 'isHover', true);
      this.setMarkerIcon(marker);

      var id = this.getMarkerData(marker, 'id');
      var span = this.element.querySelector('.map_marker_in_window_' + id);
      if (span) {
        var html = this.generateMarkerContent(this.getMarkerData(marker, 'isSelected'), true, this.getMarkerData(marker, 'content'));
        span.innerHTML = html;
      }
      this.triggerMarkerHover(marker);
    }
  }, {
    key: 'setMarkerHoverOut',
    value: function setMarkerHoverOut(marker) {
      this.setMarkerData(marker, 'isHover', false);
      this.setMarkerIcon(marker);

      var id = this.getMarkerData(marker, 'id');
      var span = this.element.querySelector('.map_marker_in_window_' + id);
      if (span) {
        var html = this.generateMarkerContent(this.getMarkerData(marker, 'isSelected'), false, this.getMarkerData(marker, 'content'));
        span.innerHTML = html;
      }
      this.triggerMarkerHoverOut(marker);
    }
  }, {
    key: 'setMarkerIcon',
    value: function setMarkerIcon(marker) {
      var extData = marker.getExtData() || {};
      var content = 'content' in extData ? extData.content : '';
      var isSelected = extData.isSelected;
      var isHover = extData.isHover;
      var html = this.generateMarkerContent(isSelected, isHover, content);
      marker.setContent(html);
      if (isHover) {
        marker.setOffset(this.hoverOffset);
      } else {
        marker.setOffset(this.resetOffset);
      }
    }
  }, {
    key: 'setMarkerData',
    value: function setMarkerData(marker, key, value) {
      var extData = marker.getExtData() || {};
      extData[key] = value;
      marker.setExtData(extData);
    }
  }, {
    key: 'getMarkerData',
    value: function getMarkerData(marker, key) {
      var extData = marker.getExtData() || {};
      return extData[key];
    }
  }, {
    key: 'triggerMarkerClick',
    value: function triggerMarkerClick(marker) {
      var raw = this.getMarkerData(marker, 'raw');
      if ((0, _isFun2.default)(this.props.onClick)) {
        this.props.onClick(raw);
      }
    }
  }, {
    key: 'triggerMarkerHover',
    value: function triggerMarkerHover(marker) {
      var raw = this.getMarkerData(marker, 'raw');
      if ((0, _isFun2.default)(this.props.onMouseOver)) {
        this.props.onMouseOver(raw);
      }
    }
  }, {
    key: 'triggerMarkerHoverOut',
    value: function triggerMarkerHoverOut(marker) {
      var raw = this.getMarkerData(marker, 'raw');
      if ((0, _isFun2.default)(this.props.onMouseOut)) {
        this.props.onMouseOut(raw);
      }
    }
  }, {
    key: 'initMapCluster',
    value: function initMapCluster() {
      if (this.useCluster) {
        if (!this.mapCluster) {
          var style = {
            url: _map_cluster2.default,
            size: new window.AMap.Size(56, 56),
            offset: new window.AMap.Pixel(-28, -28)
          };
          var clusterStyles = [style, style, style];
          this.mapCluster = new window.AMap.MarkerClusterer(this.map, [], {
            minClusterSize: 2,
            zoomOnClick: false,
            gridSize: 60,
            styles: clusterStyles,
            averageCenter: true
          });
          this.initClusterMarkerWindow();
          this.bindClusterEvent();
        }
      } else {
        if (this.mapCluster) {
          this.mapCluster.setMarkers([]);
        }
      }
    }
  }, {
    key: 'initClusterMarkerWindow',
    value: function initClusterMarkerWindow() {
      this.markersWindow = new window.AMap.InfoWindow({
        isCustom: true,
        autoMove: true,
        closeWhenClickMap: true,
        content: '<span>loading...</span>',
        showShadow: false,
        offset: new window.AMap.Pixel(0, -20)
      });
      this.markersDOM = document.createElement('div');
      this.markersDOM.className = 'amap_markers_pop_window';
      this.markersWindow.setContent(this.markersDOM);
    }
  }, {
    key: 'bindClusterEvent',
    value: function bindClusterEvent() {
      var _this2 = this;

      this.mapCluster.on('click', function (e) {
        _this2.showMarkersInfoWindow(e);
      });
    }
  }, {
    key: 'showMarkersInfoWindow',
    value: function showMarkersInfoWindow(e) {
      var _this3 = this;

      var pos = e.lnglat;
      var markers = e.markers;
      this.markersDOM.innerHTML = '';
      if (markers && markers.length) {
        var length = markers.length;
        if (length > MAX_INFO_MARKERS) {
          markers = markers.slice(0, MAX_INFO_MARKERS);
        }
        markers.forEach(function (m) {
          var id = _this3.getMarkerData(m, 'id');
          var pointIndex = _this3.getMarkerData(m, 'pointIndex');
          var content = _this3.getMarkerData(m, 'content');
          var tmp = _this3.generateMarkerContent(_this3.getMarkerData(m, 'isSelected'), _this3.getMarkerData(m, 'isHover'), content);

          var tmpSpan = document.createElement('span');
          tmpSpan.className = 'amap_markers_pop_window_item map_marker_in_window_' + id;
          tmpSpan.setAttribute('markerId', id);
          tmpSpan.setAttribute('pointIndex', pointIndex);
          tmpSpan.innerHTML = tmp;

          tmpSpan.addEventListener('click', _this3.onWindowMarkerClick.bind(_this3, tmpSpan), true);
          tmpSpan.addEventListener('mouseover', _this3.onWindowMarkerHover.bind(_this3, tmpSpan), true);
          tmpSpan.addEventListener('mouseout', _this3.onWindowMarkerHoverOut.bind(_this3, tmpSpan), true);
          _this3.markersDOM.appendChild(tmpSpan);
        });
        if (length > MAX_INFO_MARKERS) {
          var warning = document.createElement('div');
          warning.className = 'amap_markers_window_overflow_warning';
          warning.innerText = '更多运单请放大地图查看';
          this.markersDOM.appendChild(warning);
        }
      }
      this.markersWindow.open(this.map, pos);
    }
  }, {
    key: 'buildMapMarkers',
    value: function buildMapMarkers(rawMarkerData) {
      var _this4 = this;

      this.clearPrevMarkers();
      this.markersCache = [];
      this.markerIDCache = [];
      if (rawMarkerData && rawMarkerData.length) {
        rawMarkerData.forEach(function (m, idx) {
          var content = 'content' in m ? m.content : '';
          var id = void 0;
          if ('id' in m) {
            id = m.id;
            if (_this4.markerIDCache.indexOf(id) !== -1) {
              (0, _error2.default)('MARKER_ID_CONFLICT');
            } else {
              _this4.markerIDCache.push(id);
            }
          } else {
            (0, _error2.default)('MARKER_ID_REQUIRED');
          }
          var marker = new window.AMap.Marker({
            position: [m.longitude, m.latitude],
            visible: true,
            offset: _this4.resetOffset,
            content: _this4.generateMarkerContent(!!m.isSelected, false, content),
            extData: {
              id: id,
              raw: m,
              content: content,
              isSelected: !!m.isSelected,
              isHover: false,
              pointIndex: idx
            }
          });
          marker.on('click', function (e) {
            _this4.onMarkerClick(e);
          });
          marker.on('mouseover', function (e) {
            _this4.onMarkerHover(e);
          });
          marker.on('mouseout', function (e) {
            _this4.onMarkerHoverOut(e);
          });
          _this4.markersCache.push(marker);
        });
      }
    }
  }, {
    key: 'clearPrevMarkers',
    value: function clearPrevMarkers() {
      this.markersCache.forEach(function (m) {
        m.setMap(null);
      });
      // TODO(slh) 要确认这个清除的范围
      if (this.useCluster && this.mapCluster) {
        this.mapCluster.clearMarkers();
      }
    }
  }, {
    key: 'generateMarkerContent',
    value: function generateMarkerContent(isSelected, isHover, content) {
      var img = void 0;
      var sizeWidth = void 0;
      var sizeHeight = void 0;
      if (isHover) {
        sizeWidth = SIZE_HOVER_WIDTH;
        sizeHeight = SIZE_HOVER_HEIGHT;
        if (isSelected) {
          img = _map_selected_emphsis2.default;
        } else {
          img = _map_wait_emphsis2.default;
        }
      } else {
        sizeWidth = SIZE_WIDTH;
        sizeHeight = SIZE_HEIGHT;
        if (isSelected) {
          img = _map_selected2.default;
        } else {
          img = _map_wait2.default;
        }
      }
      var styleString = ['display:inline-block', 'width:' + sizeWidth + 'px', 'height:' + sizeHeight + 'px', 'text-align:center', 'font-size:12px', 'background-size:100%', 'line-height:' + sizeHeight * 0.6 + 'px', 'color:#fff', 'background-image:url(' + img + ')', 'background-repeat: no-repeat', 'background-size: contain', 'user-select: none', 'text-shadow: 1px 1px 2px #000', 'pointer-events: none'];
      var iconHtml = '<span style="' + styleString.join(';') + '">' + content + '</span>';
      return iconHtml;
    }
  }, {
    key: 'renderMarkers',
    value: function renderMarkers() {
      var _this5 = this;

      if (this.useCluster) {
        if (this.markersCache.length < REFRESH_LIMIT) {
          this.markersCache.forEach(function (m) {
            return m.setMap(_this5.map);
          });
          this.map.setFitView();
          this.markersCache.forEach(function (m) {
            return m.setMap(null);
          });
        }
        this.mapCluster.setMarkers(this.markersCache);
      } else {
        this.markersCache.forEach(function (m) {
          return m.setMap(_this5.map);
        });
        this.map.setFitView();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Markers;
}(Component);

exports.default = Markers;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _isFun = __webpack_require__(1);

var _isFun2 = _interopRequireDefault(_isFun);

var _error = __webpack_require__(0);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 *
 * }
 */

var Component = _react2.default.Component;

var defaultOpts = {
  style: {
    strokeColor: '#00f',
    strokeOpacity: 0.4,
    strokeWeight: 4,
    fillColor: '#1791fc',
    fillOpacity: 0.65,
    strokeStyle: 'solid'
  }
};

var Polygon = function (_Component) {
  _inherits(Polygon, _Component);

  function Polygon(props) {
    _classCallCheck(this, Polygon);

    var _this = _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this, props));

    if (!props.__map__) {
      (0, _error2.default)('NO_MAP_INSTANCE', true);
    } else {
      _this.map = props.__map__;
      _this.element = props.__ele__;
      _this.prevPath = [];
      _this.polyEditable = false;
      _this.initMapPolygon(props);
    }
    return _this;
  }

  _createClass(Polygon, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      /*
       * {
       *  __map__,
       *  __ele__,
       *  path,<pos>
       *  onChange
       *  onClick
       *  onMouseOver
       *  onMouseOut
       * }
       */
      if (this.map) {
        if (this.setVisible(nextProps)) {
          this.setPath(nextProps);
          this.setEditable(nextProps);
          this.setStyle(nextProps);
        }
      }
    }
  }, {
    key: 'initMapPolygon',
    value: function initMapPolygon(props) {
      var _this2 = this;

      this.polygon = new window.AMap.Polygon({
        map: this.map,
        path: this.prevPath
      });
      this.polygon.on('click', function (e) {
        _this2.onPolygonClick(e);
      });
      this.polygon.on('mouseover', function (e) {
        _this2.onPolygonMouseOver(e);
      });
      this.polygon.on('mouseout', function (e) {
        _this2.onPolygonMouseOut(e);
      });

      if (this.setVisible(props)) {
        this.setPath(props);
        this.setEditable(props);
        this.setStyle(props);
      }
    }
  }, {
    key: 'setVisible',
    value: function setVisible(props) {
      var visible = true;
      if ('visible' in props && props.visible === false) {
        visible = false;
      }
      if (visible) {
        this.polygon.show();
      } else {
        this.polygon.hide();
      }
      return visible;
    }
  }, {
    key: 'setPath',
    value: function setPath(props) {
      if ('path' in props) {
        if (this.prevPath !== props.path) {
          this.buildPath(props.path);
          this.prevPath = props.path;
        }
      } else {
        this.clearPath();
      }
    }
  }, {
    key: 'setEditable',
    value: function setEditable(props) {
      this.toggleEditable(props.editable);
      // if ('editable' in props) {
      // }
    }
  }, {
    key: 'setStyle',
    value: function setStyle(props) {
      var style = void 0;
      if ('style' in props) {
        style = this.buildStyle(props.style);
      } else {
        style = defaultOpts.style;
      }
      this.polygon.setOptions(style);
    }
  }, {
    key: 'buildStyle',
    value: function buildStyle(styleOpts) {
      var keys = ['strokeColor', 'strokeOpacity', 'strokeWeight', 'fillColor', 'fillOpacity', 'strokeStyle', 'strokeDasharray'];
      var style = {};
      keys.forEach(function (key) {
        style[key] = key in styleOpts ? styleOpts[key] : defaultOpts.style[key];
      });
      return style;
    }
  }, {
    key: 'onPolygonClick',
    value: function onPolygonClick(e) {
      if ((0, _isFun2.default)(this.props.onClick)) {
        this.props.onClick(e);
      }
    }
  }, {
    key: 'onPolygonMouseOver',
    value: function onPolygonMouseOver(e) {
      if ((0, _isFun2.default)(this.props.onMouseOver)) {
        this.props.onMouseOver(e);
      }
    }
  }, {
    key: 'onPolygonMouseOut',
    value: function onPolygonMouseOut(e) {
      if ((0, _isFun2.default)(this.props.onMouseOut)) {
        this.props.onMouseOut(e);
      }
    }
  }, {
    key: 'onPolygonChange',
    value: function onPolygonChange(type) {
      if ((0, _isFun2.default)(this.props.onChange) && type !== 'end') {
        var path = this.polygon.getPath();
        var externalPath = [];
        if (path && path.length) {
          path.forEach(function (p) {
            externalPath.push({
              longitude: p.getLng(),
              latitude: p.getLat()
            });
          });
        }
        this.props.onChange(externalPath);
      }
    }
  }, {
    key: 'buildPath',
    value: function buildPath(path) {
      if (path && path.length) {
        var mapPath = [];
        path.forEach(function (p) {
          mapPath.push(new window.AMap.LngLat(p.longitude, p.latitude));
        });
        this.polygon.setPath(mapPath);
        this.setFitView();
      } else {
        this.clearPath();
      }
    }
  }, {
    key: 'clearPath',
    value: function clearPath() {
      this.polygon.setPath([]);
    }
  }, {
    key: 'setFitView',
    value: function setFitView() {
      this.map.setFitView();
    }
  }, {
    key: 'toggleEditable',
    value: function toggleEditable(editable) {
      if (editable) {
        if (!this.polyEditable) {
          this.activeEditable();
        }
      } else {
        if (this.polyEditable) {
          this.inactiveEditable();
        }
      }
    }
  }, {
    key: 'initEditorInstance',
    value: function initEditorInstance() {
      var _this3 = this;

      this.polyEditor = new window.AMap.PolyEditor(this.map, this.polygon);
      this.polyEditor.on('addnode', function () {
        _this3.onPolygonChange('addnode');
      });
      this.polyEditor.on('adjust', function () {
        _this3.onPolygonChange('adjust');
      });
      this.polyEditor.on('removenode', function () {
        _this3.onPolygonChange('removenode');
      });
      this.polyEditor.on('end', function () {
        _this3.onPolygonChange('end');
      });
      return this.polyEditor;
    }

    // PolyEditor 是需要额外加载的插件

  }, {
    key: 'loadPolyEditor',
    value: function loadPolyEditor() {
      var _this4 = this;

      if (this.polyEditor) {
        return new Promise(function (resolve) {
          resolve(_this4.polyEditor);
        });
      }
      return new Promise(function (resolve, reject) {
        _this4.map.plugin(['AMap.PolyEditor'], function () {
          resolve(_this4.initEditorInstance());
        });
      });
    }
  }, {
    key: 'activeEditable',
    value: function activeEditable() {
      var _this5 = this;

      this.loadPolyEditor().then(function (editor) {
        _this5.polyEditable = true;
        editor.open();
      });
    }
  }, {
    key: 'inactiveEditable',
    value: function inactiveEditable() {
      this.polyEditable = false;
      if (this.polyEditor) {
        this.polyEditor.close();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Polygon;
}(Component);

exports.default = Polygon;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _isFun = __webpack_require__(1);

var _isFun2 = _interopRequireDefault(_isFun);

var _error = __webpack_require__(0);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

var Component = _react2.default.Component;

var defaultOpts = {
  style: {
    isOutline: false,
    outlineColor: '#000',
    strokeColor: '#3366ff',
    strokeOpacity: 0.8,
    strokeWeight: 4,
    strokeStyle: 'solid',
    strokeDasharray: [0, 0, 0]
  }
};

var Polyline = function (_Component) {
  _inherits(Polyline, _Component);

  function Polyline(props) {
    _classCallCheck(this, Polyline);

    var _this = _possibleConstructorReturn(this, (Polyline.__proto__ || Object.getPrototypeOf(Polyline)).call(this, props));

    if (!props.__map__) {
      (0, _error2.default)('NO_MAP_INSTANCE', true);
    } else {
      _this.map = props.__map__;
      _this.element = props.__ele__;
      _this.prevPath = [];
      _this.lineEditable = false;
      _this.initMapPolyline(props);
    }
    return _this;
  }

  _createClass(Polyline, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      /*
       * {
       *  __map__,
       *  __ele__,
       *  path,<pos>
       *  onChange
       *  onClick
       *  onMouseOver
       *  onMouseOut
       * }
       */
      if (this.map) {
        if (this.setVisible(nextProps)) {
          this.setPath(nextProps);
          this.setEditable(nextProps);
          this.setStyle(nextProps);
        }
      }
    }
  }, {
    key: 'initMapPolyline',
    value: function initMapPolyline(props) {
      var _this2 = this;

      this.polyline = new window.AMap.Polyline({
        map: this.map,
        path: this.prevPath
      });
      this.polyline.on('click', function (e) {
        _this2.onPolylineClick(e);
      });
      this.polyline.on('mouseover', function (e) {
        _this2.onPolylineMouseOver(e);
      });
      this.polyline.on('mouseout', function (e) {
        _this2.onPolylineMouseOut(e);
      });
      if (this.setVisible(props)) {
        this.setPath(props);
        this.setEditable(props);
        this.setStyle(props);
      }
    }
  }, {
    key: 'setStyle',
    value: function setStyle(props) {
      var style = void 0;
      if ('style' in props) {
        style = this.buildStyle(props.style);
      } else {
        style = defaultOpts.style;
      }
      this.polyline.setOptions(style);
    }
  }, {
    key: 'buildStyle',
    value: function buildStyle(styleOpts) {
      var keys = ['isOutline', 'outlineColor', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'strokeStyle', 'strokeDasharray'];
      var style = {};
      keys.forEach(function (key) {
        style[key] = key in styleOpts ? styleOpts[key] : defaultOpts.style[key];
      });
      return style;
    }
  }, {
    key: 'setVisible',
    value: function setVisible(props) {
      var visible = true;
      if ('visible' in props && props.visible === false) {
        visible = false;
      }
      if (visible) {
        this.polyline.show();
      } else {
        this.polyline.hide();
      }
      return visible;
    }
  }, {
    key: 'setPath',
    value: function setPath(props) {
      if ('path' in props) {
        if (this.prevPath !== props.path) {
          this.buildPath(props.path);
          this.prevPath = props.path;
        }
      } else {
        this.clearPath();
      }
    }
  }, {
    key: 'setEditable',
    value: function setEditable(props) {
      var editable = false;
      if ('editable' in props && props.editable === true) {
        editable = true;
      }
      if (editable) {
        if (!this.lineEditable) {
          this.activeEditable();
        }
      } else {
        if (this.lineEditable) {
          this.inactiveEditable();
        }
      }
    }
  }, {
    key: 'onPolylineClick',
    value: function onPolylineClick(e) {
      if ((0, _isFun2.default)(this.props.onClick)) {
        this.props.onClick(e);
      }
    }
  }, {
    key: 'onPolylineMouseOver',
    value: function onPolylineMouseOver(e) {
      if ((0, _isFun2.default)(this.props.onMouseOver)) {
        this.props.onMouseOver(e);
      }
    }
  }, {
    key: 'onPolylineMouseOut',
    value: function onPolylineMouseOut(e) {
      if ((0, _isFun2.default)(this.props.onMouseOut)) {
        this.props.onMouseOut(e);
      }
    }
  }, {
    key: 'onPolylineChange',
    value: function onPolylineChange(type) {
      if ((0, _isFun2.default)(this.props.onChange) && type !== 'end') {
        var path = this.polyline.getPath();
        var externalPath = [];
        if (path && path.length) {
          path.forEach(function (p) {
            externalPath.push({
              longitude: p.getLng(),
              latitude: p.getLat()
            });
          });
        }
        this.props.onChange(externalPath);
      }
    }
  }, {
    key: 'buildPath',
    value: function buildPath(path) {
      if (path && path.length) {
        var mapPath = [];
        path.forEach(function (p) {
          mapPath.push(new window.AMap.LngLat(p.longitude, p.latitude));
        });
        this.polyline.setPath(mapPath);
        this.setFitView();
      } else {
        this.clearPath();
      }
    }
  }, {
    key: 'clearPath',
    value: function clearPath() {
      this.polyline.setPath([]);
    }
  }, {
    key: 'setFitView',
    value: function setFitView() {
      this.map.setFitView();
    }
  }, {
    key: 'initEditorInstance',
    value: function initEditorInstance() {
      var _this3 = this;

      this.polyEditor = new window.AMap.PolyEditor(this.map, this.polyline);
      this.polyEditor.on('addnode', function () {
        _this3.onPolylineChange('addnode');
      });
      this.polyEditor.on('adjust', function () {
        _this3.onPolylineChange('adjust');
      });
      this.polyEditor.on('removenode', function () {
        _this3.onPolylineChange('removenode');
      });
      this.polyEditor.on('end', function () {
        _this3.onPolylineChange('end');
      });
      return this.polyEditor;
    }

    // PolyEditor 是需要额外加载的插件

  }, {
    key: 'loadPolyEditor',
    value: function loadPolyEditor() {
      var _this4 = this;

      if (this.polyEditor) {
        return new Promise(function (resolve) {
          resolve(_this4.polyEditor);
        });
      }
      return new Promise(function (resolve, reject) {
        _this4.map.plugin(['AMap.PolyEditor'], function () {
          resolve(_this4.initEditorInstance());
        });
      });
    }
  }, {
    key: 'activeEditable',
    value: function activeEditable() {
      var _this5 = this;

      this.loadPolyEditor().then(function (editor) {
        _this5.lineEditable = true;
        editor.open();
      });
    }
  }, {
    key: 'inactiveEditable',
    value: function inactiveEditable() {
      this.lineEditable = false;
      if (this.polyEditor) {
        this.polyEditor.close();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Polyline;
}(Component);

exports.default = Polyline;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_CONFIG = {
  v: 1.3,
  protocol: window.location.protocol || 'https:',
  hostAndPath: 'webapi.amap.com/maps',
  key: 'f97efc35164149d0c0f299e7a8adb3d2',
  plugin: ['AMap.MarkerClusterer'],
  callback: '__amap_init_callback'
};

var __script_loaded = false;
var _queueEvents = [];

var APILoader = function () {
  function APILoader() {
    _classCallCheck(this, APILoader);

    this.config = DEFAULT_CONFIG;
  }

  _createClass(APILoader, [{
    key: 'getScriptSrc',
    value: function getScriptSrc(cfg) {
      var scriptSrc = cfg.protocol + '//' + cfg.hostAndPath + '?v=' + cfg.v + '&key=' + cfg.key + '&callback=' + cfg.callback;
      if (cfg.plugin.length) scriptSrc += '&plugin=' + cfg.plugin.join(',');
      return scriptSrc;
    }
  }, {
    key: 'load',
    value: function load() {
      var _config = this.config;
      /*
       * 初次加载同步加载插件；
       * 后面再加载的时候，要确保所依赖的插件也全部异步加载成功
       */
      if (window.AMap) {
        // 要确保所有的插件加载成功
        if (_config.plugin && _config.plugin.length) {
          var promiseArr = [];
          _config.plugin.forEach(function (p) {
            var pro = new Promise(function (resolve) {
              window.AMap.plugin(p, function () {
                resolve();
              });
            });
            promiseArr.push(pro);
          });
          return Promise.all(promiseArr);
        }
        return Promise.resolve();
      }

      if (__script_loaded) {
        return new Promise(function (resolve) {
          _queueEvents.push(function () {
            resolve();
          });
        });
      }
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = this.getScriptSrc(_config);

      var scriptLoadingPromise = new Promise(function (resolve, reject) {
        window[_config.callback] = function () {
          _queueEvents.forEach(function (event) {
            return event();
          });
          resolve();
        };
        script.onerror = function (error) {
          return reject(error);
        };
      });
      document.head.appendChild(script);
      __script_loaded = true;
      return scriptLoadingPromise;
    }
  }]);

  return APILoader;
}();

exports.default = APILoader;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)();
// imports


// module
exports.push([module.i, ".amap_markers_pop_window{\n    padding: 10px;\n    border: 1px solid #ddd;\n    border-radius: 8px;\n    background: #fff;\n    position: relative;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: flex-start;\n}\n.amap_markers_pop_window::before{\n    content: ' ';\n    display: block;\n    position: absolute;\n    bottom: -12px;\n    left: 50%;\n    margin-left: -7px;\n    width: 0;\n    height: 0;\n    border-top: 12px solid #ddd;\n    border-left: 7px solid transparent;\n    border-right: 7px solid transparent;\n}\n.amap_markers_pop_window::after{\n    content: ' ';\n    display: block;\n    position: absolute;\n    bottom: -11px;\n    left: 50%;\n    margin-left: -6px;\n    width: 0;\n    height: 0;\n    border-top: 11px solid #fff;\n    border-left: 6px solid transparent;\n    border-right: 6px solid transparent;\n}\n.amap_markers_pop_window_item{\n    cursor:pointer;\n    width: 40px;\n    height: 50px;\n    display: flex;\n    align-items: flex-end;\n    justify-content: center;\n}\n.amap_markers_pop_window_item span{\n    pointer-events: none;\n}\n.amap_markers_window_overflow_warning{\n    text-align: center;\n    width: 100%;\n    margin: 5px 0;\n    color: #666;\n}", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(14)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./marker.css", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./marker.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAuCAMAAAB+ruu2AAAAvVBMVEUAAACMkJuLkporZ8WLkpssaMYrZ8aOkpuOkpyPlJ2OlZ0sZ8YrZ8YraMYsZ8YsaMYsaMaMkpqKkZstaMkva8cuaseUlKE1bso6dNGLoqJJbdtNmv80a8ErZ8UsaMaKkZ0saMctacYuacgsZ8YvacRziKUsaMaMkposaMeKkZssacYsZ8aLkposaMcsaMctacYtZ8guackyasY4bcAraMZqg6oraMZ9jKE5bL80bME6b8F+i6OIkJ4sasgrZ8UWMVv0AAAAPnRSTlMARbT4pvXsPTUqId7Ux/uciltKLyAbExALCwcD89m7b2ZVN+jPwsCvp6Shl5ORe1pKPCTo4Mi9vLiXfHdHRu2KnrAAAAFDSURBVDjLjZPpcoIwFIUPRBCQKq6AuNd9r923vP9jNY4oTS/c6feHCecjORkSZHSPm3nfsvrzzbELSrtmyRtWrQ2dKBBSQwTR77w1lYRpK8sntszBnty+v+TUSOcIfVmAH+LMThayg+JULRaqJyUsJcMSiAQniAhjyTLGmhfWuOOFO1R4oQLBCwI2L9jwecHHgBcG2PPCHk1eaILfZx/AiBMOSkiYKfwEiu/CXKSnMigSRriQvOTnNVwJn3J/ZBc3mhbN77Xbd6Dn9QEaAS2okwxoQZ2wUlCQFk0LUsZ6QUr8fhU+YlA6jvGVXoE3w3A6f3PXMIzGZ++cPw4bauDquade1UvmTEhpvZqluhp6mlBWb0qmaT73ejP1KKlhOUe4kAl0iZR0CVpyuF0tFqttWpJuM+O8TUrsuY7qUnZcL8b/+QEqj9Qe9dgWJAAAAABJRU5ErkJggg=="

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAABCCAMAAAAfURQkAAAA21BMVEUAAACMkJuLkpqPj6AraMU2cs8rZ8UsZ8YraMaQk50wbcwsZ8g9ddAraMYsZ8WLkpuLkZxShN+ioqIrZ8YsaMUsaMYta8craMYsZ8YsZ8aEj58sZ8ctaMeMkpwsaciPk5uNkZ2OkpyNkp2QkJuQmKAraMYsZ8YrZ8csZ8csacYsaceIj58sasc4bcAsaMU/cL1qhKoraMWLk5uKkpsrZ8aKkpuLkZuMkJtmgq+MkpotacaRkZsrZ8mLkJuNlJovasiLlJ02a8lFc7pTebRHc7oraMZXerRTebUrZ8VuqpGWAAAASHRSTlMARbQL2A7y8KohGVAI5cqOcwUF+uJ/J9HBubieZWVcQDo2MBcQ9LOJhHhqSUfy6urIsa6kmYWCel5bWjMvLiYeHBPl2aaTjHjHjfEPAAAB60lEQVRIx5WU13bCMAxAFWcnkDBSSssqo1AK3Ys9Ov3/X1QfuxSCE8e+T7F8jyJZx4ZjiuOBUzUsy6g6g3ERhOSajoUPsJxmLlUu1vOYI19P+YVv4EQMPyl1DadS4yryAiwg8OL2Io+F5Bex3NQW+gf5cwHOJNjX72AJnJ3dxFI0/0qJ5PSIlTPEkgyBsLVldXtL9GsszTXRz+T1MwCzLK+XTZhhBWbwrKI/Q1VFr0Kkokdgq+g2lFX0Mtyq6LdwqqKf0qEqjLWmotegrqLXwVPRPVDpNQCAK3n9hOhr6UFdekD4ktWv2BN2KWfbJlAGsjeVUQyUXjFY29m2YcI/fqZtVWCHzOH7EKOfNaA4piGy+3BMxRK2yeEL2+Q5EbbJ8yDXprjdPqRRsUVt8ow5266AgCHfphCHa1OIGbvpD2K5tOlMDqYbjTqbUrrttjRN+9lf5QlZttwUWb/QKJ87/ZutL/REu0U3C0/ondkf6KlAQ60kv023QoTQ+Q0m3CFCSINt3u6x3ERh/t05/WT5e5zepfEXxPz7e8R4oeEuXzqNN9ARDRpOKL5DN97i9hsNdpJGxM5xGj7u3Mdwyk6yBEn+UqOMGoXXMHwtNEZsvUwbbG+uccx7kI7utg/dtqtDFnrXdVcr1+1yqjK/IID+J6BDfkIAAAAASUVORK5CYII="

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAuCAMAAAB+ruu2AAAAvVBMVEUAAACMkJuLkprzPj6LkpvzPT3zPT3yPT3zPj6OkpuPlJ3/R0fyPj7/SEjzPT3zPT3zPj6MkpqKkZuOkpz1QECPlp72QUGUlKGLoqLyPT2OkZrzPz/2Pz/rQ0ToRUXzPj6lfYSMkprzPT3zPj6LkprzPj7zPj7zPj70Pj71Pj7yPz+Ok534QED3Pj6MlJz3QkL5QUHlSUrqRUbyPj6vdXryPT2bhY3jSEnpRUXkSkych5DzPz+QjJf0Pj7yPT2cvNJeAAAAPnRSTlMARbT4ptPs3549Kgz0BsK7iltKNi8iGxML2W9VN/fy6MKvp5eTkXtkWko8NCQhHx8T6MvJyMi8uJd8d2lHRlhUvfoAAAE+SURBVDjLjZPZkoIwEEUbwr6rqCDquC/jNvs++f/PmlgQmRjS5Xmhknuq+nYBUBNu51EeBHk034Yg03MCeiFweiDiJ4QKkMT/n59MKmGe6nxo0QasIc8PZS4bh2q+SRWYZY8lVbIExp6oBbJnwowizFgDggnEh4KiFODgggMRLkRg44INBBcIWLhggYkLJsS4EMMKF1aQ4kIK+J45AKwxYcOE0MZ2OPOrzEn1VSYqYQ0VsepNch4aa7yGcCElcn4n/H0bueA9zxRFv+GKWFFQUfQ5BIk0EAvKFGJBmeyDC58ZyPQ72s9Tmb9rWqd/nXuaprW/xuf8cdBmB0/Mu+yqZegTQunoTTda7NgVBJfdGLquv4zGE/Yw2NFtEDhckEeU8BFyycHCmE6NBS8prVnD1xTJjt6OdXF33jGD2/kDOZnS0lToKQcAAAAASUVORK5CYII="

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAABCCAMAAAAfURQkAAAA3lBMVEUAAACMkJuLkpqPj6CtnZ3yPT3yPj7zPT32QkL/RkaOkpyOkZyPk53/Tk7zPT3zPT3yPj7zPT30Pz/zPT2OkZzzPj70QED/UFDzPT3zPT3zPj7zPT3zPT2Mk5yLkpvzPT3zPT2MkpyMkpzzPz+Pk5uQmKCSjZXzPj7yPj7mR0nzPT3YU1XzPj7zPT2Lk5uKkpuLkpuMkJuKkZzzPT2MkprzPT30Pj70QUGNlJr/Q0PeTlDtQEHIYGSwc3mteH2chY3UVlnzPj7HYmjKYGTzPz+2bXW2c3uhg433QEDyPT1sp1LSAAAASXRSTlMARbQLBPPw2BkOODAhCPrlypxbThiyJwXi0bmsqY2Eg39xZWVAELeJePLq58HArqSRenZoW1NGLyYT6+LZyca8ppOMeG5iW0wg/pd3vwAAAeZJREFUSMellOeWmzAQhS+iG2xjL+5ld92zvZf0nuj9XyisFLLYAnl08v2C4TvD3BEH7NJ7WI/Pfdf1z8frhx601Ntjlxdwx+16pezMm1yhOa94xb3PS/HvodJr8UpaykRBwjUkwbb92ORamo9bvYWt9Qv96wnfS/I6/4gTGOV2m5No/x2lT9P7cpwNJ7JBxrNH1b3nTL/lZG4zfUjXh0DYoOuNMN8idZctE72FMxP9DH0TvQ/PRPfQMNEbODHRTzAw0QcYmuhD073PTfQ5AhM9gEnWBMAhXT/K9IB8UG6AjC9U/RAwaO+FEKxp+ndIeonRXwy/CV+xH+IfB/u30kUOZfkHKOJ0CDssEPo6u4Ndui4lJiGuiKlypI2p0qn8DiWkuB1U0fV0MSlxvS40bNSYWkZKTC3hgBRT4qTRz0Lcd7+i1Km244VlWd9eT/NHdruIK2S7Zgk+5/pXeV+zS+2FeHh8yU6l/Z5dHovSosyXva8YY6s3L/Ypy7iS/VV7KXuzFz5l/tuVuJT9l4qeivqUCVYfPjLJVJRTdXRRn7EdZqJcMnwkHlxv29eiGEHFkVnvJhe5ezG5k0kdlPmRJZndTCeT6c3MkkRVB7uMLIVoiWrsuFZ0a7GNPTh2GsdPT3Gc2g7+kz9nhANFEL9hVAAAAABJRU5ErkJggg=="

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(4);

var _APILoader = __webpack_require__(11);

var _APILoader2 = _interopRequireDefault(_APILoader);

var _isFun = __webpack_require__(1);

var _isFun2 = _interopRequireDefault(_isFun);

var _bindEvent = __webpack_require__(3);

var _bindEvent2 = _interopRequireDefault(_bindEvent);

var _Markers = __webpack_require__(8);

var _Markers2 = _interopRequireDefault(_Markers);

var _Polygon = __webpack_require__(9);

var _Polygon2 = _interopRequireDefault(_Polygon);

var _Polyline = __webpack_require__(10);

var _Polyline2 = _interopRequireDefault(_Polyline);

var _InfoWindow = __webpack_require__(7);

var _InfoWindow2 = _interopRequireDefault(_InfoWindow);

var _Circle = __webpack_require__(5);

var _Circle2 = _interopRequireDefault(_Circle);

var _GroundImage = __webpack_require__(6);

var _GroundImage2 = _interopRequireDefault(_GroundImage);

var _error = __webpack_require__(0);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * props
 * {
 *  onInit(func),
 *  center,
 *  zoom
 * }
 */

var Component = _react2.default.Component;
var Children = _react2.default.Children;
var ComponentList = [_Circle2.default, _GroundImage2.default, _InfoWindow2.default, _Markers2.default, _Polyline2.default, _Polygon2.default];

var defaultOpts = {
  maptype: {
    showRoad: false,
    showTraffic: false,
    defaultType: 0
  },
  toolbar: {
    position: 'RB',
    noIpLocate: true,
    locate: true,
    liteStyle: true,
    autoPosition: false
  },
  overview: {}
};

var AMap = function (_Component) {
  _inherits(AMap, _Component);

  function AMap() {
    _classCallCheck(this, AMap);

    var _this = _possibleConstructorReturn(this, (AMap.__proto__ || Object.getPrototypeOf(AMap)).call(this));

    _this.state = {
      mapLoaded: false
    };
    _this.pluginMap = {};
    _this.prevCenter = undefined;
    _this.prevZoom = undefined;
    _this.loader = new _APILoader2.default().load();
    return _this;
  }

  _createClass(AMap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      this.loader.then(function () {
        if (_this2.map) {
          _this2.setZoomAndCenter(nextProps);
          _this2.setPlugins(nextProps);
        }
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadMap();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.loadMap();
    }
  }, {
    key: 'loadMap',
    value: function loadMap() {
      var _this3 = this;

      this.loader.then(function () {
        _this3.initMapInstance();
        if (!_this3.state.mapLoaded) {
          _this3.setState({
            mapLoaded: true
          });
        }
      });
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this4 = this;

      return Children.map(this.props.children, function (child) {
        if (ComponentList.indexOf(child.type) === -1) {
          return child;
        }
        return _react2.default.cloneElement(child, {
          __map__: _this4.map,
          __ele__: _this4.mapWrapper
        });
      });
    }
  }, {
    key: 'initMapInstance',
    value: function initMapInstance() {
      if (!this.map) {
        var opts = {
          showIndoorMap: false
        };
        if ('zoom' in this.props) {
          opts.zoom = this.props.zoom;
          this.prevZoom = opts.zoom;
        }
        if ('center' in this.props) {
          opts.center = new window.AMap.LngLat(this.props.center.longitude, this.props.center.latitude);
          this.prevCenter = opts.center;
        }
        this.map = new window.AMap.Map(this.mapWrapper, opts);

        var eventList = ['Complete', 'Click', 'DblClick', 'MapMove', 'MoveStart', 'MoveEnd', 'ZoomChange', 'ZoomStart', 'ZoomEnd'];
        (0, _bindEvent2.default)(this.map, eventList, this);
        this.liftMapInstance();
        this.setPlugins(this.props);
      }
    }
  }, {
    key: 'setZoomAndCenter',
    value: function setZoomAndCenter(props) {
      if (this.prevCenter === props.center && this.prevZoom === props.zoom) {
        // do nothing
      } else {
        this.prevCenter = props.center;
        this.prevZoom = props.zoom;
        var zoomChange = false,
            centerChange = false,
            newCenter = void 0;
        if ('zoom' in props) {
          if (props.zoom !== this.map.getZoom()) {
            zoomChange = true;
          }
        }

        if ('center' in props) {
          newCenter = new window.AMap.LngLat(props.center.longitude, props.center.latitude);
          if (!newCenter.equals(this.map.getCenter())) {
            centerChange = true;
          }
        }
        if (zoomChange) {
          if (centerChange) {
            this.map.setZoomAndCenter(props.zoom, newCenter);
          } else {
            this.map.setZoom(props.zoom);
          }
        } else {
          if (centerChange) {
            this.map.setCenter(newCenter);
          }
        }
      }
    }
  }, {
    key: 'setPlugins',
    value: function setPlugins(props) {
      var _this5 = this;

      var pluginList = ['scale', 'toolbar', 'maptype', 'overview'];
      if ('plugins' in props) {
        var plugins = props.plugins;
        if (plugins && plugins.length) {
          plugins.forEach(function (p) {
            var name = void 0,
                config = void 0,
                visible = void 0;
            if (typeof p === 'string') {
              name = p;
              config = null;
              visible = true;
            } else {
              name = p.name;
              config = p.options;
              visible = !!p.visible;
            }
            var idx = pluginList.indexOf(name);
            if (idx === -1) {
              (0, _error2.default)('INVALID_AMAP_PLUGIN');
            } else {
              if (visible) {
                pluginList.splice(idx, 1);
                _this5.installPlugin(name, config);
              }
            }
          });
        }
      }
      this.removeOrDisablePlugins(pluginList);
    }
  }, {
    key: 'removeOrDisablePlugins',
    value: function removeOrDisablePlugins(plugins) {
      var _this6 = this;

      if (plugins && plugins.length) {
        plugins.forEach(function (p) {
          if (p in _this6.pluginMap) {
            _this6.pluginMap[p].hide();
          }
        });
      }
    }
  }, {
    key: 'installPlugin',
    value: function installPlugin(name, opts) {
      switch (name) {
        case 'scale':
          this.setScalePlugin(opts);
          break;
        case 'toolbar':
          this.setToolbarPlugin(opts);
          break;
        case 'overview':
          this.setOverviewPlugin(opts);
          break;
        case 'maptype':
          this.setMapTypePlugin(opts);
          break;
        default:
        // do nothing
      }
    }
  }, {
    key: 'setMapTypePlugin',
    value: function setMapTypePlugin(opts) {
      var _this7 = this;

      if (this.pluginMap['maptype']) {
        this.pluginMap.maptype.show();
      } else {
        var initOpts = opts || defaultOpts.maptype;
        this.map.plugin(['AMap.MapType'], function () {
          _this7.pluginMap.maptype = new window.AMap.MapType(initOpts);
          _this7.map.addControl(_this7.pluginMap.maptype);
        });
      }
    }
  }, {
    key: 'setOverviewPlugin',
    value: function setOverviewPlugin(opts) {
      var _this8 = this;

      if (this.pluginMap['overview']) {
        this.pluginMap.overview.show();
      } else {
        var initOpts = opts || defaultOpts.overview;
        this.map.plugin(['AMap.OverView'], function () {
          _this8.pluginMap.overview = new window.AMap.OverView(initOpts);
          _this8.map.addControl(_this8.pluginMap.overview);
        });
      }
    }
  }, {
    key: 'setScalePlugin',
    value: function setScalePlugin() {
      var _this9 = this;

      if (this.pluginMap['scale']) {
        this.pluginMap.scale.show();
      } else {
        this.map.plugin(['AMap.Scale'], function () {
          _this9.pluginMap.scale = new window.AMap.Scale();
          _this9.map.addControl(_this9.pluginMap.scale);
        });
      }
    }
  }, {
    key: 'setToolbarPlugin',
    value: function setToolbarPlugin(opts) {
      var _this10 = this;

      if (this.pluginMap['toolbar']) {
        this.pluginMap.toolbar.show();
      } else {
        var initOpts = opts || defaultOpts.toolbar;
        this.map.plugin(['AMap.ToolBar'], function () {
          _this10.pluginMap.toolbar = new window.AMap.ToolBar(initOpts);
          _this10.map.addControl(_this10.pluginMap.toolbar);
        });
      }
    }

    // 用户可以通过 onInit 事件获取 map 实例

  }, {
    key: 'liftMapInstance',
    value: function liftMapInstance() {
      if ((0, _isFun2.default)(this.props.onInit)) {
        this.props.onInit(this.map);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this11 = this;

      return _react2.default.createElement(
        'div',
        { style: { width: '100%', height: '100%', position: 'relative' } },
        _react2.default.createElement(
          'div',
          { ref: function ref(div) {
              _this11.mapWrapper = div;
            }, style: { width: '100%', height: '100%' } },
          _react2.default.createElement('div', { style: { background: '#eee', width: '100%', height: '100%' } })
        ),
        _react2.default.createElement(
          'div',
          { style: { position: 'absolute', top: 0, left: 0 } },
          this.state.mapLoaded ? this.renderChildren() : null
        )
      );
    }
  }]);

  return AMap;
}(Component);

AMap.Markers = _Markers2.default;
AMap.Polygon = _Polygon2.default;
AMap.Polyline = _Polyline2.default;
AMap.InfoWindow = _InfoWindow2.default;
AMap.Circle = _Circle2.default;
AMap.GroundImage = _GroundImage2.default;

exports.default = AMap;

/***/ })
/******/ ]);
});