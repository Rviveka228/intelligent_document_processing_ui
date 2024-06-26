import React from 'react';
import PropTypes from 'prop-types';
import cn from './LabelWrapper.module.scss';

export const LabelWrapper = (props) => {
  return (
    <div className={cn.labelWrapper}>
      <label data-role='label' className={cn.labelWrapper__label}>
        {props.label}
      </label>
      {props.children}
    </div>
  );
};
LabelWrapper.propTypes = {
  children: PropTypes.any,
  label: PropTypes.any,
};
