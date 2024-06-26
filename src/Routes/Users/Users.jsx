/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
// eslint-disable-next-line no-unused-vars
import cn from './Users.module.scss';
import PageContent from '../../Components/PageContent';
import Container from '../../Components/Container/Container';
import PageHeading from '../../Components/PageHeading/PageHeading';
import {Table} from 'antd';
import {getUsersTableList} from './UsersTable/UsersTable';
import {getUser} from '../../Http/User';
import {useSession} from '../../Components/SecuredLayout';
import {AddNewUser} from './AddNewUser/AddNewUser';
import {Loader} from '../../Components/Loader';
import {getUserListFormattedData} from './user.helpers';

export const Users = () => {
  const session = useSession();
  const [loading, seLoading] = useState(false);
  const [error, setError] = useState();
  const [usersList, setUserList] = useState([]);

  const getUsersList = async () => {
    try {
      seLoading(true);
      const response = await getUser();
      const userListData = getUserListFormattedData(response?.data?.data);
      setUserList(userListData);
      seLoading(false);
    } catch (error) {
      setError(error);
      seLoading(false);
    }
  };
  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <PageContent>
      <Container>
        <PageHeading text='User Listing'>
          <AddNewUser getUsersList={getUsersList} />
        </PageHeading>
        {loading ? (
          <Loader visible />
        ) : (
          <>
            <Table
              dataSource={usersList}
              columns={getUsersTableList(getUsersList)}
              pagination={true}
            />
          </>
        )}
      </Container>
    </PageContent>
  );
};
