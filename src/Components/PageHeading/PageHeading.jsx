import React from 'react';
import PropTypes from 'prop-types';
import cn from './PageHeading.module.scss';
const PageHeading = (props) => {
  return (
    <section className={cn.pageHeader}>
      <div className={cn.headerTitle}>
        <div className={cn.titleBlock}>
          <h3>{props.text}</h3>
          {/* {props.subtitle && <p>{props.subtitle}</p>} */}
        </div>
        <div className={cn.titleControls}>{props.children}</div>
      </div>
      <div className={cn.headerExtras}>{props.controls}</div>
    </section>
  );
};

export default PageHeading;

PageHeading.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node]),
  ]),
  /**
   * Children
   */

  controls: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  ]),
};

