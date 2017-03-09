import React from 'react';
import Layout from './Layout';

export default class NotFound extends React.Component{
  render() {
    return <Layout>
      <div id="notfound">
        <img src="http://oslhtemp.qiniudn.com/17-3-9/27065668-file_1489065311191_1180d.png" alt=""/>
        <div className="guide">
          You Got Lost
        </div>
      </div>
    </Layout>
  }
}