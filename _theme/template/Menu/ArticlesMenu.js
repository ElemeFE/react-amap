import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router';

function getArticlesMenuLink(meta) {
  const filename = meta.filename;
  const link = '/' + filename.slice(0, filename.indexOf('.md'));
  return <Link to={link}>{meta.title}</Link>;
}

function getArticlesMenu(menuData) {
  const menuList = [];
  for (let key in menuData) {
    const data = menuData[key];
    data.key = key;
    menuList.push(data);
  }
  return menuList.sort((a, b) => (a.meta.order - b.meta.order)).map((item) => {
    return <Menu.Item key={item.key}>{ getArticlesMenuLink(item.meta)}</Menu.Item>;
  });
}

export default function ArticlesMenu(props) {
  const {data, defaultSelectedKey} = props;
  return (<Menu
    mode={props.mode}
    defaultSelectedKeys={[defaultSelectedKey]}
  >
    { getArticlesMenu(data)}
  </Menu>);
}
