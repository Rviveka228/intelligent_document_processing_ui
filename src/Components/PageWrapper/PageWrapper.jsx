import React from 'react';
import PropTypes from 'prop-types';
import cn from './PageWrapper.module.scss';
export default function PageWrapper(props) {
  return <div className={cn.mainWrapper}>{props.children}</div>;
}
PageWrapper.propTypes = {
  /**
   * child components to render in PageWrapper
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.any,
  ]),
};
