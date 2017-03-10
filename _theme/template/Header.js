import React from 'react';
import { Link } from 'react-router';

export default function Header(props) {
  const route = props.route;
  let path = '';
  if (route && route.path) {
    path = route.path;
  }
  return <header id="header">
    <div className="header-inner">
      <h2>REACT AMAP</h2>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link className={path.indexOf('articles') === -1 ? '': 'current'} to="/articles/start">快速开始</Link></li>
        <li><Link className={path.indexOf('components') === -1 ? '': 'current'} to="/components/amap">组件文档</Link></li>
        <li><a href="https://github.com" target="_blank">GitHub</a></li>
      </ul>
    </div>
  </header>
}