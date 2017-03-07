import React from 'react';
import { findDOMNode, render } from 'react-dom';
import isFun from '../../lib/utils/isFun';
import error from '../../lib/utils/error';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

const Component = React.Component;
const Children = React.Children;

const defaultOpts = {
  offset: [0, -30],
  closeWhenClickMap: false,
};

class InfoWindow extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      error('NO_MAP_INSTANCE', true);
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.isCustom = true;
      this.createInfoWindow(props);
    }
  }
  
  componentDidMount() {
    this.drawWindow(this.props);
  }
  
  createInfoWindow(props) {
    let opts = {};
    if ('createOptions' in props) {
      opts = props.createOptions;
    }
    if ('isCustom' in opts) {
      this.isCustom = opts.isCustom;
    } else {
      opts.isCustom = true;
    }
    if (this.isCustom) {
      let content;
      if ('content' in opts) {
        // TODO(slh)
        console.warn('更推荐不定义 content（默认），组件内部的实现可以直接以 JSX 语法写窗体内容。')
      } else {
        this.infoDOM = document.createElement('div');
        opts.content = this.infoDOM;
      }
      opts.offset = 'offset' in props ? props.offset : this.getOffset(defaultOpts.offset);
    } else {
      // TODO(slh)
      console.warn('更推荐设置 isCustom 为 true（默认）可以直接以 JSX 语法写窗体内容。')
    }
    this.infoWindow = new window.AMap.InfoWindow(opts);
  
    const events = this.exposeWindowInstance(props);
    events && this.bindWindowEvents(events);
  }
  
  exposeWindowInstance(props) {
    if ('events' in props) {
      const events = props.events || {};
      if (isFun(events.created)) {
        events.created(this.infoWindow);
      }
      delete events.created;
      return events;
    }
    return false;
  }
  
  bindWindowEvents(events) {
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      this.infoWindow.on(evName, events[evName]);
    });
  }
  
  getOffset(os) {
    return new window.AMap.Pixel(os[0], os[1]);
  }
  
  componentWillReceiveProps(nextProps) {
    /*
     * {
     *  __map__,
     *  __ele__,
     * }
     */
    this.drawWindow(nextProps);
  }
  
  drawWindow(props) {
    // 刷新开启关闭状态
    if (this.setOpen(props)) {
      this.setClassName(props);
      this.setChild(props);
    }
  }
  
  setChild(props) {
    if (this.infoDOM) {
      const child = props.children;
      if (Children.count(child) === 1) {
        render(child, this.infoDOM);
      } else {
        render(<div>{props.children}</div>, this.infoDOM);
      }
    } else {
      if (props.children) {
        console.warn('InfoWindow 的 Children 被忽略');
      }
    }
  }
  
  setClassName(props) {
    if (this.infoDOM) {
      // 刷新 className
      let cls = 'amap_markers_pop_window';
      if ('className' in props) {
        cls = `amap_markers_pop_window ${props.className}`;
      }
      this.infoDOM.className = cls;
    }
  }
  
  setOpen(props) {
    let open = true;
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
  
  showInfoWindow(props) {
    if ('position' in props) {
      const { position } = props;
      this.showPos = new window.AMap.LngLat(position.longitude, position.latitude);
      const prevOpen = this.infoWindow.getIsOpen();
      let needRefresh = true;
      // 如果之前窗口已经是开启状态
      // 检测一下新属性的位置是否改变，如果没有改变，不需要调用 open 方法
      if (prevOpen) {
        const prevPosition = this.infoWindow.getPosition();
        if (prevPosition.equals(this.showPos)) {
          needRefresh = false;
        }
      }
      if (needRefresh) {
        this.infoWindow.open(this.map, this.showPos);
      }
    }
  }
  
  render() {
    return (null);
  }
}

export default InfoWindow;
