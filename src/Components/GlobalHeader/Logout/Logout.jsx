import React from 'react';
import {SVGIcons} from '../../SVGIcons';
import {Modal, Tooltip} from 'antd';
import {logoutUser} from '../../../Http/User';
import cn from './Logout.module.scss';

export const Logout = () => {
  const onClick = () => {
    Modal.confirm({
      title: 'Are you sure?',
      content: 'Do you want to logout',
      onOk: logout,
    });
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      localStorage.clear();
      window.dispatchEvent(new Event('localStorage'));
    }
  };

  return (
    <Tooltip title='Logout'>
      <span className={cn.logoutButton} onClick={onClick}>
        <SVGIcons type='SVG-logout' />
      </span>
    </Tooltip>
  );
};
