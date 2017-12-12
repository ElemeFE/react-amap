// @flow
import React from 'react'
import withPropsReactive from '../utils/withPropsReactive'
import log from '../utils/log'

type MTProps = {
  __map__: Object,
  events?: Object,
  onInstanceCreated?: Function
}

class MouseTool extends React.Component<MTProps, {}> {

  map: Object
  tool: Object

  constructor(props: MTProps) {
    super(props)
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        log.warning('MAP_INSTANCE_REQUIRED')
      } else {
        this.map = props.__map__
        this.loadToolInstance().then(() => {
          this.props.onInstanceCreated && this.props.onInstanceCreated()
        })
      }
    }
  }

  get instance() {
    return this.tool
  }

  shouldComponentUpdate() {
    return false
  }

  loadToolInstance() {
    return new Promise(resolve => {
      this.map.plugin(['AMap.MouseTool'], () => {
        this.tool = new window.AMap.MouseTool(this.map)
        resolve()
      })
    })
  }

  render() {
    return (null)
  }
}

export default withPropsReactive(MouseTool)
