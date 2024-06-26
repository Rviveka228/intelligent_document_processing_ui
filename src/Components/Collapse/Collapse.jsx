import React from 'react';
import PropTypes from 'prop-types';
import {Collapse as AntdCollapse} from 'antd';
import './Collapse.scss';
export const Collapse = (props) => (
  <AntdCollapse
    defaultActiveKey={props.defaultActiveKey || ['1']}
    accordion={props.accordion || false}
    ghost={props.ghost || false}
    className={props.className}
    items={props.items}
    bordered={props.bordered || true}
  />
);

Collapse.propTypes = {
  items: PropTypes.array.isRequired,
  ghost: PropTypes.bool,
  className: PropTypes.string,
  bordered: PropTypes.bool,
  accordion: PropTypes.bool,
  defaultActiveKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf([PropTypes.string, PropTypes.number]),
  ]),
};
