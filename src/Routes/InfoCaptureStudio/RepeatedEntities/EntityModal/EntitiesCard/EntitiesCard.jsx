import React, {useState} from 'react';
import PropType from 'prop-types';
import {SelectElement} from '../../../../../Components/SelectElement/SelectElement';
import {InputBox} from '../../../../../Components/InputBox/InputBox';
import {Radio} from 'antd';
import {ORIENTATION_LIST, PRESENCE_TYPE} from './EntitiesCard.constants';

import cn from './EntitiesCard.module.scss';
export const EntitiesCard = (props) => {
  const [entityFields, setEntityFields] = useState(props.dataItem);

  const onDropDownChange = (type) => (value) => {
    const updatedEntities = {...entityFields, [type]: value};
    props.onChange(updatedEntities);
    setEntityFields(updatedEntities);
  };

  const onDropDownFieldChange = (type) => (value) => {
    const field = props.documentFields.find(
      (fItem) => fItem.value === value
    )?.label;
    const updatedEntities = {...entityFields, [type]: field};
    props.onChange(updatedEntities);
    setEntityFields(updatedEntities);

    const selectedFields = props.documentFields?.filter(
      (item) => item.value === value
    );

    const uniqueSelectedFields = selectedFields.filter(
      (selectedField) =>
        !props.repeatedEntityFields.some(
          (field) => field.label === selectedField.label
        )
    );
    props.setRepeatedEntityFields([
      ...props.repeatedEntityFields,
      ...uniqueSelectedFields,
    ]);
  };

  const onInputChange = (type) => (event) => {
    const updatedEntities = {...entityFields, [type]: event.target?.value};
    props.onChange(updatedEntities);
    setEntityFields(updatedEntities);
  };

  return (
    <ul className={cn.entryList}>
      <li>
        <span>Field</span>
        <SelectElement
          placeholder='Select Field'
          value={entityFields?.field}
          options={props.documentFields}
          onChange={onDropDownFieldChange('field')}
        />
      </li>
      <li>
        <span>Presence Type</span>
        <SelectElement
          placeholder='Select Presence Type'
          value={entityFields?.presenceValue}
          options={PRESENCE_TYPE}
          onChange={onDropDownChange('presenceValue')}
        />
      </li>
      {entityFields?.presenceValue === 'labelDocument' && (
        <li>
          <span>Label in document</span>
          <InputBox
            value={entityFields?.label_in_document}
            onChange={onInputChange('label_in_document')}
            placeholderLabel='Label in document'
          />
        </li>
      )}
      {entityFields?.presenceValue === 'relativeField' && (
        <li>
          <span>Relative Field</span>
          <SelectElement
            placeholder='Select Relative Field'
            value={entityFields?.relative_field}
            options={props.documentFields}
            onChange={onDropDownFieldChange('relative_field')}
          />
          <span>Relative field presence count</span>
          <InputBox
            value={entityFields?.relative_field_presence_count}
            onChange={onInputChange('relative_field_presence_count')}
            placeholderLabel='Relative field presence count'
          />
        </li>
      )}
      {entityFields?.presenceValue === 'labelDocument' && (
        <li>
          Multiple titles:
          <Radio.Group
            value={entityFields?.multiple_titles}
            onChange={onInputChange('multiple_titles')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </li>
      )}
      <li>
        <span>Value orientation</span>
        <SelectElement
          placeholder='Select Value orientation '
          value={entityFields?.value_orientation}
          onChange={onDropDownChange('value_orientation')}
          options={ORIENTATION_LIST}
        />
      </li>
    </ul>
  );
};

EntitiesCard.propTypes = {
  documentFields: PropType.array,
  onChange: PropType.func,
  dataItem: PropType.object,
  setRepeatedEntityFields: PropType.func,
  repeatedEntityFields: PropType.array,
};
