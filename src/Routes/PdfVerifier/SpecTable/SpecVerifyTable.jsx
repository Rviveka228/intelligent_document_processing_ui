/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'antd';

import {Collapse} from '../../../Components/Collapse';
import {
  reviewDataSource,
  reviewTableColumns,
} from '../../InfoCaptureStudio/Helpers/utility';
import cn from './SpecVerifyTable.module.scss';
export const SpecVerifyTable = (props) => {
  return (
    <>
      <div className={cn.spaceWrapper}>
        {props.data.map((data, index) => {
          const items = [
            {
              key: `${index}-child-pane`,
              label: `Order ${index + 1}`,
              children: (
                <div key={index}>
                  <Table
                    bordered
                    rowKey={'field'}
                    dataSource={reviewDataSource(data)}
                    columns={reviewTableColumns}
                    pagination={false}
                  />
                </div>
              ),
            },
          ];
          return <Collapse items={items} key={index} accordion={true} />;
        })}
      </div>
    </>
  );
};

SpecVerifyTable.propTypes = {
  /**
   * Data of the validation property
   */
  data: PropTypes.any,
};
