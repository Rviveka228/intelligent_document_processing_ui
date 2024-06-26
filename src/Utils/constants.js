/* eslint-disable max-len */
/* eslint-disable max-lines */
export const VIEW_TYPE = {
  WEB: 'WEB',
  MOB: 'MOB',
  TAB: 'TAB',
};

export const IS_DEV = import.meta.env.DEV;

export const API_BASE_URL = import.meta.env.API_BASE_URL;

export const INPUT = {
  CHECKBOX: 'checkbox',
};

export const EVENT = {
  RESIZE: 'resize',
};

export const PLANFILES = {
  FLOOR_PLAN: 'floorPlanFile',
  ELEVATOR_PLAN: 'elevationPlanFile',
  ELEVATION_V2: 'elevationV2',
  SPEC_VERIFIER: 'PdfVerifierFile',
  CAPTURE_STUDIO_FILE: 'captureStudioFile',
};

export const PlaceHolders = {
  SELECT_FLOOR_PLAN_FILE: 'Select Floor Plan file',
  SELECT_ELEVATOR_PLAN_FILE: 'Select Elevation Plan file',
  SELECT_A_FILE: 'Select a file',
  SELECT_EDO: 'Select a Document',
};

export const GeneralMessages = {
  UPLOAD_SUCCESS: 'Uploaded successfully.',
  UPLOAD_FAILED: 'Upload failed.',
  UPLOADING: 'Uploading',
  START_UPLOAD: 'Upload',
  SELECT_REQUIRED_FILES: 'Select all required files.',
  DFX_LIST_FAILED: 'Failed to fetch layer list.',
  BUILD_FAILED: 'Build failed.',
  TABLE_DATA_FAILED: 'Failed to fetch the table data.',
  CONFIG_CHANGE: 'Change Configuration',
  PROCESS_EDO: 'Process Document',
  PROCESSING_EDO: 'Processing Document',
};

export const API_URLS = {
  BASE_URL: 'http://34.228.30.217:5000',
  UPLOAD: 'upload',
  UPLOAD_TABLE: 'uploadForTableExtraction',
  BUILD: 'build',
  DFX_LAYERS: 'dfx-layers',
  TABLE_EXTRACT: 'extractTables',
};

export const LOCAL_STORAGE = {
  SESSION_TOKEN: 'sessionToken',
};

export const FormElementValidationMessages = {
  INPUT_FLOOR_PLAN_LAYER: 'Please select a floor plan layer',
  INPUT_ELEVATION_PLAN_LAYER: 'Please select an elevation plan layer',
};

export const infoStudioTableInfo =
  'Explore the multi entries for seamless extraction of tabular data from your PDF files.. Effortlessly manage and structure data arranged in tables within your documents, simplifying the template configuration process';

export const infoStudioKeyValueInfo =
  'Recognize and extract data from various form fields, providing you with a convenient way to manage and process structured content. Simplify your template configuration by mapping fields to the form data';

export const infoStudioHeading =
  'Effortlessly configure your PDF templates with our intuitive platform. Upload your Document files, and let our powerful system analyze and extract valuable information for you, and easily visualize and customize your templates for seamless document processing.';

export const homeHeading =
  'Simplify data extraction from documents with our platform. Choose a template and upload the document to effortlessly analyze and extract information.';

export const exceptionDetailsHeading =
  'Effortlessly configure your PDF templates with our intuitive platform. Upload your Document files, and let our powerful system analyze and extract valuable information for you, and easily visualize and customize your templates for seamless document processing.';
