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
  },{
    path: '/articles/:doc',
    component: './template/Article'
  }, {
    path: '/404',
    component: './template/NotFound'
  }],
};