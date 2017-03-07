import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';

export default class Doc extends React.Component{
  render() {
    const { utils, pageData } = this.props;
    const content = pageData.demo.index.content;
    const highlightedCode = pageData.demo.index.highlightedCode;
    content.unshift('section');
    return <Layout>
      <div style={{marginTop: '20px'}}>
        { pageData.demo.index.preview(React, ReactDOM)}
      </div>
      { utils.toReactComponent(content)}
      { utils.toReactComponent(highlightedCode)}
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