import React from 'react';
import { Row, Col } from 'antd';
import CodePreview from './CodePreview';

export default class DemoItem extends React.Component {
  render() {
    const props = this.props;
    return <div className="demo-item">
      <h3 className="demo-title">{props.title}</h3>
      <div className="demo-desc">{props.content}</div>
      <Row>
        <Col span={this.props.isWide ? 12 : 24 } className="demo-item-code">
          <CodePreview title={props.title}>{props.code}</CodePreview>
        </Col>
        {
          this.props.isWide ? <Col span={12} className="demo-item-preview">
              {props.children}
            </Col> : null
        }
      </Row>
    </div>;
  }
};
