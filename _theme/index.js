'use strict';

var path = require('path');

module.exports = {
  lazyLoad: false,
  home: '/',
  routes: [{
    path: '/',
    component: './template/Cover'
  }, {
    path: '/components/:doc',
    component: './template/Doc'
  }, {
    path: '/playground',
    component: './template/Playground'
  }],
  // routes: [
  //   {
  //     path: '/',
  //     component: './template/Cover',
  //     indexRoute: { component: './template/Layout' },
  //     childRoutes: [
  //       { path: '/playground/', component: './template/Playground' },
  //       { path: '/component/:contentName', component: './template/Doc' },
  //     ],
  //   },
  // ],
};