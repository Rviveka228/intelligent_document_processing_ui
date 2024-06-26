import React from 'react';
import PropTypes from 'prop-types';
import cn from './PageBody.module.scss';
export default function PageBody(props) {
  const className = `${cn.pageBody} ${cn[props.collapse ? 'collapse' : '']}`;
  return <div className={className}>{props.children}</div>;
}

PageBody.propTypes = {
  className: PropTypes.string,
  collapse: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.array,
      ])
    ),
  ]),
};
