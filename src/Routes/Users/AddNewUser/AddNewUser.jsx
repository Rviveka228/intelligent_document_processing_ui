import {Button} from 'antd';
import React, {useState} from 'react';
import {AddNewUserModal} from './AddNewUserModal/AddNewUserModal';
import PropTypes from 'prop-types';

export const AddNewUser = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button onClick={open} type='primary'>
        Add new User
      </Button>

      {isOpen && (
        <AddNewUserModal getUsersList={props.getUsersList} onCancel={close} />
      )}
    </>
  );
};

AddNewUser.propTypes = {
  getUsersList: PropTypes.func,
};

AddNewUser.defaultProps = {};
