import React from 'react';
import { Map } from 'react-amap';
import { Link } from 'react-router';

export default function Cover() {
  const elemeAdd = {
    longitude: 121.3807354258945,
    latitude: 31.231765630889992
  };
  return <div className="cover-wrapper">
    <div className="cover-map">
      <Map
        zoom={18}
        features={['bg', 'road', 'building']}
        mapStyle={'fresh'}
        center={elemeAdd}
      />
    </div>
    <div className="cover-content">
      <div className="cover-icon">
        <img src="https://cloud.githubusercontent.com/assets/3898898/23833571/e5c7ae68-0782-11e7-8590-cecf4f3c969f.png" alt=""/>
      </div>
      <h3>react-amap</h3>
      <div className="cover-link">
        <a className="github" href="https://github.com/ElemeFE/react-amap" target="_blank">GitHub</a>
        <Link className="start" to="/articles/start" >Get Started</Link>
      </div>
      <div className="slogan">
        Make AMap Great Again
      </div>
    </div>
  </div>;
}
