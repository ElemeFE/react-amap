import React from 'react';
import { Row, Col } from 'antd';

export default class DemoItem extends React.Component {
  render() {
    const props = this.props;
    return <div className="demo-item">
      <h3 className="demo-title">{props.title}</h3>
      <div className="demo-desc">{props.content}</div>
      <Row>
        <Col span={12} className="demo-item-code">
          {props.code}
        </Col>
        <Col span={12} className="demo-item-preview">
          {props.children}
        </Col>
      </Row>
    </div>
  }
};
