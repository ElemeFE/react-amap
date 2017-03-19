import React from 'react';

export default function PureArticle(props) {
  const pageData = props.pageData;
  const pageContent = pageData.content;
  const title = pageData.meta.title;
  return <div>
    <h1>{title}</h1>
    <div className="page-content">
      {props.utils.toReactComponent(pageContent)}
    </div>
  </div>;
};
