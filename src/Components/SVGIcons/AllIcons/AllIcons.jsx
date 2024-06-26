import React from 'react';
import {Modal} from 'antd';

import * as ExportedIcons from '../Icons';

import cn from './AllIcons.module.scss';
import {SVGIcons} from '../SVGIcons';

export class AllIcons extends React.Component {
  setElement = (element) => {
    if (element) {
      this.IconWrapperElement = element;
    }
  };

  onCopy = (type) => () => {
    navigator.clipboard.writeText(type);
  };

  renderIcons = () => {
    return Object.keys(this.icons).map((item, key) => {
      return (
        <div className={cn.tempSVGIcon} key={key}>
          <SVGIcons type={item} />
          <div className={cn.iconLabel}>{item}</div>
          <div className={cn.copyLayer} onClick={this.onCopy(item)}>
            Copy to Clipboard
          </div>
        </div>
      );
    });
  };

  icons = Object.values(ExportedIcons).reduce((accumulator, item) => {
    accumulator[item.iconType] = item;
    return accumulator;
  }, {});

  render = () => {
    return (
      <Modal
        width={'100%'}
        visible={true}
        closable={false}
        footer={''}
        centered>
        <div className={cn.allIconsWrapper}>{this.renderIcons()}</div>
      </Modal>
    );
  };
}
