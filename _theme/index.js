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
    component: './template/Components'
  },{
    path: '/articles/:doc',
    component: './template/Articles'
  }, {
    path: '/404',
    component: './template/NotFound'
  }],
};