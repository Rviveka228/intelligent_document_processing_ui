import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../../Components/Button';
import {Notification} from '../../../Components/Notification';

import {reProcessingUpload} from '../../../Http/ExceptionZone';

import {ROUTE} from '../../../Routes.constants';

export const RescheduleBlock = (props) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onReProcessClick = async () => {
    try {
      setLoading(true);
      await reProcessingUpload({
        object_key: props?.exceptionPdfDetails?.failed_object_key,
      });
      navigate(ROUTE.EXCEPTION_ZONE);
      Notification({
        type: 'success',
        message: 'Re-process scheduled  successfully',
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Notification({
        type: 'error',
        message: error.message || 'Re-process scheduled  failed',
      });
    }
  };

  return (
    <Button
      loading={loading}
      disabled={props.exceptionPdfDetails?.reRunning}
      type='primary'
      onClick={onReProcessClick}>
      {props.exceptionPdfDetails?.reRunning
        ? 'Re-process scheduled'
        : 'Schedule re-run '}
    </Button>
  );
};
RescheduleBlock.propTypes = {
  exceptionPdfDetails: PropTypes.object,
  getExceptionZone: PropTypes.func,
};
