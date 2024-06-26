import {createBrowserRouter, Navigate} from 'react-router-dom';

import {Layout} from './Components/Layout';
import PdfVerifier from './Routes/PdfVerifier';
import Template from './Routes/Templates';
import {InfoCaptureStudio} from './Routes/InfoCaptureStudio';

import {ROUTE} from './Routes.constants';
import Types from './Routes/Types';
import CreateType from './Routes/Types/CreateType';
import {ExceptionZone} from './Routes/ExceptionZone';
import {AdminSettings} from './Routes/AdminSettings/AdminSettings';
import {ExceptionDetails} from './Routes/ExceptionDetails/ExceptionDetails';
import {Login} from './Routes/Login/Login';
import {SecuredLayout} from './Components/SecuredLayout/SecuredLayout';
import {Users} from './Routes/Users';
// import {RepeatedEntities} from './Routes/InfoCaptureStudio/RepeatedEntities';

const router = createBrowserRouter([
  {
    path: ROUTE.ROOT,
    children: [
      {
        path: ROUTE.LOGIN,
        element: <Login />,
      },
      {
        element: <SecuredLayout />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                index: true,
                element: <Navigate to={ROUTE.CAPTURE_STUDIO} />,
              },
              {
                path: ROUTE.HOME,
                element: <PdfVerifier />,
              },
              {
                path: ROUTE.TEMPLATES,
                element: <Template />,
              },
              {
                path: ROUTE.CAPTURE_STUDIO,
                element: <InfoCaptureStudio />,
              },
              {
                path: ROUTE.EDIT_CAPTURE_STUDIO,
                element: <InfoCaptureStudio />,
              },
              {
                path: ROUTE.TYPES,
                element: <Types />,
              },
              {
                path: ROUTE.CREATE_TYPES,
                element: <CreateType />,
              },
              {
                path: ROUTE.EDIT_CREATE_TYPES,
                element: <CreateType />,
              },
              {
                path: ROUTE.EXCEPTION_ZONE,
                element: <ExceptionZone />,
              },
              {
                path: ROUTE.EXCEPTION_DETAILS,
                element: <ExceptionDetails />,
              },
              {
                path: ROUTE.ADMIN_SETTINGS,
                element: <AdminSettings />,
              },
              {
                path: ROUTE.USERS,
                element: <Users />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
