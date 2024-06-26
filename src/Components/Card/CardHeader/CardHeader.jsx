import React from 'react';
import PropTypes from 'prop-types';

import style from './CardHeader.module.scss';

export const CardHeader = (props) => {
  const {className = '', children} = props;
  return (
    <div {...props} className={`${style.cardHeader} ${className}`}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
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

CardHeader.defaultProps = {};
