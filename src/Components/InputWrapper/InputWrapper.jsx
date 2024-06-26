import React from 'react';
import PropTypes from 'prop-types';

import cn from './InputWrapper.module.scss';

export const InputWrapper = (props) => {
  return (
    <div className={cn.inputWrapper}>
      <label data-role='label' className={cn.inputWrapper__label}>
        {props.label}
      </label>
      {!!props.error && (
        <span className={cn.inputWrapper__error}>{props.error}</span>
      )}
      {props.children}
    </div>
  );
};

InputWrapper.propTypes = {
  children: PropTypes.any,
  label: PropTypes.any,
  error: PropTypes.any,
};

InputWrapper.defaultProps = {};
