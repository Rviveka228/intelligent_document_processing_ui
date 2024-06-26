import React from 'react';
import PropTypes from 'prop-types';
import cn from './CardFooter.module.scss';

export const CardFooter = (props) => {
  return (
    <div className={`${cn.cardFooter} ${props.className}`}>
      {props.children}
    </div>
  );
};

CardFooter.propTypes = {
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

CardFooter.defaultProps = {};
