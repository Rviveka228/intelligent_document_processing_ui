import React from 'react';
import PropTypes from 'prop-types';
import {Card} from '../../../../Components/Card/Card';
import cn from './TemplateCard.module.scss';
import {SVGIcons} from '../../../../Components/SVGIcons';
import {trimText} from '../../../../Utils/commonUtils';
import {ToolTip} from '../../../../Components/ToolTip/ToolTip';

export const TemplateCard = (props) => {
  return (
    <li onClick={props.onClick}>
      <Card className={cn.templateCard}>
        <div className={cn.templateBlock}>
          <div className={cn.templateIcon}>
            <span>
              <SVGIcons type='SVG-template' />
            </span>
          </div>
          <div className={cn.templateContent}>
            <div className={cn.contentHeading}>
              <ToolTip
                toolTipText={
                  props.template_name.length >= 20 ? props.template_name : ''
                }>
                <h3>{trimText(props.template_name, 20)}</h3>
              </ToolTip>
              <div className={cn.templateUpdated}>
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
TemplateCard.propTypes = {
  /**templateName */
  template_name: PropTypes.string,
  /**createdDate */
  createdDate: PropTypes.string,
  /**onClick */
  onClick: PropTypes.func,
};

TemplateCard.defaultProps = {};
