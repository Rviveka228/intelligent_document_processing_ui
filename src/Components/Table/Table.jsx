import React from 'react';
import PropTypes from 'prop-types';
import {Table as AntdTable} from 'antd';
import './style.scss';
export const Table = ({
  columns,
  dataSource,
  rowKey,
  scroll,
  pagination = true,
}) => (
  <AntdTable
    columns={columns}
    dataSource={dataSource}
    rowKey={rowKey}
    scroll={scroll}
    pagination={pagination}
  />
);

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      // Define the shape of each column
      key: PropTypes.string.isRequired,
      // ... other column properties
    })
  ).isRequired,
  dataSource: PropTypes.array.isRequired,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  scroll: PropTypes.object,
  pagination: PropTypes.bool,
};
