import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'antd';

// import cn from './SelectElement.module.scss';

export function InputBox(props) {
  return (
    <Input
      allowClear={props.allowClear}
      type={props.type}
      maxLength={props.maxLength}
      onChange={props.onChange}
      disabled={props.disabled}
      placeholder={props.placeholderLabel}
      value={props.value}
      onPressEnter={props.onPressEnter}
      id={props.id}
      addonAfter={props.addonAfter}
      className={props.className}
      onBlur={props.onBlur}
      controls={props.controls}
      min={props.min}
      status={props.status}
      name={props.name}
    />
  );
}

InputBox.propTypes = {
  className: PropTypes.string,
  maxLength: PropTypes.number,
  size: PropTypes.string,
  shape: PropTypes.string,
  type: PropTypes.string,
  placeholderLabel: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  addonAfter: PropTypes.any,
  onBlur: PropTypes.func,
  allowClear: PropTypes.bool,
  controls: PropTypes.bool,
  status: PropTypes.any,
  min: PropTypes.number,
  name: PropTypes.string,
  /**
   * The callback function that is triggered when Enter key is pressed
   */
  onPressEnter: PropTypes.func,
  /**
   * Function to trigger while typing on inputbox
   */
  onChange: PropTypes.func,
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

InputBox.defaultProps = {};
