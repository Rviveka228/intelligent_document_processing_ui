import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import cn from './ExceptionPdfDetails.module.scss';
export const ExceptionPdfDetails = (props) => {
  return (
    <div className={cn.dataDetails}>
      <ul  className={cn.dataDetails__list}>
        <li>
          <span>Pdf Name: {props.exceptionPdfDetails.file_name}</span>
        </li>
        <li>
          <span>
            Process Start Time :
            {moment
              .unix(props.exceptionPdfDetails.process_start_time)
              .format('YYYY-MMM-DD - HH:mm:ss')}{' '}
          </span>
        </li>
        <li>
          <span>
            Process End Time :
            {moment
              .unix(props.exceptionPdfDetails.process_failed_time)
              .format('YYYY-MMM-DD - HH:mm:ss')}{' '}
          </span>
        </li>
      </ul>
    </div>
  );
};

ExceptionPdfDetails.propTypes = {
  exceptionPdfDetails: PropTypes.object,
};
