var path = require('path');

module.exports = {
  source: './components',
  output: './_site',
  theme: './_theme',
  themeConfig: {
    home: '/',
    sitename: 'Hello Name',
    tagline: 'what is this',
    github: 'https://github.com/ioslh/keesh',
    // 组件目录顺序
    comOrder: {
      Basic: 0,
      Cover: 1,
      InfoWindow: 2,
    }
  },
  htmlTemplate: './_theme/static/template.html',
  port: 9001,
  webpackConfig(config) {
    config.resolve.alias = {
      'react-amap': path.join(process.cwd(), 'lib')
    };
    return config;
  }
};