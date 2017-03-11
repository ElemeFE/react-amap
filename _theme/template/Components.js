import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import SideMenu from './Menu/SideMenu';
import DemoArticle from './Content/DemoArticle';
import PureArticle from './Content/PureArticle'


export default class Doc extends React.Component{
  shouldComponentUpdate(nextProps) {
    return this.props.location.pathname !== nextProps.location.pathname;
  }
  render() {
    const props = this.props;
    let type;
    if (props.pageData.demo) {
      type = 'demo';
    }
    console.log(props);
    return <Layout route={props.route}>
      <div id="doc">
        <aside id="aside">
          <SideMenu
            type="components"
            defaultSelectedKey={props.routeParams.doc}
            data={props.data}
          />
        </aside>
        <article id="article">
          {
            type === 'demo' ?
              <DemoArticle pageData={props.pageData} utils={props.utils}/> :
              <PureArticle pageData={props.pageData} utils={props.utils}/>
          }
        </article>
      </div>
    </Layout>
  }
}

