import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Radio} from 'antd';
import ModalWindow from '../../../Components/ModalWindow/ModalWindow';
import cn from './AddTemplateProperties.module.scss';

export const AddTemplateProperties = (props) => {
  const [data, setData] = useState({
    multiple: true,
    onlyFirstPage: true,
  });
  const [value, setValue] = useState(true);

  const onMultipleChange = (event) => {
    setData((prev) => ({...prev, multiple: event.target.value}));
  };

  const onIsFirstChange = (event) => {
    setData((prev) => ({...prev, onlyFirstPage: event.target.value}));
  };

  useEffect(() => {
    setData(props.templatePropertyFlag);
  }, [props.templatePropertyFlag]);

  return (
    <ModalWindow
      open
      width='640px'
      title='Template properties'
      onOk={() => props.handleOk(data)}
      onCancel={props.onCancel}>
      <div className={cn.addTemplatePropertiesWrapper}>
        <ul className={cn.addTemplatePropertiesList}>
          <li>
            Have multiple Primary fields :
            <Radio.Group
              className={cn.templateRadioGroup}
              value={data.multiple}
              onChange={onMultipleChange}>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </li>
          {data.multiple && (
            <li className={cn.nestedProperty}>
              One primary fields details per page Yes / No:
              <Radio.Group
                className={cn.templateRadioGroup}
                value={value}
                onChange={(event) => setValue(event.target.value)}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </li>
          )}
          <li>
            Consider only first Page :
            <Radio.Group
              className={cn.templateRadioGroup}
              value={data.onlyFirstPage}
              onChange={onIsFirstChange}>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </li>
        </ul>
      </div>
    </ModalWindow>
  );
};

AddTemplateProperties.propTypes = {
  handleOk: PropTypes.func,
  templatePropertyFlag: PropTypes.shape({
    multiple: PropTypes.bool,
    onlyFirstPage: PropTypes.bool,
  }),
  onCancel: PropTypes.func,
};
