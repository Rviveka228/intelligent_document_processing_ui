import React from 'react';
import PropTypes from 'prop-types';
import cn from './ExceptionZoneCardBlock.module.scss';
import {Card} from '../../../Components/Card/Card';
import {SVGIcons} from '../../../Components/SVGIcons';

export const ExceptionZoneCardBlock = (props) => {
  return (
    <li onClick={props.onClick}>
      <Card className={cn.exceptionZoneCardBlock}>
        <div className={cn.exceptionZoneCardBlock__inner}>
          <div className={cn.blockIcon}>
            <span>
              <SVGIcons type='SVG-template' />
            </span>
          </div>
          <div className={cn.exceptionContent}>
            <div className={cn.contentHeading}>
              <h3>{'YANG_MING_03'}</h3>
              <div className={cn.exceptionUpdate}>
                <span>Updated By:</span>
                <span>John</span>
              </div>
            </div>
            <ul className={cn.createdDate}>
              <li>
                <div className={cn.createdIcon}>
                  <SVGIcons type='SVG-calender' />
                </div>
                <div className={cn.createdText}>
                  <span>Created On:</span>
                  <span>{props.createdDate}</span>
                </div>
              </li>
              <li>
                <div className={cn.createdIcon}>
                  <SVGIcons type='SVG-calender' />
                </div>
                <div className={cn.createdText}>
                  <span>Last Updated:</span>
                  <span>2023-oct-14</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </li>
  );
};
ExceptionZoneCardBlock.propTypes = {
  /**templateName */
  template_name: PropTypes.string,
  /**createdDate */
  createdDate: PropTypes.string,
  /**onClick */
  onClick: PropTypes.func,
};

ExceptionZoneCardBlock.defaultProps = {};
