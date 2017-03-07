import React from 'react';
import isFun from '../../lib/utils/isFun';

class CircleEditor extends React.Component {
  constructor(props) {
    super(props);
    if (!(props.__map__ && props.__circle__ )) {
      // TODO(slh)
    } else {
      this.map = props.__map__;
      this.element = props.__ele__;
      this.circle = props.__circle__;
      this.editorActive = false;
      this.onPropsUpdate(props);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.onPropsUpdate(nextProps);
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
    this.loadCircleEditor(props).then((editor) => {
      this.editorActive = true;
      editor.open();
    });
  }
  
  inactiveEditor() {
    this.editorActive = false;
    if (this.circleEditor) {
      this.circleEditor.close();
    }
  }
  
  loadCircleEditor(props) {
    if (this.circleEditor) {
      return new Promise((resolve) => {
        resolve(this.circleEditor);
      });
    }
    return new Promise((resolve, reject) => {
      this.map.plugin(['AMap.CircleEditor'], () => {
        resolve(this.createEditorInstance(props));
      });
    });
  }
  
  createEditorInstance(props) {
    this.circleEditor = new window.AMap.CircleEditor(
      this.map, this.circle
    );
    const events = this.exposeEditorInstance(props);
    events && this.bindEditorEvents(events);
    return this.circleEditor;
  }
  
  exposeEditorInstance(props) {
    if ('events' in props) {
      const events = props.events || {};
      if (isFun(events.created)) {
        events.created(this.circleEditor);
      }
      delete events.created;
      return events;
    }
    return false;
  }
  
  bindEditorEvents(events) {
    const list = Object.keys(events);
    list.length && list.forEach((evName) => {
      this.circleEditor.on(evName, events[evName]);
    });
  }
  
  render() {
    return null;
  }
};

export default CircleEditor;