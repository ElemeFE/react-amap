import React from 'react';
import Header from './Header';
require('../static/style');
require('antd/dist/antd.css');
export default function Layout(props){
  return <div className="wrapper">
    <Header/>
    <div className="layout">
      {props.children}
    </div>
  </div>
}