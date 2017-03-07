import React, { Component } from 'react';
import isFun from '../../lib/utils/isFun';

class Marker extends Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      // TODO(slh)
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      
      this.createMarker(props);
    }
  }
  
  createMarker(props) {
    let opts = {};
    if ('createOptions' in props) {
      opts = props.createOptions;
    }
    opts.map = this.map;
    this.marker = new window.AMap.Marker(opts);
    const events = this.exposeMarkerInstance(props);
    events && this.bindMarkerEvents(events);
  }
  
  exposeMarkerInstance(props) {
    if ('events' in props) {
      const events = props.events;
      if (isFun(events.created)) {
        events.created(this.marker);
      }
      delete events.created;
      return events;
    }
    return false;
  }
  
  bindMarkerEvents(events) {
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      this.marker.on(evName, events[evName]);
    });
  }
  
  render(){
    return null;
  }
}