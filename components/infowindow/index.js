// @flow
import React from 'react'
import { render } from 'react-dom'
import withPropsReactive from '../utils/withPropsReactive'
import log from '../utils/log'
import {
  toLnglat,
  toPixel,
  toSize
} from '../utils/common'
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

const Component = React.Component

const configurableProps = [
  'content',
  'position',
  'size',
  /* 以下属性是本插件的扩展 */
  'visible',

  /* 这个 setOffset  方法高德并没有明确在文档中列出来，不确定会不会撤销 */
  'offset'
]

const allProps = configurableProps.concat([
  'isCustom',
  'autoMove',
  'closeWhenClickMap',
  'showShadow'
])

type IWProps = {
  content?: any,
  onInstanceCreated?: Function,
  position: LngLat,
  size?: Size,
  visible?: boolean,
  offset?: Pixel,
  isCustom?: boolean,
  autoMove?: boolean,
  closeWhenClickMap?: boolean,
  showShadow?: boolean,
  events?: Object,
  children?: any,
  className?: string,
  __map__: Object,
  __ele__: HTMLElement,
}

class InfoWindow extends Component<IWProps, {}> {

  map: Object
  isCustom: boolean
  infoWindow: Object
  infoDOM: HTMLElement
  setterMap: Object
  converterMap: Object

  constructor(props: IWProps) {
    super(props)
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        log.warning('MAP_INSTANCE_REQUIRED')
      } else {
        const self = this
        this.setterMap = {
          visible(val) {
            if (val) {
              self.showWindow()
              self.setClassName(self.props)
              self.setChild(self.props)
            } else {
              self.closeWindow()
            }
          }
        }
        this.converterMap = {
          size: toSize,
          offset: toPixel,
          position: toLnglat
        }
        this.map = props.__map__
        this.isCustom = true
        setTimeout(() => {
          this.createInfoWindow(props)
        }, 13)
      }
    }
  }

  get instance() {
    return this.infoWindow
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillReceiveProps(nextProps: IWProps) {
    if (this.map) {
      this.refreshWindowLayout(nextProps)
    }
  }

  createInfoWindow(props: IWProps) {
    const options = this.buildCreateOptions(props)
    this.infoWindow = new window.AMap.InfoWindow(options)
    this.props.onInstanceCreated && this.props.onInstanceCreated()
  }

  refreshWindowLayout(nextProps: IWProps) {
    this.setChild(nextProps)
    this.setClassName(nextProps)
  }

  checkPropChanged(key: string, nextProps: IWProps) {
    return this.props[key] !== nextProps[key]
  }

  showWindow() {
    this.infoWindow.open(this.map, this.infoWindow.getPosition())
  }

  closeWindow() {
    this.infoWindow.close()
  }

  buildCreateOptions(props: IWProps) {
    const options = {}

    // 如果开发者没有设置 isCustom 属性，默认设置为 false
    if ('isCustom' in props) {
      options.isCustom = !!props.isCustom
    } else {
      options.isCustom = false
    }

    if ('content' in props) {
      options.content = props.content
    } else {
      this.infoDOM = document.createElement('div')
      options.content = this.infoDOM
    }

    allProps.forEach((key) => {
      if (key in props) {
        if (['visible', 'isCustom', 'content'].indexOf(key) === -1) {
          options[key] = this.getSetterValue(key, props[key])
        }
      }
    })
    return options
  }

  getSetterValue(key: string, value: any) {
    if (key in this.converterMap) {
      return this.converterMap[key](value)
    }
    return value
  }

  setChild(props: IWProps) {
    const child = props.children
    if (this.infoDOM && child) {
      render(<div>{child}</div>, this.infoDOM)
    } else {
      if (props.children) {
        console.warn('因为你设置 isCustom 为 true，InfoWindow 的 Children 被忽略')
      }
    }
  }

  setClassName(props: IWProps) {
    if (this.infoDOM) {
      let baseClsValue = ''
      // 刷新 className
      if ('className' in props && props.className) {
        baseClsValue += props.className
      } else if (props.isCustom === true) {
        baseClsValue += 'amap_markers_pop_window'
      }
      this.infoDOM.className = baseClsValue
    }
  }

  render() {
    return (null)
  }
}

export default withPropsReactive(InfoWindow)
