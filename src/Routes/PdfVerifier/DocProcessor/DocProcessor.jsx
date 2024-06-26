import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {setFileExtractData} from '../../../Store/Actions/fileExtract';
import {apiClient} from '../../../Http';

import PageContent from '../../../Components/PageContent';
import {SpecVerifyTable} from '../SpecTable';
import LottieAnimation, {
  ANIMATION_TYPES,
} from '../../../Components/LottieAnimation';
import Container from '../../../Components/Container/Container';
import {Card} from '../../../Components/Card/Card';
import UploadFile from '../UploadFile';

import {API_URL} from '../../../Http/Http.constant';
import {ERROR, MESSAGE} from './DocProcessor.constants';

import cn from './DocProcessor.module.scss';

// eslint-disable-next-line no-unused-vars
export function DocProcessor(props) {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [tableCalled, setTableCalled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');

  // Define a function to update the parentState
  const updateSelectedTemplateId = (newState) => {
    setSelectedTemplateId(newState);
  };

  const renderEmptyState = tableCalled ? <span>Table is empty!</span> : '';

  const renderTableContent = async (formData, s3Path) => {
    setLoading(true);
    setLoadingText(MESSAGE.VALIDATION_MESSAGE);
    setErrorMessage('');
    setTableData([]);
    try {
      formData.template_id = selectedTemplateId;
      let tableResponse = await apiClient(API_URL.SPEC_VERIFY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (tableResponse.error) {
        setErrorMessage(
          tableResponse.error ? tableResponse.error : ERROR.COMMON_ERROR
        );
        setTableData([]);
      } else {
        setErrorMessage('');
        setTableCalled(true);
        setTableData(tableResponse);
        setLoading(false);
        dispatch(
          setFileExtractData({fileUri: s3Path, fileId: formData.pdf_file})
        );
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(ERROR.COMMON_ERROR);
    }
    setLoading(false);
  };

  const resetStates = () => {
    setErrorMessage('');
    setTableData([]);
    setTableCalled(false);
    setLoadingText('');
  };
  return (
    <PageContent>
      <Container>
        <div className={cn.documentUpload}>
          <div className={cn.uploadfileWrapper}>
            <UploadFile
              setTemplateId={updateSelectedTemplateId}
              renderTableContent={renderTableContent}
              reset={resetStates}
              selectedTemplateId={selectedTemplateId}
              isLoading={loading}
            />
          </div>
          {errorMessage && <span>{errorMessage}</span>}
          {loading ? (
            <LottieAnimation
              type={ANIMATION_TYPES.AI_LOADER}
              message={loadingText}
            />
          ) : tableData.length !== 0 ? (
            <div className={cn.uploadfileResult}>
              {tableData?.applied_template_name === '' &&
              tableData?.status === 'failed' ? (
                <span>{tableData?.issue}</span>
              ) : (
                <Card>
                  <Card.Header>
                    <h3>PDF Analytics</h3>
                  </Card.Header>
                  <Card.Body>
                    <SpecVerifyTable
                      data={
                        Array.isArray(tableData.objects)
                          ? tableData.objects
                          : [tableData.objects]
                      }
                    />
                  </Card.Body>
                </Card>
              )}
            </div>
          ) : (
            renderEmptyState
          )}
        </div>
      </Container>
    </PageContent>
  );
}
