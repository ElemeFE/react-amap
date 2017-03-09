import React from 'react';

export default function Header(props) {
  return <header id="header">
    <div className="header-inner">
      <h2>REACT AMAP</h2>
      <ul>
        <li><a href="/">首页</a></li>
        <li><a className="current" href="/components/AMap">组件</a></li>
        <li><a href="https://github.com" target="_blank">GitHub</a></li>
        <li><a href="/design">设计</a></li>
      </ul>
    </div>
  </header>
}