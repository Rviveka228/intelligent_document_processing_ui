import React from 'react';
import PropTypes from 'prop-types';
import {Modal, notification} from 'antd';
import {useNavigate} from 'react-router-dom';

import Button from '../../../Components/Button';
import {discardDocument} from '../../../Http/ExceptionZone';
import {ROUTE} from '../../../Routes.constants';
import {Notification} from '../../../Components/Notification';

export const Discard = (props) => {
  const navigate = useNavigate();

  const onClick = () => {
    Modal.confirm({
      content: (
        <>
          Do you want to discard <b>{props?.exceptionPdfDetails?.file_name}</b>?
        </>
      ),
      onOk: onDiscard,
    });
  };

  const onDiscard = async () => {
    try {
      await discardDocument({file_name: props?.exceptionPdfDetails?.file_name});
      Notification({
        type: 'success',
        message: 'Discard successfully',
      });
      navigate(ROUTE.EXCEPTION_ZONE);
    } catch (error) {
      notification.error({
        message: 'Something went wrong!',
      });
    }
  };

  return (
    <Button type='primary' onClick={onClick}>
      Discard Document
    </Button>
  );
};

Discard.propTypes = {
  exceptionPdfDetails: PropTypes.object,
};
