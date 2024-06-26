import React from 'react';
import PropsType from 'prop-types';
import moment from 'moment';
import cn from './TypeCard.module.scss';
import {Card} from '../../../Components/Card/Card';
import {SVGIcons} from '../../../Components/SVGIcons';
import {trimText} from '../../../Utils/commonUtils';
import {ToolTip} from '../../../Components/ToolTip';

// eslint-disable-next-line no-unused-vars
export const TypeCard = (props) => {
  // const [showViewMore, setShowViewMore] = useState(true);
  return (
    <li onClick={props.onClick}>
      <Card className={cn.documentCard}>
        <div className={cn.documentBlock}>
          <div className={cn.documentIcon}>
            <span>
              <SVGIcons type='SVG-template' />
            </span>
          </div>
          <div className={cn.documentContent}>
            <div className={cn.contentHeading}>
              <ToolTip
                toolTipText={
                  props.data.name.length >= 20 ? props.data.name : ''
                }>
                <h3>{trimText(props.data.name, 20)}</h3>
              </ToolTip>
              <div className={cn.documentUpdated}>
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
                  <span>
                    {moment
                      .unix(props.data?.created_time)
                      .format('YYYY-MMM-DD')}
                  </span>
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
TypeCard.propTypes = {
  data: PropsType.any,
  onClick: PropsType.func,
};
