// @flow
import React from 'react'
import withPropsReactive from '../utils/withPropsReactive'
import log from '../utils/log'
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */
const defaultOpts = {
  clickable: false,
  opacity: 1,
  visible: true
}

type GIProps = {
  __map__: Object,
  __ele__: HTMLElement,
  opacity?: number,
  onInstanceCreated?: Function,
  src?: string,
  bounds: Object,
  visible?: boolean,
  clickable?: boolean,
  events?: Object
}

class GroundImage extends React.Component<GIProps, {}> {

  map: Object
  element: HTMLElement
  image: Object
  setterMap: Object
  converterMap: Object

  constructor(props: GIProps) {
    super(props)
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        log.warning('MAP_INSTANCE_REQUIRED')
      } else {
        const self = this
        this.setterMap = {
          visible(val) {
            if (val) {
              self.image && self.image.show()
            } else {
              self.image && self.image.hide()
            }
          },
          src(val) {
            self.image.setImageUrl(val)
          }
        }
        this.converterMap = {
          bounds(val) {
            return self.buildBounds(val)
          }
        }
        this.map = props.__map__
        this.element = this.map.getContainer()
        setTimeout(() => {
          this.createGroundImage(props)
        }, 13)
      }
    }
  }

  get instance() {
    return this.image
  }

  shouldComponentUpdate() {
    return false
  }

  checkPropsChanged(nextProps: GIProps, key: string) {
    return this.props[key] !== nextProps[key]
  }

  createGroundImage(props: GIProps) {
    let src, bounds, opacity, clickable
    if ('src' in props) {
      src = props.src
    } else {
      log.warning('SRC_REQUIRED', true)
    }
    if ('bounds' in props) {
      bounds = this.buildBounds(props.bounds)
    } else {
      log.warning('BOUNDS_REQUIRED', true)
    }

    if ('clickable' in props) {
      clickable = props.clickable
    } else {
      clickable = defaultOpts.clickable
    }
    if ('opacity' in props) {
      opacity = props.opacity
    } else {
      opacity = defaultOpts.opacity
    }
    this.image = new window.AMap.GroundImage(src, bounds, {
      map: this.map,
      clickable,
      opacity
    })
    this.props.onInstanceCreated && this.props.onInstanceCreated()
  }

  buildBounds(rawBounds: Object) {
    if (!rawBounds) {
      return rawBounds
    }
    if ('getSouthWest' in rawBounds) {
      return rawBounds
    }
    const bounds = new window.AMap.Bounds(
      new window.AMap.LngLat(rawBounds.sw.longitude, rawBounds.sw.latitude),
      new window.AMap.LngLat(rawBounds.ne.longitude, rawBounds.ne.latitude)
    )
    return bounds
  }

  render() {
    return (null)
  }
}

export default withPropsReactive(GroundImage)
