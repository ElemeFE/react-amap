import React from 'react';
import isFun from '../../lib/utils/isFun';
import log from '../../lib/utils/log';

class PolyEditor extends React.Component {
  constructor(props) {
    super(props);
    if (!(props.__map__ && props.__poly__)) {
      log.warning('MAP_INSTANCE_REQUIRED');
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.poly = props.__poly__;
      this.editorActive = false;
      this.onPropsUpdate(props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.map) {
      this.onPropsUpdate(nextProps);
    }
  }

  onPropsUpdate(props) {
    if ('active' in props && props.active === false) {
      this.toggleActive(false);
    } else {
      this.toggleActive(true, props);
    }
  }

  toggleActive(active, props) {
    if (active) {
      if (!this.editorActive) {
        this.activeEditor(props);
      }
    } else {
      if (this.editorActive) {
        this.inactiveEditor();
      }
    }
  }

  activeEditor(props) {
    this.loadPolyEditor(props).then((editor) => {
      this.editorActive = true;
      editor.open();
    });
  }

  inactiveEditor() {
    this.editorActive = false;
    if (this.polyEditor) {
      this.polyEditor.close();
    }
  }

  loadPolyEditor(props) {
    if (this.polyEditor) {
      return new Promise((resolve) => {
        resolve(this.polyEditor);
      });
    }
    return new Promise((resolve) => {
      this.map.plugin(['AMap.PolyEditor'], () => {
        resolve(this.createEditorInstance(props));
      });
    });
  }

  createEditorInstance(props) {
    this.polyEditor = new window.AMap.PolyEditor(
      this.map, this.poly
    );
    const events = this.exposeEditorInstance(props);
    events && this.bindEditorEvents(events);
    return this.polyEditor;
  }

  exposeEditorInstance(props) {
    if ('events' in props) {
      const events = props.events || {};
      if (isFun(events.created)) {
        events.created(this.polyEditor);
      }
      delete events.created;
      return events;
    }
    return false;
  }

  bindEditorEvents(events) {
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      this.polyEditor.on(evName, events[evName]);
    });
  }

  render() {
    return null;
  }
};

export default PolyEditor;
