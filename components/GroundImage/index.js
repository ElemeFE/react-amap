import React from 'react';
import error from '../../lib/utils/error';
import isFun from '../../lib/utils/isFun';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */
const Component = React.Component;
const defaultOpts = {
  clickable: false,
  opacity: 1,
  visible: true,
};

class GroundImage extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      error('NO_MAP_INSTANCE', true);
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.circleEditable = false;
      this.initGroundImage(props);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.setVisible(nextProps)) {
      if (
        // 高德提供的 GroundImage 不支持动态刷新 bounds 和 src；
      // 检测到这两个属性变化后，需要删除当前实例，并重新创建实例
      this.checkBoundsChange(nextProps) ||
      (nextProps.src !== this.image.getImageUrl())
      ) {
        this.image.setMap(null);
        delete this.image;
        this.initGroundImage(nextProps);
      } else {
        this.setOpacity(nextProps);
      }
    }
  }
  
  initGroundImage(props) {
    let src, bounds, opacity, clickable;
    if ('src' in props) {
      src = props.src;
    } else {
      error('SRC_REQUIRED', true);
    }
    if ('bounds' in props) {
      bounds = this.buildBounds(props);
    } else {
      error('BOUNDS_REQUIRED', true);
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
      clickable,
      opacity,
    });
    
    const events = this.exopseImageInstance(props);
    events && this.bindEvents(events);
  }
  
  exopseImageInstance(props) {
    if ('events' in props) {
      const events = props.events || {};
      if (isFun(events.created)) {
        events.created(this.image);
      }
      delete events.created;
      return events;
    }
    return false;
  }
  
  bindEvents(events) {
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      this.image.on(evName, events[evName]);
    })
  }
  
  checkBoundsChange(nextProps) {
    let changed = true;
    const nextBounds = this.buildBounds(nextProps);
    const curBounds = this.image.getBounds();
    if (
      curBounds.getNorthEast().equals(nextBounds.getNorthEast()) &&
      curBounds.getSouthWest().equals(nextBounds.getSouthWest())
    ) {
      changed = false;
    }
    return changed;
  }
  
  
  buildBounds(props) {
    const rawBounds = props.bounds;
    const bounds = new window.AMap.Bounds(
      new window.AMap.LngLat(rawBounds.sw.longitude, rawBounds.sw.latitude),
      new window.AMap.LngLat(rawBounds.ne.longitude, rawBounds.ne.latitude)
    );
    return bounds;
  }
  
  setOpacity(props) {
    let opacity = defaultOpts.opacity;
    if ('opacity' in props) {
      opacity = props.opacity;
    }
    if (opacity !== this.image.getOpacity()) {
      this.image.setOpacity(opacity);
    }
  }
  
  setVisible(props) {
    let visible = defaultOpts.visible;
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
  
  render() {
    return (null);
  }
}

export default GroundImage;
