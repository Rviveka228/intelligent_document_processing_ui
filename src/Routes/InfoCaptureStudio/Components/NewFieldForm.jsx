/* eslint-disable no-console */
import React from 'react';
import PropType from 'prop-types';
import {SelectElement} from '../../../Components/SelectElement/SelectElement';

// import cn from './Helpers.module.scss';
const NewFieldForm = ({
  note,
  selectedFieldValues,
  keys,
  handleSelectFieldValue,
}) => {
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <div>
      <SelectElement
        showSearch
        filterOption={filterOption}
        value={selectedFieldValues[note.id]}
        placeholder='Select the new field name'
        onSelect={(value) => {
          handleSelectFieldValue(value, note.id);
        }}
        options={keys.map((key) => {
          return {
            value: key,
            label: key,
          };
        })}
      />
    </div>
  );
};

NewFieldForm.propTypes = {
  note: PropType.any,
  selectedFieldValues: PropType.any,
  keys: PropType.array,
  showFieldMapForm: PropType.any,
  handleSelectFieldValue: PropType.func,
};
export default NewFieldForm;
