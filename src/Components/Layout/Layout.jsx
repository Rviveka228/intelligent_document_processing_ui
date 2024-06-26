import React from 'react';
import {Outlet} from 'react-router-dom';

import PageWrapper from '../PageWrapper/PageWrapper';
import PageBody from '../PageBody/PageBody';
import {GlobalHeader} from '../GlobalHeader/GlobalHeader';

export const Layout = () => {
  return (
    <PageWrapper>
      <GlobalHeader />
      <PageBody>
        <Outlet />
      </PageBody>
    </PageWrapper>
  );
};
