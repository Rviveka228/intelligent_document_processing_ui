import {UserDelete} from './UserDelete/UserDelete';

export const getUsersTableList = (getUsersList) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'userName',
      width: '20%',
      editable: false,
    },
    {
      title: 'Action',
      dataIndex: '',
      width: '20%',
      editable: false,
      render: (data) => <UserDelete getUsersList={getUsersList} data={data} />,
    },
  ];
  return columns;
};
