import React, {useEffect, useState} from 'react';
import {Table} from 'antd';

import PageContent from '../../Components/PageContent';
import Container from '../../Components/Container/Container';
import EmptyState, {TYPES} from '../../Components/EmptyState/EmptyState';
import {Loader} from '../../Components/Loader';
import {ExceptionZoneHeader} from './ExceptionZoneHeader/ExceptionZoneHeader';
import {getExceptionZoneTableList} from './ExceptionZoneTable/ExceptionZoneTable';

import {getExceptionZoneList} from '../../Http/ExceptionZone';
import {getFormattedExceptionZoneData} from './ExceptionZone.helpers';

import cn from './ExceptionZone.module.scss';

export const ExceptionZone = () => {
  const [loading, seLoading] = useState(false);
  const [error, setError] = useState();
  const [exceptionZoneData, setExceptionZoneData] = useState([]);

  const getExceptionZone = async () => {
    try {
      seLoading(true);
      const response = await getExceptionZoneList();
      const tableData = getFormattedExceptionZoneData(response?.data);
      setExceptionZoneData(tableData);
      seLoading(false);
    } catch (error) {
      setError(error);
      seLoading(false);
    }
  };

  // const onRowClick = (record) => {
  //   navigate(`${ROUTE.EXCEPTION_ZONE}/${record.configId}`);
  // };

  useEffect(() => {
    getExceptionZone();
  }, []);

  return (
    <PageContent>
      <Container>
        <div className={cn.exceptionZone}>
          <div className={cn.exceptionZone__content}>
            <ExceptionZoneHeader />
            {loading ? (
              <Loader visible />
            ) : error ? (
              <EmptyState
                title={error ? 'Something went wrong' : 'No data found'}
                description={''}
                type={TYPES.RESULTS}
              />
            ) : (
              <Table
                dataSource={exceptionZoneData}
                columns={getExceptionZoneTableList(getExceptionZone)}
                pagination={true}
                // onRow={(record) => {
                //   return {
                //     onClick: () => onRowClick(record),
                //   };
                // }}
              />
            )}
          </div>
        </div>
      </Container>
    </PageContent>
  );
};
