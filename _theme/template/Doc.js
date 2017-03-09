import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import DemoItem from './DemoItem';
import { Menu } from 'antd';

import Nav from './Nav';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
export default class Doc extends React.Component{
  
  getSizeMenu() {
    return (<Menu
        mode="inline"
        defaultOpenKeys={['components']}
      >
        <Menu.Item key="getstart">快速上手</Menu.Item>
        <Menu.Item key="introduction">基本介绍</Menu.Item>
        <SubMenu key={`components`} title={'组件'}>
          <MenuItemGroup key="g1" title="覆盖物">
            <Menu.Item key="c1">Option 1</Menu.Item>
            <Menu.Item key="c2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup key="g2" title="信息窗体">
            <Menu.Item key="c3">Option 1</Menu.Item>
            <Menu.Item key="c4">Option 2</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>);
  }
  
  render() {
    const props = this.props;
    console.log('---------------------');
    console.log(props);
    const { pageData } = props;
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
        >
          {item.preview(React, ReactDOM)}
        </DemoItem>);
      });
  
    const pageContent = pageData.index.content;
    const pageAPI = pageData.index.api;
    const menu = this.getSizeMenu();
    return <Layout>
      <div id="doc">
        <aside>
          {menu}
        </aside>
        <article>
          <h1>{pageData.index.meta.chinese}</h1>
          <div className="page-content">
            {props.utils.toReactComponent(pageContent)}
          </div>
          <div className="demo-wrapper">
            {demoComponent}
          </div>
          <div className="page-api">
            {props.utils.toReactComponent(pageAPI)}
          </div>
        </article>
      </div>
    </Layout>
  }
}

