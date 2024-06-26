import React, {useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';

import {setSessionDetails} from '../Store/Reducers/sessionDetails';
import {processSessionDetails} from './SessionWrapper.helpers';

export const SessionWrapper = (props) => {
  const dispatch = useDispatch();

  const onTokenChange = () => {
    dispatch(setSessionDetails(processSessionDetails()));
  };

  useMemo(onTokenChange, []);

  useEffect(() => {
    window.addEventListener('localStorage', onTokenChange);
    return () => {
      window.removeEventListener('localStorage', onTokenChange);
    };
  }, []);

  return <>{props.children}</>;
};

SessionWrapper.propTypes = {
  children: PropTypes.any,
};

SessionWrapper.defaultProps = {};
