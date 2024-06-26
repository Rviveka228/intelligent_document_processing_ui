import {Modal, notification} from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import {Notification} from '../../../../Components/Notification';
import {deleteUser} from '../../../../Http/User';
import {SVGIcons} from '../../../../Components/SVGIcons';
import cn from './UserDelete.module.scss';
export const UserDelete = (props) => {
  const onDropUser = () => {
    Modal.confirm({
      content: (
        <>
          Do you want to Delete <b>{props.data?.userName}</b>?
        </>
      ),
      onOk: onDelete,
    });
  };
  const onDelete = async () => {
    try {
      await deleteUser({id: props.data?.id});
      Notification({
        type: 'success',
        message: 'Delete successfully',
      });
      props.getUsersList();
    } catch (error) {
      notification.error({
        message: 'Something went wrong!',
      });
    }
  };

  return (
    <>
      <span className={cn.deleteIcon} onClick={onDropUser}>
        <SVGIcons type='SVG-delete' />
      </span>
    </>
  );
};

UserDelete.propTypes = {
  data: PropTypes.object,
  getUsersList: PropTypes.func,
};

UserDelete.defaultProps = {};
