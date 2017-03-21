import React from 'react';
import isFun from '../../lib/utils/isFun';
import log from '../../lib/utils/log';

class MouseTool extends React.Component {
  constructor(props) {
    super(props);
    if (!props.__map__) {
      log.warning('MAP_INSTANCE_REQUIRED');
    } else {
      this.map = props.__map__;
      this.loadToolInstance(props);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  loadToolInstance(props) {
    this.map.plugin(['AMap.MouseTool'], () => {
      this.createToolInstance(props);
    });
  }

  createToolInstance(props) {
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
