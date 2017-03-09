import React from 'react';
import Header from './Header';
import Footer from './Footer';
require('../static/style');
require('antd/dist/antd.css');
export default function Layout(props){
  return <div className="wrapper">
    <Header route={props.route}/>
    <div className="layout">
      {props.children}
    </div>
    <Footer/>
  </div>
}