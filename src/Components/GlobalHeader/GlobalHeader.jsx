import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {ROUTE} from '../../Routes.constants';
import {Logo} from '../Logo';

import NavigationBar from '../NavigationBar';
import cn from './GlobalHeader.module.scss';
import Container from '../Container/Container';
import {Logout} from './Logout';

export const GlobalHeader = (props) => {
  const navigate = useNavigate();
  const className = `${cn.globalHeader} ${props.className}`;
  return (
    <header className={className}>
      <Container>
        <div className={cn.headerBlock}>
          <div className={cn.brandBlock}>
            <div className={cn.brandLogo} onClick={() => navigate(ROUTE.HOME)}>
              <Logo />
            </div>
          </div>
          <NavigationBar />
          <Logout />
        </div>
      </Container>
    </header>
  );
};

GlobalHeader.propTypes = {
  /**
   * children to be rendered in the header
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.any]),
  /**
   * ClassName
   */
  className: PropTypes.any,
};

GlobalHeader.defaultProps = {};
