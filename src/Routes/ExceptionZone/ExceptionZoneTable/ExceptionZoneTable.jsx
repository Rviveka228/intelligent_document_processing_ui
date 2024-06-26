// import {Action} from '../../ExceptionDetails/Action';

import {ExceptionView} from './ExceptionView/ExceptionView';

// eslint-disable-next-line no-unused-vars
export const getExceptionZoneTableList = (getExceptionZone) => {
  const columns = [
    {
      title: 'Pdf Name',
      dataIndex: 'pdfName',
      width: '20%',
      editable: false,
    },
    {
      title: 'Process Start Time ',
      dataIndex: 'processStartDate',
      width: '20%',
      editable: false,
    },
    {
      title: 'Process Failed Time',
      dataIndex: 'processFailedDate',
      width: '20%',
      editable: false,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '20%',
      editable: false,
      // render: (data) => (
      //   <Action getExceptionZone={getExceptionZone} data={data} />
      // ),
    },
    {
      title: 'Actions',
      dataIndex: '',
      width: '20%',
      editable: false,
      render: (data) => (
        <ExceptionView getExceptionZone={getExceptionZone} data={data} />
      ),
    },
  ];
  return columns;
};
