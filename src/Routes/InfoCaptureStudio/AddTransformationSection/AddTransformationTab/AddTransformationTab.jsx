import React from 'react';
import PropTypes from 'prop-types';

import cn from './AddTransformationTab.module.scss';

export const AddTransformationTab = (props) => {
  if (props.indexKey === 0 && !props.selectedValue?.id) {
    props.onClick(props.data);
  }
  return (
    <li
      className={props.selectedValue?.id === props.data?.id ? cn.active : null}
      onClick={() => props.onClick(props.data)}>
      <div className={cn.keyvaultDetails}>
        <h4>{props.data?.field}</h4>
      </div>
    </li>
  );
};

AddTransformationTab.propTypes = {
  templateValues: PropTypes.any,
  data: PropTypes.any,
  onClick: PropTypes.func,
  selectedValue: PropTypes.any,
  indexKey: PropTypes.number,
};
