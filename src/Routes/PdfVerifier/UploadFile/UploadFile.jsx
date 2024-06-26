/* eslint-disable no-useless-catch */
/* eslint-disable max-lines */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {notification} from 'antd';

import {SelectElement} from '../../../Components/SelectElement/SelectElement';

import {
  PlaceHolders,
  PLANFILES,
  GeneralMessages,
  homeHeading,
} from '../../../Utils/constants';

import FileUpload from '../../../Components/FileUpload';
import Button from '../../../Components/Button';

import {apiClient} from '../../../Http';

import {API_URL} from '../../../Http/Http.constant';
import {getTemplates} from '../../../../src/Http/Configuration';
import {Card} from '../../../Components/Card/Card';
import cn from './UploadFile.module.scss';
import {getDocumentList} from '../../../Http/DocumentType';
import {removeDuplicatesByKey} from '../../../Utils/commonUtils';

export const UploadFile = (props) => {
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const [api, contextHolder] = notification.useNotification();
  const [specFileState, setSpecFileState] = useState({});
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [options, setOptions] = useState([
    {label: 'Auto Detect', value: 'autoDetect'},
  ]);
  const [documentTypes, setDocumentTypes] = useState();
  // eslint-disable-next-line no-unused-vars
  const [documentId, setDocumentId] = useState();
  // eslint-disable-next-line no-unused-vars
  const [selectedTemplateId, setSelectedTemplateId] = useState('autoDetect');

  const getFormattedTemplates = async (id = '') => {
    try {
      let payload = null;
      if (id) {
        payload = {document_id: id};
      }
      let newOptions = [];
      const array = await getTemplates(payload);
      array.data.templates.forEach((item) => {
        const value = item.template_id; // Get the numeric value from the object
        const label = item.template_name; // Get the label from the object
        newOptions.push({value, label}); // Create a new object with 'value' and 'label' properties
      });
      newOptions = [...options, ...newOptions];
      setOptions(removeDuplicatesByKey(newOptions, 'value'));
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    async function fetchData() {
      getFormattedTemplates();
    }
    fetchData();
  }, []);
  const handleUpload = () => {
    setUploading(true);
    setErrorMessage('');
    props.reset();
    const formData = new FormData();

    formData.append('pdf_file', specFileState[PLANFILES.SPEC_VERIFIER]);

    apiClient(API_URL.SPEC_VERIFIER_ZIP_UPLOAD, {
      method: 'POST',
      body: formData,
    })
      .then((data) => {
        if (data.status === 400) {
          const message = `${data.status}: ${data.issue}`;
          setErrorMessage(message);
          api.error({
            placement: 'topRight',
            message: message,
          });
        } else if (data.error) {
          setErrorMessage(data.error);
          api.error({
            placement: 'topRight',
            message: `${data.error}`,
          });
        } else {
          setErrorMessage('');
          let formdata = {
            s3_url: data?.s3_path,
            document_id: documentId,
          };
          setSpecFileState({});
          props.renderTableContent(formdata, data?.s3_path);
        }
      })
      .catch((errorData) => {
        const message = `${
          errorData.status || 'Error: Unknown error occurred'
        }`;
        api.error({
          placement: 'topRight',
          message: message,
        });
        setErrorMessage(message);
      })
      .finally(() => {
        setUploading(false);
      });
  };
  useEffect(() => {
    const documentTypeList = async () => {
      const response = await getDocumentList();
      setDocumentTypes(response?.data);
    };
    documentTypeList();
  }, []);

  const beforeUpload = (file, name) => {
    setSpecFileState((previousState) => {
      return {...previousState, [name]: file};
    });
  };

  const onRemove = (file, name) => {
    setSpecFileState((prevState) => {
      const newState = {...prevState};
      delete newState[name];
      return newState;
    });
  };
  const handleOptionChange = (value) => {
    setSelectedTemplateId(value);
    // eslint-disable-next-line react/prop-types
    if (value === 'autoDetect') {
      value = '';
    }
    props.setTemplateId(value);
  };
  const onDocumentTypeChange = (value) => {
    setDocumentId(value);
    getFormattedTemplates(value);
    setSelectedTemplateId('autoDetect');
  };

  return (
    <>
      {contextHolder}
      <div className={cn.uploadBlock}>
        <div className={cn.uploadHeader}>
          <h3> Upload Document</h3>
          <p>{homeHeading}</p>
        </div>
        <div className={cn.uploadBody}>
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <ul className={cn.pdfViewliast}>
                <li key='pdf-select'>
                  <div className={cn.uploadElement}>
                    <div className={cn.uploadElement__item}>
                      <SelectElement
                        showSearch
                        filterOption={filterOption}
                        placeholder='Document Type'
                        onSelect={(value) => {
                          onDocumentTypeChange(value);
                        }}
                        options={documentTypes?.documents.map((item) => {
                          return {
                            value: item.document_id,
                            label: item.document_name,
                          };
                        })}
                      />
                    </div>
                    <div className={cn.uploadElement__item}>
                      <SelectElement
                        disabled={!documentId}
                        showSearch
                        filterOption={filterOption}
                        placeholder='Select a PDF template'
                        value={selectedTemplateId}
                        onSelect={(value) => {
                          handleOptionChange(value);
                        }}
                        options={options}
                      />
                    </div>
                    <div className={cn.uploadElement__item}>
                      <FileUpload
                        isButtonDisabled={
                          uploading ||
                          props.isLoading ||
                          !documentId ||
                          !selectedTemplateId
                        }
                        name={PLANFILES.SPEC_VERIFIER}
                        isMultiple={false}
                        beforeUpload={beforeUpload}
                        onRemove={onRemove}
                        uploadButtonName={PlaceHolders.SELECT_A_FILE}
                        fileList={
                          specFileState[PLANFILES.SPEC_VERIFIER]
                            ? [specFileState[PLANFILES.SPEC_VERIFIER]]
                            : []
                        }
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className={cn.uploadfileFooter}>
                    <Button
                      type='primary'
                      disabled={
                        !specFileState[PLANFILES.SPEC_VERIFIER] ||
                        !selectedTemplateId
                      }
                      onClick={handleUpload}
                      loading={uploading}>
                      {uploading
                        ? GeneralMessages.UPLOADING
                        : GeneralMessages.START_UPLOAD}
                    </Button>
                  </div>
                </li>
                {errorMessage && (
                  <li>
                    <div className={cn.uploadFileError}>{errorMessage}</div>
                  </li>
                )}
              </ul>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </div>
      </div>
    </>
  );
};

UploadFile.propTypes = {
  /**
   * Callback function to call when after uploading
   */
  renderTableContent: PropTypes.func,
  /**
   * Function to reset the exsisting state values
   */
  reset: PropTypes.func,
  isLoading: PropTypes.bool,
};
