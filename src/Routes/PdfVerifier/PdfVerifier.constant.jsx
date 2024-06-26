import cn from './PdfVerifier.module.scss';

export const SPEC_VERIFIER_TABLE_COLOUMN = [
  {
    title: 'Chapter',
    dataIndex: 'chapter',
    key: 'chapter',
    render: (text) => {
      return text ? text : 'NA';
    },
  },
  {
    title: 'Field',
    dataIndex: 'field',
    key: 'field',
    render: (text) => {
      return text ? text : 'NA';
    },
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    align: 'center',
    render: (text) => {
      return text ? text : 'NA';
    },
  },

  {
    title: 'Table 503 Limits',
    dataIndex: 'limit',
    key: 'limit',
    align: 'center',
    render: (text) => {
      return text ? text : 'NA';
    },
  },
  {
    title: 'Compliance Check',
    dataIndex: 'compliance',
    key: 'compliance',
    render: (text) => {
      return text ? text : 'NA';
    },
  },
];

export const VALIDATION_TABLE_COLOUMN = [
  {
    title: 'Condition',
    dataIndex: 'condition',
    key: 'condition',
    align: 'center',
    render: (str) => {
      return <span className={cn.tableValueLeftAlign}>{str}</span>;
    },
  },
  {
    title: 'Validation Result',
    dataIndex: 'validationResult',
    key: 'validationResult',
    align: 'center',
    render: (str) => {
      return (
        <>{str === 'Pass' ? str : <span className={cn.failText}>{str}</span>}</>
      );
    },
  },
];

export const ERROR = {
  TABLE_EXTRACT_ERROR: 'Faild to extract the table data! Try again',
  VALIDATION_ERROR: 'Validation not found!',
  COMMON_ERROR: 'Processing failed!! Please try again',
  VALIDATION_SUCCESS_PROCESS_FAILED:
    'Validations failed , cannot process the file',
};

export const MESSAGE = {
  VALIDATION_MESSAGE: 'Processing the the file...',
  TABLE_MESSAGE: 'Processing the file...',
};

export const DUMMY_RESPONSE = {
  'Area': {
    chapter: '1.1.4',
    value: 'xx',
    limit: '',
    compliance: '',
  },
  'Total GFA': {
    chapter: '1.1.5',
    value: 'xx',
    limit: '',
    compliance: '',
  },
  'TOTAL BUA': {
    chapter: '1.1.6',
    value: 'xx',
    limit: '',
    compliance: '',
  },
  'Type of Occupancy': {
    chapter: '3.2.1',
    value: 'R3-U',
    limit: '',
    compliance: 'NA',
  },
  'Type of Construction': {
    chapter: '3.4.5',
    value: 'TYPE II-A',
    limit: '',
    compliance: 'NA',
  },
  'Number of floors': {
    chapter: '3.4.5',
    value: '3',
    limit: '4',
    compiance: 'Pass',
  },
  'Building Area': {
    chapter: '3.4.5',
    value: '900',
    limit: 'UL',
    compliance: 'Pass',
  },
  'Height': {
    chapter: '0.0',
    value: '8',
    limit: '20.00',
    compliance: 'Pass',
  },
};
