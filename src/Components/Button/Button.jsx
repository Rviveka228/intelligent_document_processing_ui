import React from 'react';
import PropTypes from 'prop-types';
import {Button as B} from 'antd';

import './Button.scss';

export function Button(props) {
  return (
    <B
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      variant={props.variant}
      className={props.className}
      danger={props.danger}
      size={props.size}
      shape={props.shape}
      icon={props.icon}
      loading={props.loading}
      type={props.type || null}>
      {props.children}
    </B>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  danger: PropTypes.bool,
  size: PropTypes.string,
  shape: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.any,
  /**
   * Function to trigger when on clicking the button
   */
  onClick: PropTypes.func,
  /**
   * To check the button is disabled
   */
  disabled: PropTypes.bool,
  /**
   * To determine weather the button is loading
   */
  loading: PropTypes.bool,
  /**
   * Variant of the button
   */
  variant: PropTypes.string,
};

Button.defaultProps = {};
