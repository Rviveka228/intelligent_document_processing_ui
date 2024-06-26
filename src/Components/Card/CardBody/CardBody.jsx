import React from 'react';
import PropTypes from 'prop-types';
import cn from './CardBody.module.scss';

export const CardBody = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`${cn.cardBody} ${props.className}`}>
      {props.children}
    </div>
  );
};

CardBody.propTypes = {
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

CardBody.defaultProps = { className: '' };
