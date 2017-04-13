// @flow
import React from 'react';
import isFun from '../_utils/isFun';
import log from '../_utils/log';

type EditorProps = {
  __map__: Object,
  __ele__: HTMLElement;
  __poly__: Object,
  active: boolean,
  events?: Object,
};

class PolyEditor extends React.Component {

  map: Object;
  element: HTMLElement;
  poly: Object;
  editorActive: boolean;
  polyEditor: Object;

  constructor(props: EditorProps) {
    super(props);
    if (typeof window !== 'undefined') {
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
  }

  componentWillReceiveProps(nextProps: EditorProps) {
    if (this.map) {
      this.onPropsUpdate(nextProps);
    }
  }

  onPropsUpdate(props: EditorProps) {
    if ('active' in props && props.active === false) {
      this.toggleActive(false, props);
    } else {
      this.toggleActive(true, props);
    }
  }

  toggleActive(active: boolean, props: EditorProps) {
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

  activeEditor(props: EditorProps) {
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

  loadPolyEditor(props: EditorProps) {
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

  createEditorInstance(props: EditorProps) {
    this.polyEditor = new window.AMap.PolyEditor(
      this.map, this.poly
    );
    const events = this.exposeEditorInstance(props);
    events && this.bindEditorEvents(events);
    return this.polyEditor;
  }

  exposeEditorInstance(props: EditorProps) {
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

  bindEditorEvents(events: Object) {
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
