import React from 'react'
import toCapitalString from './toCapitalString'

function withPropsReactive(MapComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.instanceCreated = false
      this.myMapComponent = null
      this.registeredEvents = []
      this.onInstanceCreated = this.onInstanceCreated.bind(this)
    }

    onInstanceCreated() {
      this.instanceCreated = true
      if ('events' in this.props) {
        const { instance } = this.myMapComponent
        if (this.props.events.created) {
          this.props.events.created(instance)
        }
      }
      this.reactivePropChange(this.props, false)
    }

    createEventsProxy(props) {
      const self = this
      const { instance } = this.myMapComponent
      const evs = Object.keys(props.events || {})
      evs.length && evs.forEach(ev => {
        if (self.registeredEvents.indexOf(ev) === -1) {
          self.registeredEvents.push(ev)
          instance.on(ev, (function(ev) {
            return function(...args) {
              if (self.props.events && ev in self.props.events) {
                self.props.events[ev].apply(null, args)
              }
            }
          })(ev))
        }
      })
    }

    componentWillReceiveProps(nextProps) {
      this.reactivePropChange(nextProps, true)
    }

    reactivePropChange(nextProps, shouldDetectChange = true) {
      if (!this.instanceCreated) {
        return false
      }
      const { setterMap = {}, converterMap = {}, instance = {} } = this.myMapComponent
      const list = Object.keys(nextProps)
      list.length && list.forEach(key => {
        if (key === 'events') {
          return this.createEventsProxy(nextProps)
        }

        let willReactive = true
        if (shouldDetectChange) {
          willReactive = this.detectPropChange(key, nextProps, this.props)
        }
        if (!willReactive) {
          return false
        }
        let setterParam = nextProps[key]
        if (key in converterMap) {
          setterParam = converterMap[key](nextProps[key])
        }
        if (key in setterMap) {
          setterMap[key](setterParam)
        } else {
          const trySetterName = `set${toCapitalString(key)}`
          if (trySetterName in instance) {
            instance[trySetterName](setterParam)
          }
        }
      })
    }

    detectPropChange(key, nextProps, oldProps) {
      return nextProps[key] !== oldProps[key]
    }

    render() {
      return <MapComponent
        onInstanceCreated={this.onInstanceCreated}
        ref={comp => { this.myMapComponent = comp }}
        {...this.props}
      />;
    }

    componentWillUnmount() {
      const { instance } = this.myMapComponent
      if (!instance) return
      if ('destroy' in instance) {
        setTimeout(() => {
          instance.destroy()
        }, 10)
      }
      if ('hide' in instance) {
        instance.hide()
      }
      if ('__map__' in this.props && 'setMap' in instance) {
        instance.setMap(null)
      }
    }
  };
};

export default withPropsReactive
