import React from 'react';
import {Tooltip as AntdToolTip} from 'antd';
import PropTypes from 'prop-types';
import cn from './ToolTip.module.scss';
export const ToolTip = (props) => (
  <AntdToolTip title={props.toolTipText}>
    <div className={cn.tooltipInner}>{props.children}</div>
  </AntdToolTip>
);

ToolTip.propTypes = {
  toolTipText: PropTypes.string,
  children: PropTypes.any,
};
