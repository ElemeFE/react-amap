import React from 'react';
import ReactDOM from 'react-dom';
import DemoItem from './DemoItem';

export default class DemoArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      isWide: true
    };
    this.changeLayout = this.changeLayout.bind(this);
  }

  componentWillMount() {
    this.changeLayout();
    window.addEventListener('resize', this.changeLayout);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return ((this.state.isWide !== nextState.isWide) ||
      (this.props.routeParams.doc !== nextProps.routeParams.doc));
  }

  changeLayout() {
    const width = document.body.clientWidth;
    const isWide = width > 800;
    this.setState({
      isWide
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeLayout);
  }
  render() {
    const props = this.props;
    const pageData = props.pageData;
    const demoComponent = Object.keys(pageData.demo).map(key => pageData.demo[key])
      .filter(item => !item.meta.hidden)
      .sort((a, b) => a.meta.order - b.meta.order)
      .map((item, i) => {
        const content = props.utils.toReactComponent(['div'].concat(item.content));
        return (<DemoItem
          key={i}
          title={item.meta.title}
          content={content}
          code={props.utils.toReactComponent(item.highlightedCode)}
          isWide={this.state.isWide}
        >
          { this.state.isWide ? item.preview(React, ReactDOM) : null}
        </DemoItem>);
      });
    const pageContent = pageData.index.content;
    const pageAPI = pageData.index.api;
    const title = pageData.index.meta.title;
    return <div>
      <h1>{title}</h1>
      <div className="page-content">
        {props.utils.toReactComponent(pageContent)}
      </div>
      <div className="demo-wrapper">
        {demoComponent}
      </div>
      <div className="page-api">
        {props.utils.toReactComponent(pageAPI)}
      </div>
    </div>;
  }
}
