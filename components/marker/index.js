// @flow
import React from 'react'
import { render } from 'react-dom'
import log from '../utils/log'
import withPropsReactive from '../utils/withPropsReactive'
import {
  MarkerAllProps,
  renderMarkerComponent
} from '../utils/markerUtils'
import {
  toLnglat,
  toPixel
} from '../utils/common'

class Marker extends React.Component<MarkerProps, {}> {

  map: Object
  element: HTMLDivElement
  marker: Object
  contentWrapper: HTMLElement
  setterMap: Object
  converterMap: Object

  constructor(props: MarkerProps) {
    super(props)
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        log.warning('MAP_INSTANCE_REQUIRED')
      } else {
        const self = this
        this.setterMap = {
          visible(val) {
            if (val) {
              self.marker && self.marker.show()
            } else {
              self.marker && self.marker.hide()
            }
          },
          zIndex(val) {
            self.marker && self.marker.setzIndex(val)
          }
        }
        this.converterMap = {
          position: toLnglat,
          offset: toPixel
        }
        this.map = props.__map__
        this.element = this.map.getContainer()
        setTimeout(() => {
          this.createMarker(props)
        }, 13)
      }
    }
  }

  get instance() {
    return this.marker
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillReceiveProps(nextProps: MarkerProps) {
    if (this.map) {
      this.refreshMarkerLayout(nextProps)
    }
  }

  createMarker(props: MarkerProps) {
    const options = this.buildCreateOptions(props)
    this.marker = new window.AMap.Marker(options)

    this.marker.render = (function(marker) {
      return function(component) {
        renderMarkerComponent(component, marker)
      }
    })(this.marker)
    this.props.onInstanceCreated && this.props.onInstanceCreated()
    this.setMarkerLayout(props)
    this.setChildComponent(props)
  }

  // 在创建实例时根据传入配置，设置初始化选项
  buildCreateOptions(props: MarkerProps) {
    let opts = {}
    MarkerAllProps.forEach((key) => {
      if (key in props) {
        opts[key] = this.getSetterParam(key, props[key])
      }
    })
    opts.map = this.map
    return opts
  }

  // 初始化标记的外观
  setMarkerLayout(props: MarkerProps) {
    if (('render' in props) || ('children' in props && props.children)) {
      this.createContentWrapper()
      if ('className' in props && props.className) {
        // https://github.com/ElemeFE/react-amap/issues/40
        this.contentWrapper.className = props.className
      }
    }
  }

  createContentWrapper() {
    this.contentWrapper = document.createElement('div')
    this.marker.setContent(this.contentWrapper)
  }

  setChildComponent(props: MarkerProps) {
    if (this.contentWrapper) {
      if ('className' in props && props.className) {
        // https://github.com/ElemeFE/react-amap/issues/40
        this.contentWrapper.className = props.className
      }
      if ('render' in props) {
        renderMarkerComponent(props.render, this.marker)
      } else if ('children' in props) {
        const child = props.children
        const childType = typeof child
        if (childType !== 'undefined' && this.contentWrapper) {
          render(<div>{child}</div>, this.contentWrapper)
        }
      }
    }
  }

  refreshMarkerLayout(nextProps: MarkerProps) {
    this.setChildComponent(nextProps)
  }

  getSetterParam(key: string, val: any) {
    if (key in this.converterMap) {
      return this.converterMap[key](val)
    }
    return val
  }

  render() {
    return null
  }
}

export default withPropsReactive(Marker)
