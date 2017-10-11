// @flow
import React from 'react';
import isFun from '../utils/isFun';
import log from '../utils/log';

type MTProps = {
  __map__: Object,
  events: Object,
};

class MouseTool extends React.Component<MTProps, {}> {

  map: Object;
  tool: Object;

  constructor(props: MTProps) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        log.warning('MAP_INSTANCE_REQUIRED');
      } else {
        this.map = props.__map__;
        this.loadToolInstance(props);
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  loadToolInstance(props: MTProps) {
    this.map.plugin(['AMap.MouseTool'], () => {
      this.createToolInstance(props);
    });
  }

  createToolInstance(props: MTProps) {
    this.tool = new window.AMap.MouseTool(this.map);
    const events = props.events || {};
    if (isFun(events.created)) {
      events.created(this.tool);
    }
    if (isFun(events.draw)) {
      this.tool.on('draw', (e) => {
        events.draw(e);
      });
    }
    return this.tool;
  }

  render() {
    return (null);
  }
}

export default MouseTool;
