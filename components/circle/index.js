// @flow
import React from 'react'
import withPropsReactive from '../utils/withPropsReactive'
import log from '../utils/log'
import { toLnglat } from '../utils/common'
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

const configurableProps = [
  'center',
  'radius',
  'draggable',
  'extData',

  /* 原生的接口中并没有这些对象，这是本组件的扩展 */
  'visible',
  'style'
]

const allProps = configurableProps.concat([
  'zIndex',
  'bubble'
])

type CircleProps = {
  __map__: Object,
  __ele__: HTMLElement,
  center?: LngLat,
  onInstanceCreated?: Function,
  radius: number,
  draggable?: boolean,
  extData: any,
  visible?: boolean,
  style?: Object,
  zIndex?: number,
  bubble: boolean,
  events?: Object,
  children: any,
}

class Circle extends React.Component<CircleProps, {loaded: boolean}> {

  props: CircleProps
  map: Object
  element: HTMLElement
  mapCircle: Object
  setterMap: Object
  converterMap: Object

  constructor(props: CircleProps) {
    super(props)
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        log.warning('MAP_INSTANCE_REQUIRED')
      } else {
        const self = this
        this.setterMap = {
          visible(val) {
            if (self.mapCircle) {
              if (val) {
                self.mapCircle.show()
              } else {
                self.mapCircle.hide()
              }
            }
          },
          style(val) {
            self.mapCircle && self.mapCircle.setOptions(val)
          }
        }
        this.converterMap = {
          center: toLnglat
        }
        this.state = {
          loaded: false
        }
        this.map = props.__map__
        this.element = this.map.getContainer()
        this.createInstance(props).then(() => {
          this.setState({
            loaded: true
          })
          this.props.onInstanceCreated && this.props.onInstanceCreated()
        })
      }
    }
  }

  get instance() {
    return this.mapCircle
  }

  createInstance(props: CircleProps) {
    const options = this.buildCreateOptions(props)
    options.map = this.map
    this.mapCircle = new window.AMap.Circle(options)
    return Promise.resolve(this.mapCircle)
  }

  buildCreateOptions(props: CircleProps) {
    const options = {}
    allProps.forEach((key) => {
      if (key in props) {
        if (key === 'style' && (props.style !== undefined)) {
          const styleItem = Object.keys(props.style)
          styleItem.forEach((item) => {
            // $FlowFixMe
            options[item] = props.style[item]
          })
        } else {
          options[key] = this.getSetterValue(key, props)
        }
      }
    })
    return options
  }

  getSetterValue(key: string, props: CircleProps) {
    if (key in this.converterMap) {
      return this.converterMap[key](props[key])
    }
    return props[key]
  }

  renderEditor(children: any) {
    if (!children) {
      return null
    }
    if (React.Children.count(children) !== 1) {
      return null
    }
    return React.cloneElement(React.Children.only(children), {
      __circle__: this.mapCircle,
      __map__: this.map,
      __ele__: this.element
    })
  }

  render() {
    return this.state.loaded ? (this.renderEditor(this.props.children)) : null
  }
}

export default withPropsReactive(Circle)
