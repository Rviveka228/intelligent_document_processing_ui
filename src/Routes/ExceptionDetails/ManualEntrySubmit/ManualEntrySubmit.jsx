import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from '../../../Components/Button';
import {manualEntry} from '../../../Http/ExceptionZone';
import {Notification} from '../../../Components/Notification';
import {useNavigate} from 'react-router-dom';
import {ROUTE} from '../../../Routes.constants';
import {Modal, notification} from 'antd';

export const ManualEntrySubmit = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const isAllGood = () => {
    const qualityList = Object.values(props.dataQualityValue ?? {});
    return qualityList.every((item) => item === 'GOOD') && !!qualityList.length;
  };

  const onManualEntrySubmit = () => {
    if (isAllGood()) {
      submitManualEntry();
    } else {
      Modal.confirm({
        content: (
          <>Data quality is not good for all fields. Do you want to continue </>
        ),
        onOk: submitManualEntry,
        centered: true,
      });
    }
  };

  const submitManualEntry = async () => {
    try {
      setLoading(true);
      let payload = {
        config_id: props.exceptionPdfDetails?.config_id,
        objects: [props.manualEntryValue],
      };
      await manualEntry(payload);
      Notification({
        type: 'success',
        message: 'Saved Successfully',
      });
      navigate(ROUTE.EXCEPTION_ZONE);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Something went wrong!',
      });
    }
  };

  return (
    <>
      <Button type='primary' loading={loading} onClick={onManualEntrySubmit}>
        Submit
      </Button>
    </>
  );
};
ManualEntrySubmit.propTypes = {
  manualEntryValue: PropTypes.object,
  exceptionPdfDetails: PropTypes.object,
  dataQualityValue: PropTypes.object,
};
