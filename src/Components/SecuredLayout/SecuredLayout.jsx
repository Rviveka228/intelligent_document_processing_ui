import React, {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {ROUTE} from '../../Routes.constants';

export const SecuredLayout = () => {
  const navigate = useNavigate();
  const sessionDetails = useSelector((state) => state.session.details);

  useEffect(() => {
    if (!sessionDetails.valid) {
      navigate(ROUTE.LOGIN);
    }
  }, [sessionDetails.valid]);

  return sessionDetails.valid ? <Outlet /> : null;
};

export const useSession = () => {
  const sessionDetails = useSelector((state) => state.session.details);
  return sessionDetails;
};
