import React from 'react';
import Header from './Header';
import Footer from './Footer';
require('../static/style');
require('antd/dist/antd.css');

function isExternalLink(link) {
  const host = document.location.host;
  return (link.indexOf('http') !== -1) && (link.indexOf(host) === -1);
}

function handleContentClick(e) {
  const target = e.target;
  if (target.nodeName.toLowerCase() === 'a') {
    const url = target.getAttribute('href');
    if (isExternalLink(url)) {
      window.open(url, '_blank');
      e.preventDefault();
    }
  }
}

export default function Layout(props) {
  return <div className="wrapper" onClick={handleContentClick}>
    <Header route={props.route}/>
    <div className="layout">
      {props.children}
    </div>
    <Footer/>
  </div>;
}
