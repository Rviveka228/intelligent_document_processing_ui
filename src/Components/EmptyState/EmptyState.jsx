import React from 'react';
import PropTypes from 'prop-types';

import {SVGIcons} from '../SVGIcons';

import search from '../../Assest/Image/empty-state/no-search.png';
import results from '../../Assest/Image/empty-state/no-data.png';


import cn from './EmptyState.module.scss';

const EmptyState = (props) => {
  const renderIcon = () => {
    return (
      !!props.iconType && (
        <span className={cn.emptyIconprogress}>
          <SVGIcons type={props.iconType} />
        </span>
      )
    );
  };

  let customStyle = {};
  if (props.customHeight) {
    customStyle = {
      minHeight: props.customHeight,
    };
  }
  const className = `${cn.emptyState} ${props.className}
    ${props.size ? cn['state' + props.size] : ''}`;
  return (
    <div className={className} style={customStyle} ref={props.emptyRef}>
      <div className={cn.stateContent}>
        {!!IMAGES[props.type] && (
          <div className={cn.stateToppane}>
            <span className={cn.emptyImage}>
              <img src={IMAGES[props.type]} alt='logo' />
            </span>
          </div>
        )}
        <div className={cn.stateContentpane}>
          {(!!props.iconType || !!props.title) && (
            <h3>
              {renderIcon()}
              <span>{props.title}</span>
            </h3>
          )}
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
};
export default EmptyState;
export const TYPES = {
  RESULTS: 'results',
  SEARCH:'search'
};
const IMAGES = {
  [TYPES.RESULTS]: results,
  [TYPES.SEARCH]: search,
};

EmptyState.propTypes = {
  /**
   * customHeight
   */
  customHeight: PropTypes.string,
  /**
   * type for image
   */
  type: PropTypes.string,
  /**
   * title
   */
  title: PropTypes.string,
  /**
   * size for size
   */
  description: PropTypes.string,
  /**
   * ClassName
   */
  className: PropTypes.string,
  /**
   * empty state reference
   */
  emptyRef: PropTypes.func,
  /**
   * size of text
   */
  size: PropTypes.oneOf(['extrasmall', 'small', 'large']),
  /**
   * SVG Icon type
   */
  iconType: PropTypes.string,
};

EmptyState.defaultProps = {
  className: '',
};
