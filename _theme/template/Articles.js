import React from 'react';
import Layout from './Layout';
import SideMenu from './Menu/SideMenu';
import PureArticle from './Content/PureArticle';

export default function Article(props) {
  const pageData = props.pageData;
  return <Layout route={props.route}>
    <div id="doc">
      <aside id="aside">
        <SideMenu
          type="articles"
          defaultSelectedKey={props.routeParams.doc}
          data={props.data}
        />
      </aside>
      <article id="article" className="pure-article">
        <PureArticle pageData={pageData} utils={props.utils}/>
      </article>
    </div>
  </Layout>;
}
