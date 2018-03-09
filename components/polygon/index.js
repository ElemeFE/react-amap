// @flow
import React, { Component } from 'react'
import withPropsReactive from '../utils/withPropsReactive'
import log from '../utils/log'
import PolyEditor from '../polyeditor'
import { toLnglat } from '../utils/common'
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 *
 * }
 */

const configurableProps = [
  'path',
  'draggable',
  'extData',

  /* 本插件扩展的属性*/
  'style',
  'visible'
]

const allProps = configurableProps.concat([
  'zIndex',
  'bubble'
])

type PolyProps = {
  path: PolygonPath,
  draggable: boolean,
  extData: any,
  style?: Object,
  visible?: boolean,
  zIndex?: number,
  bubble?: boolean,
  events?: Object,
  children?: any,
  onInstanceCreated?: Function,
  __map__: Object,
  __ele__: HTMLElement,
}

class Polygon extends Component<PolyProps, {loaded: boolean}> {

  map: Object
  element: HTMLElement
  polygon: Object
  setterMap: Object
  converterMap: Object

  constructor(props: PolyProps) {
    super(props)
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        log.warning('MAP_INSTANCE_REQUIRED')
      } else {
        const self = this
        this.setterMap = {
          visible(val) {
            if (val) {
              self.polygon && self.polygon.show()
            } else {
              self.polygon && self.polygon.hide()
            }
          },
          style(val) {
            self.polygon.setOptions(val)
          }
        }
        this.converterMap = {
          path(val) {
            return self.buildPathValue(val)
          }
        }
        this.state = {
          loaded: false
        }
        this.map = props.__map__
        this.element = this.map.getContainer()
        setTimeout(() => {
          this.initMapPolygon(props)
        }, 13)
      }
    }
  }

  get instance() {
    return this.polygon
  }

  initMapPolygon(props: PolyProps) {
    const options = this.buildCreateOptions(props)
    options.map = this.map
    this.polygon = new window.AMap.Polygon(options)
    this.setState({
      loaded: true
    })
    this.props.onInstanceCreated && this.props.onInstanceCreated()
  }

  buildCreateOptions(props: PolyProps) {
    const options = {}
    allProps.forEach((key) => {
      if (key in props) {
        if ((key === 'style') && props.style) {
          const styleItem = Object.keys(props.style)
          styleItem.forEach((item) => {
            // $FlowFixMe
            options[item] = props.style[item]
          })
          // visible 做特殊处理
        } else if (key !== 'visible') {
          options[key] = this.getSetterValue(key, props[key])
        }
      }
    })
    return options
  }

  detectPropChanged(key: string, nextProps: PolyProps) {
    return this.props[key] !== nextProps[key]
  }

  getSetterValue(key: string, value: any) {
    if (key in this.converterMap) {
      return this.converterMap[key](value)
    }
    return value
  }

  buildPathValue(path: PolygonPath) {
    if (path.length) {
      const firstNode = path[0]
      if (typeof firstNode[0] === 'number') {
        return path.map((p) => (toLnglat(p)))
      }
      if ('getLng' in firstNode) {
        return path
      }
      if ('longitude' in firstNode || 'lng' in firstNode) {
        return path.map((p) => (toLnglat(p)))
      }
      if ('length' in firstNode && firstNode.length) {
        // $FlowFixMe
        return path.map(ring => this.buildPathValue(ring))
      }
    }
    return []
  }

  renderEditor(children: any) {
    if (!children) {
      return null
    }
    if (React.Children.count(children) !== 1) {
      return null
    }
    const child = React.Children.only(children)
    if (child.type === PolyEditor) {
      return React.cloneElement(child, {
        __poly__: this.polygon,
        __map__: this.map
      })
    }
    return null
  }

  render() {
    return this.state.loaded ? (this.renderEditor(this.props.children)) : null
  }
}

export default withPropsReactive(Polygon)
