import React, {useState} from 'react';
import {createSearchParams, useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';

import {SelectElement} from '../../../Components/SelectElement/SelectElement';

import {
  ACTION_OPTIONS_LIST,
  ACTION_OPTIONS_LIST_WITHOUT_UPDATE,
} from './Actions.constants';

import cn from './Actions.module.scss';
import {Modal, notification} from 'antd';
import {discardDocument} from '../../../Http/ExceptionZone';
import {ROUTE} from '../../../Routes.constants';
import {Notification} from '../../../Components/Notification';

export const Actions = (props) => {
  const navigate = useNavigate();
  const [value, setValue] = useState();

  const onChange = (value) => {
    setValue(value);
    props.onChange(value);
    switch (value) {
      case 'dropDocument':
        dropDocument();
        break;
      case 'newTemplate':
        navigate({
          pathname: ROUTE.CAPTURE_STUDIO,
          search: createSearchParams(
            qs.stringify({
              docId: props.exceptionPdfDetails?.document_id,
              url: props.exceptionPdfDetails?.s3_url,
            })
          ).toString(),
        });
        break;
    }
  };

  const dropDocument = () => {
    Modal.confirm({
      content: (
        <>
          Do you want to discard <b>{props.exceptionPdfDetails?.file_name}</b>?
        </>
      ),
      onOk: onDiscard,
    });
  };

  const onDiscard = async () => {
    try {
      await discardDocument({config_id: props?.exceptionPdfDetails?.config_id});
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
    <div className={cn.exceptionAction}>
      <SelectElement
        allowClear
        onChange={onChange}
        placeholder='Action'
        value={value}
        options={
          props?.exceptionPdfDetails?.applied_template
            ? ACTION_OPTIONS_LIST
            : ACTION_OPTIONS_LIST_WITHOUT_UPDATE
        }
      />
    </div>
  );
};
Actions.propTypes = {
  onChange: PropTypes.func,
  exceptionPdfDetails: PropTypes.object,
};
