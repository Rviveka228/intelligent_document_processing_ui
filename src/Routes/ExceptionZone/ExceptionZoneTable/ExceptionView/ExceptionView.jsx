import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../Components/Button';
import {useNavigate} from 'react-router-dom';
import {ROUTE} from '../../../../Routes.constants';

export const ExceptionView = (props) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`${ROUTE.EXCEPTION_ZONE}/${props.data?.configId}`);
  };

  return (
    <div>
      <Button onClick={onClick} type='primary'>
        View
      </Button>
    </div>
  );
};
ExceptionView.propTypes = {
  data: PropTypes.object,
};
