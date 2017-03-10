import React from 'react';
import AMap from 'react-amap';
import { Link } from 'react-router';

export default function Cover(props) {
  console.log(props);
  const elemeAdd = {
    longitude: 121.3807354258945,
    latitude: 31.231765630889992
  };
  return <div className="cover-wrapper">
    <div className="cover-map">
      <AMap
        zoom={18}
        features={['bg','road','building']}
        mapStyle={'fresh'}
        center={elemeAdd}
      />
    </div>
    <div className="cover-content">
      <div className="cover-icon">
        <img src="http://oslhtemp.qiniudn.com/17-3-6/98901898-file_1488814957235_9457.png" alt=""/>
      </div>
      <h3>react-amap</h3>
      <div className="cover-link">
        <a className="github" href="https://github.com" target="_blank">GitHub</a>
        <Link className="start" to="/components/amap" >Get Started</Link>
      </div>
      <div className="slogan">
        Make AMap Great Again
      </div>
    </div>
  </div>
}
