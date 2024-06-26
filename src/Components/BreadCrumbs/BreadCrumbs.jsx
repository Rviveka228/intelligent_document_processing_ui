import React from 'react';
import {Breadcrumb} from 'antd';
import PropTypes from 'prop-types';
import './BreadCrumbs.scss';

export const BreadCrumbs = (props) => {
  return (
    <Breadcrumb>
      {props.data.length > 0 &&
        props.data.map((item, index) => (
          <Breadcrumb.Item key={index}>
            <span onClick={() => props.onClick(item.name)}>{item.name}</span>
          </Breadcrumb.Item>
        ))}
    </Breadcrumb>
  );
};

BreadCrumbs.propTypes = {
  /**
   * data
   */
  data: PropTypes.any,
  /**onClick
   *
   */
  onClick: PropTypes.func,
};

BreadCrumbs.defaultProps = {};
