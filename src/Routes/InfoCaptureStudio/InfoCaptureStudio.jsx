/* eslint-disable max-lines */
import React, {useEffect, useState} from 'react';
import '@react-pdf-viewer/search/lib/styles/index.css';
import {Worker, Viewer} from '@react-pdf-viewer/core';
import {Tabs} from 'antd';

import {infoStudioHeading} from '../../Utils/constants';

import PageContent from '../../Components/PageContent';
import Container from '../../Components/Container/Container';
import PageHeading from '../../Components/PageHeading';
import CustomScrollbar from '../../Components/CustomScrollbar';
import {Card} from '../../Components/Card/Card';
import {Loader} from '../../Components/Loader';
import EmptyState, {TYPES} from '../../Components/EmptyState/EmptyState';
import Button from '../../Components/Button';
import ModalWindow from '../../Components/ModalWindow/ModalWindow';
import {InputBox} from '../../Components/InputBox/InputBox';
import NewFieldForm from './Components/NewFieldForm';
import {UploadCaptureStudioFile} from './Components/UploadFile';
import {Table} from '../../Components/Table';
import {Collapse} from '../../Components/Collapse';
import LottieAnimation, {
  ANIMATION_TYPES,
} from '../../Components/LottieAnimation';

import {getTabList} from './Helpers/tabs';
import useInfoCaptureStudio from './useInfoCaptureStudio';
import {
  TABLE_ASSIGNMENTS_COLUMNS,
  filterTableColumns,
  reviewDataSource,
  reviewTableColumns,
} from './Helpers/utility';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import cn from './styles.module.scss';
import {AddTranformationSection} from './AddTransformationSection';
import {AddTemplateProperties} from './AddTemplateProperties';
import {SelectElement} from '../../Components/SelectElement/SelectElement';
import {SplitFields} from './SplitFields/SplitFields';

export const InfoCaptureStudio = () => {
  const {
    fileInfo,
    captureInfoMutation,
    showFieldMapForm,
    handleSelectFieldValue,
    selectedFieldValues,
    assignNewKeyMapHandler,
    keysData,
    isModalOpen,
    setIsModelOpen,
    onOkClickHandler,
    templateName,
    setTemplateName,
    onSaveTemplateClickHandler,
    isKeysDataLoading,
    isKeysResponseError,
    customCanvasPluginInstance,
    beforeUploadHandler,
    onRemoveFileHandler,
    specFileState,
    onFileUploadHandler,
    uploadFileMutation,
    isAssignModalOpen,
    setIsAssignModalOpen,
    activeTab,
    setActiveTab,
    isTableAssignModalOpen,
    setIsTableAssignModalOpen,
    selectedTableData,
    handleAssignTableField,
    tableTemplateValues,
    newTableFieldAssignHandler,
    removeTableFieldMappingHandler,
    isPreviewModalOpen,
    setIsPreviewModalOpen,
    reviewClickHandler,
    reviewedData,
    reviewFieldMapMutation,
    customTableCanvasPluginInstance,
    onResetHandler,
    saveTemplateMutation,
    getTemplatesMutation,
    selectedQueryFieldValues,
    handleSelectQueryFieldValue,
    assignNewQueryFieldHandler,
    setIsQueryFieldAssignModalOpen,
    isQueryFieldAssignModalOpen,
    showQueryMapFormData,
    keyValueFields,
    handleMapNewFieldClick,
    templateValues,
    revertFieldNameHandler,
    onTableClickHandler,
    tableFields,
    setLlmQuery,
    submitQueryHandler,
    llmTemplateValues,
    llmQuery,
    mapQueryFieldHandler,
    removeQueryFieldHandler,
    templateId,
    showTranformation,
    transformationData,
    transformationLoading,
    handleTranformationData,
    getDocumentType,
    onDocumentIdSelect,
    getDocumentTypeId,
    mappedList,
    captureInfoBlocks,
    customBlockCanvasPluginsInstance,
    capturedLine,
    captureLineValues,
    setCaptureLineValues,
    setGetDocumentTypeId,
    filePathException,
    s3Url,
    newExceptionTemplateDocId,
    initialClicked,
    documentFields,
    templateDetails,
    setRepeatedEntityFields,
    repeatedEntityFields,
    // eslint-disable-next-line no-unused-vars
    repeatedEntities,
    setRepeatedEntities,
  } = useInfoCaptureStudio();

  const [selectedOptions, setSelectedOption] = useState({});
  const [showTemplateProperty, setShowTemplateProperty] = useState(false);
  const [showBlockTab, setShowBlockTab] = useState(false);
  const [splitFields, setSplitFields] = useState({});
  const [transformations, setTransformations] = useState({});

  const [templatePropertyFlag, setTemplatePropertyFlag] = useState({
    multiple: false,
    onlyFirstPage: true,
  });
  const [captureLineSearchText, setCaptureLineSearchText] = useState();
  const [extractedResult, setExtractedResult] = useState(null);

  const fetchExceptionNewTemplate = () => {
    let url = s3Url;
    setGetDocumentTypeId(newExceptionTemplateDocId);
    if (url) {
      captureInfoMutation.mutate({s3_url: url});
    }
  };

  useEffect(() => {
    fetchExceptionNewTemplate();
  }, []);

  if (
    (!fileInfo ||
      !fileInfo.fileId ||
      (!fileInfo.fileUri && !getTemplatesMutation.isLoading && !templateId)) &&
    !s3Url &&
    !filePathException
  ) {
    return (
      <PageContent>
        <Container>
          <div className={cn.captureStudio}>
            <PageHeading
              text={'Info Capture Studio'}
              controls={infoStudioHeading}></PageHeading>
          </div>
          <UploadCaptureStudioFile
            onBeforeUpload={beforeUploadHandler}
            onUpload={onFileUploadHandler}
            onRemoveFile={onRemoveFileHandler}
            currentFiles={specFileState}
            isUploading={uploadFileMutation.isLoading}
            getDocumentType={getDocumentType}
            onDocumentIdSelect={onDocumentIdSelect}
            getDocumentTypeId={getDocumentTypeId}
          />
        </Container>
      </PageContent>
    );
  }

  const tabList = getTabList({
    keyValueFields,
    handleMapNewFieldClick,
    templateValues,
    revertFieldNameHandler,
    onTableClickHandler,
    tableFields,
    setLlmQuery,
    submitQueryHandler,
    llmTemplateValues,
    llmQuery,
    mapQueryFieldHandler,
    removeQueryFieldHandler,
    showBlockTab,
    keysData,
    selectedFieldValues,
    handleSelectFieldValue,
    showFieldMapForm,
    captureInfoBlocks,
    mappedList,
    setRepeatedEntities,
    templateDetails,
    documentFields,
    setRepeatedEntityFields,
    repeatedEntityFields,
  });
  const onCaptureLineListSearch = (text) => {
    setCaptureLineSearchText(text);
  };
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onCaptureLineListOnChange = (event) => {
    setCaptureLineValues(event);
  };

  return (
    <PageContent>
      <Container>
        {(captureInfoMutation.isLoading ||
          isKeysDataLoading ||
          getTemplatesMutation.isLoading) && (
          <LottieAnimation
            type={ANIMATION_TYPES.AI_LOADER}
            message={templateId ? 'Fetching template' : 'Processing Document'}
          />
        )}
        {captureInfoMutation.isError && (
          <EmptyState
            title={'Failed to Capture Info'}
            description={''}
            type={TYPES.RESULTS}
          />
        )}

        {!captureInfoMutation.isLoading &&
          !captureInfoMutation.isError &&
          captureInfoMutation.data && (
            <div className={cn.captureStudio}>
              <PageHeading text={'Info Capture Studio'}>
                {!captureInfoMutation.isLoading &&
                  !isKeysDataLoading &&
                  !isKeysResponseError &&
                  !captureInfoMutation.isError &&
                  captureInfoMutation.data &&
                  keysData && (
                    <>
                      <Button type='dashed' onClick={onResetHandler}>
                        Reset
                      </Button>
                      {/* <Button
                        type='dashed'
                        onClick={() => setShowTemplateProperty(true)}>
                        Template properties
                      </Button> */}
                      {/* <RepeatedEntities mappedList={mappedList} /> */}
                      <Button
                        type='dashed'
                        onClick={() =>
                          reviewClickHandler({
                            isFromTransformation: false,
                            transformations: transformations,
                            splitFields: splitFields,
                          })
                        }>
                        Preview
                      </Button>
                      <Button
                        disabled={!captureLineValues?.length}
                        type='primary'
                        onClick={() =>
                          onSaveTemplateClickHandler({
                            splitFields,
                          })
                        }>
                        {(s3Url || filePathException) && initialClicked
                          ? 'Save and Run'
                          : showTranformation
                          ? 'Save Template'
                          : 'Next'}
                      </Button>
                    </>
                  )}
              </PageHeading>
              {/* {showRepeatedEntities && (
                <RepeatedEntities
                  mappedList={mappedList}
                  getDocumentTypeId={getDocumentTypeId}
                />
              )} */}
              <Card>
                <div className={cn.captureContent}>
                  {showTranformation ? (
                    <>
                      <AddTranformationSection
                        keyValueFields={keyValueFields}
                        templateValues={transformationData}
                        reviewedData={reviewedData}
                        loading={transformationLoading}
                        handleTranformationData={handleTranformationData}
                        getDocumentTypeId={getDocumentTypeId}
                        setTransformations={setTransformations}
                        transformations={transformations}
                        selectedOptions={selectedOptions}
                        setSelectedOption={setSelectedOption}
                        setExtractedResult={setExtractedResult}
                        reviewFieldMapMutation={reviewFieldMapMutation}
                        templateDetails={templateDetails}
                        isPreviewModalOpen={isPreviewModalOpen}
                      />
                      {!(
                        (reviewFieldMapMutation?.isLoading &&
                          !isPreviewModalOpen) ||
                        transformationLoading
                      ) && (
                        <SplitFields
                          extractedResult={extractedResult}
                          documentFields={documentFields}
                          setSplitFields={setSplitFields}
                          splitFields={splitFields}
                          selectedOptions={selectedOptions}
                          templateDetails={templateDetails}
                          templateValues={transformationData}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <div className={cn.captureAside}>
                        <Tabs
                          destroyInactiveTabPane
                          className='capture-studio-tab'
                          items={tabList}
                          defaultActiveKey={activeTab}
                          activeKey={activeTab}
                          onChange={(activeKey) => {
                            setActiveTab(activeKey);
                          }}
                        />
                      </div>
                      <div className={cn.captureBody}>
                        <div className={cn.captureBody__header}>
                          <SelectElement
                            value={captureLineValues}
                            className={cn.captureSelect}
                            showSearch
                            searchValue={captureLineSearchText}
                            maxTagCount={3}
                            onSearch={onCaptureLineListSearch}
                            filterOption={filterOption}
                            mode='multiple'
                            placeholder='Unique Template String'
                            options={capturedLine}
                            onChange={onCaptureLineListOnChange}
                          />
                        </div>
                        <div className={cn.captureBody__body}>
                          <CustomScrollbar className={'pdf-body-scroll'}>
                            {(activeTab === 'keyValues' ||
                              activeTab === 'query') && (
                              <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                                <Viewer
                                  fileUrl={s3Url ?? fileInfo.fileUri}
                                  plugins={[customCanvasPluginInstance]}
                                />
                              </Worker>
                            )}
                            {activeTab === 'multiEntry' && (
                              <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                                <Viewer
                                  fileUrl={s3Url ?? fileInfo.fileUri}
                                  plugins={[customTableCanvasPluginInstance]}
                                />
                              </Worker>
                            )}
                            {activeTab === 'repeatedEntities' && (
                              <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                                <Viewer
                                  fileUrl={s3Url ?? fileInfo.fileUri}
                                  plugins={[customBlockCanvasPluginsInstance]}
                                />
                              </Worker>
                            )}
                          </CustomScrollbar>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </div>
          )}
      </Container>
      {showTemplateProperty && (
        <AddTemplateProperties
          onCancel={() => {
            setShowTemplateProperty(false);
            setShowBlockTab(false);
          }}
          handleOk={(value) => {
            setShowTemplateProperty(false);
            setShowBlockTab(!!value?.multiple);
            setTemplatePropertyFlag(value);
          }}
          templatePropertyFlag={templatePropertyFlag}
        />
      )}
      <ModalWindow
        okText={saveTemplateMutation.isLoading ? 'Saving...' : 'Save'}
        loadingText={'Saving Template'}
        disableOkButton={!templateName || saveTemplateMutation.isLoading}
        onOk={() => onOkClickHandler({transformations, splitFields})}
        open={isModalOpen}
        title='Save New Template'
        onCancel={() => setIsModelOpen(false)}
        isNotClosable={false}>
        <InputBox
          placeholderLabel='Enter the name of template'
          value={templateName}
          onChange={(event) => setTemplateName(event.target.value)}
        />
      </ModalWindow>
      <ModalWindow
        okText='Assign'
        onOk={() => assignNewKeyMapHandler(showFieldMapForm.id)}
        open={isAssignModalOpen}
        title={`Map new field name for ${showFieldMapForm.content}`}
        onCancel={() => setIsAssignModalOpen(false)}
        isNotClosable={false}>
        <CustomScrollbar className={cn.mapScrollerpane}>
          {keysData && keysData.data && (
            <NewFieldForm
              note={showFieldMapForm}
              selectedFieldValues={selectedFieldValues}
              keys={mappedList}
              handleSelectFieldValue={handleSelectFieldValue}
            />
          )}
        </CustomScrollbar>
      </ModalWindow>
      <ModalWindow
        okText='Assign'
        onOk={() => assignNewQueryFieldHandler(showQueryMapFormData.id)}
        open={isQueryFieldAssignModalOpen}
        title={`Map new field name for ${showQueryMapFormData.key}`}
        onCancel={() => setIsQueryFieldAssignModalOpen(false)}
        isNotClosable={false}>
        <CustomScrollbar className={cn.mapScrollerpane}>
          {keysData && keysData.data && (
            <NewFieldForm
              note={showQueryMapFormData}
              selectedFieldValues={selectedQueryFieldValues}
              keys={mappedList}
              handleSelectFieldValue={handleSelectQueryFieldValue}
            />
          )}
        </CustomScrollbar>
      </ModalWindow>
      <ModalWindow
        width={1000}
        okText='OK'
        onCancel={() => setIsTableAssignModalOpen(false)}
        onOk={() => setIsTableAssignModalOpen(false)}
        open={isTableAssignModalOpen}
        title='Map new field name'
        isNotClosable={false}>
        <CustomScrollbar className={cn.mapScrollerpane}>
          {keysData &&
            keysData.data &&
            selectedTableData &&
            selectedTableData.cells.length > 0 && (
              <Table
                rowKey={'id'}
                dataSource={filterTableColumns(selectedTableData.cells)}
                columns={TABLE_ASSIGNMENTS_COLUMNS({
                  onTableFieldAssignClick: (data) => {
                    handleAssignTableField(data.id, data.rowIndex);
                  },
                  onNewTableFieldValueSelect: (data) => {
                    newTableFieldAssignHandler(data);
                  },
                  onRemoveTableFieldMapping: (data) => {
                    removeTableFieldMappingHandler(data);
                  },
                  keysData: keysData.data.keys,
                  currentTemplateValues: tableTemplateValues,
                  tableId: selectedTableData.tableId,
                  mappedList: mappedList,
                })}
                pagination={true}
              />
            )}
        </CustomScrollbar>
      </ModalWindow>
      <ModalWindow
        width={1000}
        okText='OK'
        onCancel={() => setIsPreviewModalOpen(false)}
        onOk={() => setIsPreviewModalOpen(false)}
        open={isPreviewModalOpen}
        title={
          <div>
            <h5>
              Preview
              {!reviewFieldMapMutation.isLoading &&
                !reviewFieldMapMutation.isError &&
                reviewFieldMapMutation.data && (
                  <span>{` (Total ${reviewedData.length} found)`}</span>
                )}
            </h5>
          </div>
        }
        isNotClosable={false}>
        <CustomScrollbar className={cn.mapScrollerpane}>
          <div className={cn.mapmodelWrapper}>
            <Loader
              visible={reviewFieldMapMutation.isLoading}
              loadingText='Fetching Preview Data'
            />
            {!reviewFieldMapMutation.isLoading &&
              !reviewFieldMapMutation.isError &&
              reviewFieldMapMutation.data && (
                <>
                  {reviewedData.map((data, index) => {
                    const items = [
                      {
                        key: `${index + 1}-child-pane`,
                        label: `Order ${index + 1}`,
                        children: (
                          <div className={cn.mapmodelBlock} key={index}>
                            <Table
                              bordered
                              rowKey={'field'}
                              dataSource={reviewDataSource(data)}
                              columns={reviewTableColumns}
                              pagination={false}
                            />
                          </div>
                        ),
                      },
                    ];
                    return (
                      <Collapse
                        items={items}
                        key={index}
                        accordion={true}
                        defaultActiveKey={'1-child-pane'}
                      />
                    );
                  })}
                </>
              )}
          </div>
        </CustomScrollbar>
      </ModalWindow>
    </PageContent>
  );
};

InfoCaptureStudio.propTypes = {};
