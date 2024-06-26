import React, {useState} from 'react';
import cn from './ForgotForm.module.scss';
import {InputBox} from '../../../Components/InputBox/InputBox';
import {Button} from 'antd';
import {NavLink, useNavigate} from 'react-router-dom';
import {forgotPassword} from '../../../Http/User';
import {Notification} from '../../../Components/Notification';
import {validateForm} from '../../../Utils/commonUtils';
import {forgotSchema} from './ForgotForm.constants';
import {InputWrapper} from '../../../Components/InputWrapper';

export const ForgotForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const forgot = async () => {
    const validatedForm = await validateForm({
      schema: forgotSchema,
      data: {email},
    });
    if (!validatedForm.valid) {
      setError(validatedForm.errorData);
      return;
    }
    try {
      setLoading(true);
      const response = await forgotPassword({email: email});
      Notification({
        type: 'success',
        message: response?.data?.msg,
      });
      navigate('..');
    } catch (error) {
      setLoading(false);
      Notification({
        type: 'error',
        message: error?.response?.data?.msg,
      });
    }
  };
  return (
    <div className={cn.forgotForm}>
      <ul className={cn.forgotList}>
        <li>
          <InputWrapper label='Email' error={error.email}>
            <InputBox
              name='email'
              placeholderLabel='Enter your email'
              value={email}
              onChange={handleChange}
            />
          </InputWrapper>
        </li>
        <li>
          <Button loading={loading} onClick={forgot} type='primary'>
            Submit
          </Button>
        </li>
        <li>
          <p>
            <NavLink to='..'>Login?</NavLink>
          </p>
        </li>
      </ul>
    </div>
  );
};
