import React from 'react';
import PropTypes from 'prop-types';
import cn from './CardCover.module.scss';

export const CardCover = (props) => {
  const { className = '', children } = props;
  return (
    <div {...props} className={`${cn.cardCover} ${className}`}>
      {children}
    </div>
  );
};

CardCover.propTypes = {
  /**
   * children
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array,
  ]),
  /**
   * onClick
   */
  onClick: PropTypes.func,
  /**
   * className
   */
  className: PropTypes.string,
};

CardCover.defaultProps = {};
