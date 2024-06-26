/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {InputBox} from '../../../Components/InputBox/InputBox';
import {Button} from 'antd';
import cn from './LoginForm.module.scss';
import {userLogin} from '../../../Http/Login';
import {Loader} from '../../../Components/Loader';
import {LocalStorage} from '../../../Utils/localStorageUtil';
import {LOCAL_STORAGE} from '../../../Utils/constants';
import {ROUTE} from '../../../Routes.constants';
import {NavLink, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Notification} from '../../../Components/Notification';
import {validateForm} from '../../../Utils/commonUtils';
import {loginSchema} from './LoginForm.constants';
import {InputWrapper} from '../../../Components/InputWrapper';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, seLoading] = useState(false);
  const sessionDetails = useSelector((state) => state.session.details);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitLogin = async () => {
    const validatedForm = await validateForm({
      schema: loginSchema,
      data: formData,
    });
    if (!validatedForm.valid) {
      setError(validatedForm.errorData);
      return;
    }
    try {
      seLoading(true);
      const response = await userLogin(formData);
      LocalStorage.setItem(LOCAL_STORAGE.SESSION_TOKEN, response.access_token);
      window.dispatchEvent(new Event('localStorage'));
    } catch (error) {
      setError(error);
      Notification({
        type: 'error',
        message: error?.response?.data?.msg,
      });
      seLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitLogin();
  };

  useEffect(() => {
    if (sessionDetails.valid) {
      navigate(ROUTE.CAPTURE_STUDIO);
    }
  }, [sessionDetails.valid]);

  return (
    <form onSubmit={handleSubmit} className={cn.loginForm}>
      <ul className={cn.loginList}>
        <li>
          <InputWrapper label='Username' error={error.username}>
            <InputBox
              name='username'
              placeholderLabel='User name'
              value={formData.username}
              onChange={handleChange}
            />
          </InputWrapper>
        </li>
        <li>
          <InputWrapper label='Password' error={error.password}>
            <InputBox
              name='password'
              placeholderLabel='Password'
              type='password'
              value={formData.password}
              onChange={handleChange}
            />
          </InputWrapper>
        </li>
        <li>
          <Button loading={loading} type='primary' onClick={handleSubmit}>
            Log in
          </Button>
        </li>
        <li>
          <p>
            <NavLink to={'forgot'}>Forgot password?</NavLink>
          </p>
        </li>
      </ul>
    </form>
  );
};
