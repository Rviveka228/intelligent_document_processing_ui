import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ModalWindow from '../../../../Components/ModalWindow/ModalWindow';
import {InputBox} from '../../../../Components/InputBox/InputBox';
import {SelectElement} from '../../../../Components/SelectElement/SelectElement';
import {OPTIONS} from '../AddNewUser.constants';
import {addNewUser} from '../../../../Http/User';
import cn from './AddNewUserModal.module.scss';
import {Notification} from '../../../../Components/Notification';
export const AddNewUserModal = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: null,
    admin: null,
  });

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setUserData((prevData) => ({
      ...prevData,
      admin: value,
    }));
  };
  const onOk = async () => {
    try {
      setLoading(true);
      await addNewUser(userData);
      props.getUsersList();
      props.onCancel();
      Notification({
        type: 'success',
        message: 'New user added',
      });
    } catch (error) {
      setLoading(false);
      Notification({
        type: 'error',
        message: error?.response?.data?.msg || 'Something went wrong',
      });
      props.onCancel();
    }
  };

  return (
    <ModalWindow
      open={true}
      onCancel={props.onCancel}
      onOk={onOk}
      isNotClosable={false}>
      <ul className={cn.addUser}>
        <li>
          <InputBox
            name='username'
            placeholderLabel='Email'
            value={userData.username}
            onChange={handleInputChange}
          />
        </li>
        <li>
          <SelectElement
            placeholder='Select user type'
            options={OPTIONS}
            value={userData.admin}
            onChange={handleSelectChange}
          />
        </li>
      </ul>
    </ModalWindow>
  );
};

AddNewUserModal.propTypes = {
  onCancel: PropTypes.func,
  getUsersList: PropTypes.func,
};

AddNewUserModal.defaultProps = {};
