import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
import { offsetTop } from '../utils';
import CodePreview from './CodePreview';

export default class DemoItem extends React.Component {
  constructor(props) {
    super(props);
    this.watchScroll = this.watchScroll.bind(this);
    this.toTop = 0;     // 距离页面顶部距离
    this.bodyHeight = 0;
    this.state = {
      intoViewport: false
    };
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this.watchRef);
    this.toTop = offsetTop(el);
    this.bodyHeight = document.body.offsetHeight;
    this.watchScroll();
    window.addEventListener('scroll', this.watchScroll, false);
  }

  watchScroll() {
    window.clearTimeout(this.watchTimer);
    this.watchTimer = setTimeout(() => {
      const scroll = window.scrollY;
      if ((this.toTop < scroll + this.bodyHeight) && (this.toTop + 400 > scroll)) {
        this.setState({
          intoViewport: true
        });
      }
    }, 50);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.watchScroll, false);
  }

  render() {
    const props = this.props;
    return <div className="demo-item">
      <h3 className="demo-title">{props.title}</h3>
      <div className="demo-desc">{props.content}</div>
      <Row ref={ ref => { this.watchRef = ref; } }>
        <Col span={this.props.isWide ? 12 : 24 } className="demo-item-code">
          <CodePreview title={props.title}>{props.code}</CodePreview>
        </Col>
        {
          this.props.isWide && this.state.intoViewport ? <Col span={12} className="demo-item-preview">
              {props.children}
            </Col> : null
        }
      </Row>
    </div>;
  }
};
