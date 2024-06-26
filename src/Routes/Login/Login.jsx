import React from 'react';
import LoginTheme from '../../Assest/Image/login_image.png';
import {Logo} from '../../Components/Logo';
import {WELCOME_NOTE} from './Login.constants';
import {LoginForm} from './LoginForm';
import {Route, Routes} from 'react-router-dom';
import {ForgotForm} from './ForgotForm/ForgotForm';
import cn from './Login.module.scss';

export const Login = () => {
  return (
    <>
      <div className={cn.loginWrapper}>
        <div className={cn.loginBlock}>
          <div className={cn.loginTheme}>
            <div className={cn.themeBlock}>
              <div className={cn.themeImage}>
                <img src={LoginTheme} alt='Image' />
              </div>
              <div className={cn.themeContent}>
                <h3>{WELCOME_NOTE.TITLE}</h3>
                <p>{WELCOME_NOTE.DESCRIPTION}</p>
              </div>
            </div>
          </div>
          <div className={cn.loginForms}>
            <div className={cn.formsBlock}>
              <div className={cn.formElements}>
                <div className={cn.elementHeader}>
                  <div className={cn.headerText}>
                    <h3>Welcome back!</h3>
                  </div>
                  <div className={cn.headerBrand}>
                    <span>
                      <Logo />
                    </span>
                  </div>
                </div>
                <Routes>
                  <Route index path='' element={<LoginForm />} />
                  <Route path='forgot' element={<ForgotForm />} />
                </Routes>
              </div>
            </div>
            <div className={cn.formFooter}>
              <p>
                © 2024 DigitizeDock. <a>All Rights Reserved.</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
