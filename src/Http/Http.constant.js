export const URL = {
  BASE_URL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
};

export const API_URL = {
  SPEC_VERIFIER_ZIP_UPLOAD: 'upload_pdf',
  SPEC_VERIFY: 'process_pdf',
  TEMPLATES: '/templates',
  TEMPLATE_DETAILS: '/templates-details',
  CAPTURE_INFO: '/capture_info',
  KEYS: '/keys',
  DOCUMENT_TYPE: '/document_type',
  DOCUMENT_TYPES: '/document_types',
  TRANSFORMATIONS: '/transformations',
  TRANSFORM: '/transform',
  ADMIN_SETTINGS: '/admin-settings',
  PROCESS_FAILED_DOCS: '/process-failed-docs',
  RE_PROCESS: '/re-process',
  DISCARD_DOCUMENT: '/discard-document',
  MANUAL_ENTRY: '/manual-entry',
  DATA_QUALITY_SCORE: '/data-quality',
  SPLIT_FIELD: '/split-field',
  LOGIN: './login',
  USER: '/user',
  FORGOT: '/forgot',
  LOGOUT: '/logout',
};
