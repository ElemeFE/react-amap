import React from 'react';
import Layout from './Layout';

export default class NotFound extends React.Component {
  render() {
    return <Layout>
      <div id="notfound">
        <img src="https://cloud.githubusercontent.com/assets/3898898/23833528/2e1e198c-0782-11e7-8e13-664b39a29d4b.png" alt=""/>
        <div className="guide">
          You Got Lost
        </div>
      </div>
    </Layout>;
  }
}
