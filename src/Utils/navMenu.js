import {ROUTE} from '../Routes.constants';

export const navMenuItems = [
  {
    key: 'home',
    label: 'Home',
    path: ROUTE.HOME,
    adminOnly: false,
  },
  {
    key: 'documentTypes',
    label: 'Document Types',
    path: ROUTE.TYPES,
    adminOnly: false,
  },
  {
    key: 'templates',
    label: 'Templates',
    path: ROUTE.TEMPLATES,
    adminOnly: false,
  },
  {
    key: 'captureStudio',
    label: 'Info Capture Studio',
    path: ROUTE.CAPTURE_STUDIO,
    adminOnly: false,
  },
  {
    key: 'exceptionsZone',
    label: 'Exceptions',
    path: ROUTE.EXCEPTION_ZONE,
    adminOnly: false,
  },
  {
    key: 'adminSettings',
    label: 'Admin Settings',
    path: ROUTE.ADMIN_SETTINGS,
    adminOnly: true,
  },
  {
    key: 'users',
    label: 'Users',
    path: ROUTE.USERS,
    adminOnly: true,
  },
];
