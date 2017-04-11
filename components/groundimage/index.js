// @flow
import React from 'react';
import isFun from '../../lib/utils/isFun';
import log from '../../lib/utils/log';
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
  visible: true
};

const configurableProps = [
  'opacity',
  'src',
  'bounds',

  /* 扩展属性 */
  'visible'
];

const allProps = configurableProps.concat([
  'clickable'
]);

type GIProps = {
  __map__: Object,
  __ele__: HTMLElement,
  opacity?: number,
  src?: string,
  bounds: Object,
  visible?: boolean,
  clickable?: boolean,
  events?: Object
};

class GroundImage extends Component {

  map: Object;
  element: HTMLElement;
  image: Object;

  constructor(props: GIProps) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        log.warning('MAP_INSTANCE_REQUIRED');
      } else {
        this.map = props.__map__;
        this.element = props.__ele__;
        this.createGroundImage(props);
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps: GIProps) {
    if (this.map) {
      this.refreshGroundImage(nextProps);
    }
  }

  refreshGroundImage(nextProps: GIProps) {
    configurableProps.forEach((key) => {
      if (key in nextProps) {
        if (this.checkPropsChanged(nextProps, key)) {
          if (key === 'visible') {
            this.setVisible(nextProps);
          } else if (key === 'opacity') {
            this.setOpacity(nextProps);
          } else if (key === 'src') {
            this.setImageUrl(nextProps);
          } else if (key === 'bounds') {
            this.setBounds(nextProps);
          }
        }
      }
    });
  }

  setBounds(nextProps: GIProps) {
    // 这个接口高德并未在文档中明确写出来，不确定后面会不会取消
    if ('setBounds' in this.image) {
      this.image.setBounds(this.buildBounds(nextProps));
    }
  }

  setImageUrl(nextProps: GIProps) {
    // 这个接口高德并未在文档中明确写出来，不确定后面会不会取消
    if ('setImageUrl' in this.image) {
      this.image.setImageUrl(nextProps.src);
    }
  }

  setVisible(nextProps: GIProps) {
    // 这个接口高德并未在文档中明确写出来，不确定后面会不会取消
    if ('show' in this.image) {
      if (nextProps.visible) {
        this.image.show();
      } else {
        this.image.hide();
      }
    }
  }

  setOpacity(nextProps: GIProps) {
    this.image.setOpacity(nextProps.opacity);
  }

  checkPropsChanged(nextProps: GIProps, key: string) {
    // if (key === 'bounds') {
    //   return this.checkBoundsChange(nextProps);
    // }
    return this.props[key] !== nextProps[key];
  }

  createGroundImage(props: GIProps) {
    let src, bounds, opacity, clickable;
    if ('src' in props) {
      src = props.src;
    } else {
      log.warning('SRC_REQUIRED', true);
    }
    if ('bounds' in props) {
      bounds = this.buildBounds(props);
    } else {
      log.warning('BOUNDS_REQUIRED', true);
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
      opacity
    });
    const events = this.exopseImageInstance(props);
    events && this.bindEvents(events);
  }

  exopseImageInstance(props: GIProps) {
    if ('events' in props) {
      const events = props.events || {};
      if (isFun(events.created)) {
        events.created(this.image);
      }
      return events;
    }
    return false;
  }

  bindEvents(events: Object) {
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      if (evName !== 'created') {
        this.image.on(evName, events[evName]);
      }
    });
  }

  // checkBoundsChange(nextProps) {
  //   let changed = true;
  //   const nextBounds = this.buildBounds(nextProps);
  //   const curBounds = this.image.getBounds();
  //   if (
  //     curBounds.getNorthEast().equals(nextBounds.getNorthEast()) &&
  //     curBounds.getSouthWest().equals(nextBounds.getSouthWest())
  //   ) {
  //     changed = false;
  //   }
  //   return changed;
  // }

  buildBounds(props: GIProps) {
    const rawBounds = props.bounds;
    if (!rawBounds) {
      return rawBounds;
    }
    if ('getSouthWest' in rawBounds) {
      return rawBounds;
    }
    const bounds = new window.AMap.Bounds(
      new window.AMap.LngLat(rawBounds.sw.longitude, rawBounds.sw.latitude),
      new window.AMap.LngLat(rawBounds.ne.longitude, rawBounds.ne.latitude)
    );
    return bounds;
  }

  render() {
    return (null);
  }
}

export default GroundImage;
