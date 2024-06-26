import React from 'react';
import PropTypes from 'prop-types';

import SuspenseLoader from '../SuspenseLoader';

import cn from './Loader.module.scss';

export function Loader(props) {
  return (
    <>
      {props.visible && (
        <div style={{minHeight: props.customHeight}} className={cn.loaderBlock}>
          <p className={cn.loadingtext}>{props.loadingText}</p>
          <SuspenseLoader
            speed={1}
            style={{margin: '0px', position: 'relative', inset: '0px'}}
            size={'large'}
          />
        </div>
      )}
    </>
  );
}

Loader.propTypes = {
  visible: PropTypes.bool,
  loadingText: PropTypes.string,
  customHeight: PropTypes.string,
};
