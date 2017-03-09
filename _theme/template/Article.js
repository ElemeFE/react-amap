import React from 'react';
import Layout from './Layout';
import { Menu } from 'antd';
import { Link } from 'react-router';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Article extends React.Component {
  getMenuLink(meta) {
    const filename = meta.filename;
    const link = '/' + filename.slice(0, filename.indexOf('.md'));
    return <Link to={link}>{meta.title}</Link>
  }
  
  getSideMenu() {
    const articleData = this.props.data.articles;
    const menuList = [];
    for(let key in articleData) {
      const data = articleData[key];
      data.key = key;
      menuList.push(data);
    }
    return menuList.sort((a, b) => (a.meta.order - b.meta.order)).map((item) => {
      return <Menu.Item key={item.key}>{ this.getMenuLink(item.meta)}</Menu.Item>
    });
  }
   
  render() {
    const pageData = this.props.pageData;
    const content = this.props.utils.toReactComponent(pageData.content);
    const param = this.props.routeParams.doc;
    const defaultSelectedKeys = [param];
    
    return <Layout route={this.props.route}>
      <div id="doc">
        <aside id="aside">
          <Menu
            mode="inline"
            defaultSelectedKeys={defaultSelectedKeys}
          >
            { this.getSideMenu() }
          </Menu>
        </aside>
        <article id="article">
          { content }
        </article>
      </div>
    </Layout>
  }
}