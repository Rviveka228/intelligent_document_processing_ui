import React from 'react';
import { Checkbox } from 'antd';
import PropType from 'prop-types';
import cn from './CheckboxGroup.module.scss';
const CheckBoxGroup = (props) => {
  return (
    <Checkbox.Group
      onChange={props.onChange}>
      <ul className={cn.checkItemlist}>
        {props.checkBoxData.map((data, index) => {
          return (
            <li key={index}>
              <Checkbox value={data.value}>{data.label}</Checkbox>
            </li>
          );
        })}
      </ul>
    </Checkbox.Group>
  );
};

CheckBoxGroup.propTypes = {
  onChange: PropType.func,
  checkBoxData: PropType.array,
};

export default CheckBoxGroup;
