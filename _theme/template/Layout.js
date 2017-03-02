import React from 'react';
import Header from './Header';
import Nav from './Nav';
require('../static/style');
require('antd/dist/antd.css');
export default function Layout(props){
  return <div className="wrapper">
    <Header/>
    <div>
      {props.children}
    </div>
  </div>
}