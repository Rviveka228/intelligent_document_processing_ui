import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {MediaTypeProvider} from './MediaType.provider';

// import {GlobalHeader} from './Components/GlobalHeader/GlobalHeader';
// import SuspenseLoader from './Components/SuspenseLoader';

import {ROUTE} from './Routes.constants';
import {Login} from './Routes/Login/Login';
import {SecuredLayout, useSession} from './Components/SecuredLayout';
import {Layout} from './Components/Layout';
import PdfVerifier from './Routes/PdfVerifier';
import Template from './Routes/Templates';
import {InfoCaptureStudio} from './Routes/InfoCaptureStudio';
import Types from './Routes/Types';
import CreateType from './Routes/Types/CreateType';
import {ExceptionZone} from './Routes/ExceptionZone';
import {ExceptionDetails} from './Routes/ExceptionDetails';
import {AdminSettings} from './Routes/AdminSettings';
import {Users} from './Routes/Users';
import {SessionWrapper} from './SessionWrapper';

// import TemplateDetails from './Routes/TemplateDetails';
// import {MasterDocument} from './Routes/PdfVerifier/NavTab/MasterDocument/MasterDocument';

export function App() {
  const session = useSession();
  return (
    <SessionWrapper>
      <MediaTypeProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTE.LOGIN + '/*'} element={<Login />} />
            <Route element={<SecuredLayout />}>
              <Route element={<Layout />}>
                <Route index element={<Navigate to={ROUTE.CAPTURE_STUDIO} />} />
                <Route path={ROUTE.HOME} element={<PdfVerifier />} />
                <Route path={ROUTE.TEMPLATES} element={<Template />} />
                <Route
                  path={ROUTE.CAPTURE_STUDIO}
                  element={<InfoCaptureStudio />}
                />
                <Route
                  path={ROUTE.EDIT_CAPTURE_STUDIO}
                  element={<InfoCaptureStudio />}
                />
                <Route path={ROUTE.TYPES} element={<Types />} />
                <Route path={ROUTE.CREATE_TYPES} element={<CreateType />} />
                <Route
                  path={ROUTE.EDIT_CREATE_TYPES}
                  element={<CreateType />}
                />
                <Route
                  path={ROUTE.EXCEPTION_ZONE}
                  element={<ExceptionZone />}
                />
                <Route
                  path={ROUTE.ADMIN_SETTINGS}
                  element={session.isAdmin && <AdminSettings />}
                />
                <Route
                  path={ROUTE.USERS}
                  element={session.isAdmin && <Users />}
                />
                <Route
                  path={ROUTE.EXCEPTION_DETAILS}
                  element={<ExceptionDetails />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MediaTypeProvider>
    </SessionWrapper>
  );
}
