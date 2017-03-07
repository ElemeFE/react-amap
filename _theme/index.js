'use strict';

var path = require('path');

module.exports = {
  lazyLoad: false,
  pick: {
    posts(markdownData) {
      return {
        meta: markdownData.meta,
        description: markdownData.description,
      }
    }
  },
  // plugins: [
  //   'bisheng-plugin-react-amap',
  //   'bisheng-plugin-react?lang=__react',
  // ],
  plugins: [
    'bisheng-plugin-antd',
    'bisheng-plugin-react?lang=__react'
  ],
  routes: [{
    path: '/',
    component: './template/Cover'
  }, {
    path: '/component/:doc',
    dataPath: '/:doc',
    component: './template/Doc'
  }, {
    path: '/playground',
    component: './template/Playground'
  }]
};