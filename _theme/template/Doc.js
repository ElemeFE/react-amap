import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import DemoItem from './DemoItem';
import { Menu } from 'antd';
import { Link } from 'react-router';


import Nav from './Nav';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const componentOrder = [
  '地图',
  '覆盖物',
  '信息窗体'
];

export default class Doc extends React.Component{
  getMenuLink(meta) {
    const filename = meta.filename;
    const link = '/' + filename.slice(0, filename.indexOf('index.md') - 1);
    return <Link to={link}>{meta.chinese}</Link>
  }
  
  getMenuItem(menus) {
    return menus.sort((a, b) => (a.meta.order - b.meta.order)).map((item) => {
      return <Menu.Item key={item.meta.chinese}>
        { this.getMenuLink(item.meta)}
      </Menu.Item>
    });
  }
  
  getMenuGroups() {
    const  menuGroups = componentOrder.map(category => ({
      category: category,
      menus: [],
    }));
    const data = this.props.data.components;
    for(let key in data) {
      const curCategory = data[key].index.meta.category;
      const idx = componentOrder.indexOf(curCategory);
      if (idx !== -1) {
        menuGroups[idx].menus.push(data[key].index);
      }
    }
    return menuGroups.map((item) => {
      return (<MenuItemGroup key={item.category} title={item.category}>
        { this.getMenuItem(item.menus)}
      </MenuItemGroup>);
    });
  }
  
  getSideMenu() {
    return (<Menu
        mode="inline"
        defaultOpenKeys={['components']}
      >
        <Menu.Item key="getstart">快速上手</Menu.Item>
        <Menu.Item key="introduction">基本介绍</Menu.Item>
        <SubMenu key={`components`} title={'组件'}>
          { this.getMenuGroups() }
        </SubMenu>
      </Menu>);
  }
  
  render() {
    const props = this.props;
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
    const menu = this.getSideMenu();
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

