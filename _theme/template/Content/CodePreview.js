import React from 'react';
import { Icon, Modal, Tooltip } from 'antd';
const noop = () => {};

const copySupport = document.queryCommandSupported('copy');
if (copySupport) {
  document.addEventListener('copy', function(e) {
    if (window.__react_amap_code) {
      const cd = e.clipboardData;
      cd.setData('text/plain', window.__react_amap_code);
      delete window.__react_amap_code;
      e.preventDefault();
      return false;
    }
  });
}

export default class CodePreview extends React.Component {
  fullscreenPreview() {
    Modal.info({
      title: `代码查看 - ${this.props.title}`,
      content: this.props.children,
      iconType: 'code-o',
      width: '90%',
      okText: '关闭',
      onOk: noop,
      onCancel: noop,
      maskClosable: true
    });
  }

  copyCode() {
    window.__react_amap_code = this.codeCon.innerText;
    document.execCommand('copy');
  }

  render() {
    const props = this.props;
    return <div className="demo-code-preview">
      <div className="ctrl" >
        {
          copySupport ? <Tooltip title="复制代码" placement="left">
            <span onClick={() => { this.copyCode(); }}>
              <Icon type="copy"/>
            </span></Tooltip> : null
        }
        <Tooltip title="全屏查看" placement="right">
          <span onClick={() => { this.fullscreenPreview(); }}>
            <Icon type="arrows-alt"/>
          </span>
        </Tooltip>
      </div>
      <div ref={(el)=>{this.codeCon = el;}}>
        {props.children}
      </div>
    </div>;
  }
};
