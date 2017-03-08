import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import DemoItem from './DemoItem';

export default class Doc extends React.Component{
  render() {
    console.log(this.props);
    const props = this.props;
    const { pageData } = props;
    const demosToChild = Object.keys(pageData.demo).map(key => pageData.demo[key])
      .filter(item => !item.meta.hidden)
      .sort((a, b) => a.meta.order - b.meta.order)
      .map((item, i) => {
        console.log(item);
        const content = props.utils.toReactComponent(['div'].concat(item.content));
        return (<DemoItem
          key={i}
          content={content}
          code={props.utils.toReactComponent(item.highlightedCode)}
        >
          {item.preview(React, ReactDOM)}
        </DemoItem>);
      });
    return <Layout>
      <div style={{marginTop: '20px'}}>{demosToChild}</div>
    </Layout>
  }
}

// export default collect(async (nextProps) => {
//   if (!nextProps.pageData) {
//     throw 404; // Then, bisheng will show `NotFound.jsx`
//   }
//   const pageData = await nextProps.pageData();
//   return { pageData };
// })(Doc);