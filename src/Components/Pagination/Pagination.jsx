import React from 'react';
import {Pagination as AntdPagination} from 'antd';
import PropTypes from 'prop-types';
import './Pagination.scss';
export const Pagination = (props) => {
 

  const onChange = (page) => {
    props.onChange(page);
  };
  return (
    <AntdPagination
      defaultCurrent={1}
      current={props.current}
      onChange={onChange}
      total={props.total}
      showSizeChanger={false}
      pageSize={props.defaultPageSize ?? 10}
    />
  );
};

Pagination.propTypes = {
  onChange: PropTypes.func,
  total: PropTypes.number,
  current: PropTypes.number,
  defaultPageSize: PropTypes.number,
};
