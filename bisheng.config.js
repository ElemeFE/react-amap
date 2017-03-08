var path = require('path');

module.exports = {
  source: ['./components'],
  output: './_site',
  entry: {
    index: {
      theme: './_theme',
      htmlTemplate: './_theme/static/template.html',
    }
  },
  // theme: './_theme',
  // themeConfig: {
  //   home: '/',
  //   sitename: 'Hello Name',
  //   tagline: 'what is this',
  //   github: 'https://github.com/ioslh/keesh',
  //   // 组件目录顺序
  //   comOrder: {
  //     Basic: 0,
  //     Cover: 1,
  //     InfoWindow: 2,
  //   }
  // },
  plugins: [
    'bisheng-plugin-react?lang=__react',
    'bisheng-plugin-antd',
  ],
  // htmlTemplate: './_theme/static/template.html',
  port: 9001,
  webpackConfig(config) {
    config.resolve.alias = {
      'react-amap': path.join(process.cwd(), 'lib'),
      'react-router': 'react-router/umd/ReactRouter',
  
    };
    return config;
  }
};