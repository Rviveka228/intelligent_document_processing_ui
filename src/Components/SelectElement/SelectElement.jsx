import React from 'react';
import {Select} from 'antd';
import PropTypes from 'prop-types';
import cn from './SelectElement.module.scss';
export const SelectElement = (props) => {
  const {
    showSearch,
    onSearch,
    filterOption,
    value,
    placeholder,
    onChange,
    options,
    onSelect,
    mode,
    maxTagCount,
    status,
    loading,
    disabled = false,
    allowClear,
  } = props;

  return (
    <div className={cn.selectBlock}>
      <Select
        allowClear={allowClear}
        showSearch={showSearch}
        onSearch={onSearch}
        filterOption={filterOption}
        value={value}
        className={props.className}
        placeholder={placeholder}
        onChange={onChange}
        onSelect={onSelect}
        options={options}
        mode={mode}
        maxTagCount={maxTagCount}
        status={status}
        loading={loading}
        disabled={loading || disabled}
        searchValue={props.searchValue}
        defaultValue={props.defaultValue}
        onKeyDown={props.onKeyDown}
      />
    </div>
  );
};

SelectElement.propTypes = {
  showSearch: PropTypes.bool,
  className: PropTypes.string,
  onSearch: PropTypes.func,
  filterOption: PropTypes.any,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  mode: PropTypes.any,
  maxTagCount: PropTypes.any,
  status: PropTypes.any,
  loading: PropTypes.any,
  disabled: PropTypes.bool,
  allowClear: PropTypes.bool,
  searchValue: PropTypes.string,
  defaultValue: PropTypes.string,
  onKeyDown: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    })
  ),
};
