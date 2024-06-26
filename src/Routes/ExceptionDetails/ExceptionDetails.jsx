import React, {useEffect, useState} from 'react';
import {createSearchParams, useNavigate, useParams} from 'react-router-dom';
import {Worker, Viewer} from '@react-pdf-viewer/core';
import qs from 'qs';

import PageContent from '../../Components/PageContent';
import Container from '../../Components/Container/Container';
import PageHeading from '../../Components/PageHeading';
import {BreadCrumbs} from '../../Components/BreadCrumbs/BreadCrumbs';
import {Loader} from '../../Components/Loader';
// import CustomScrollbar from '../../Components/CustomScrollbar';
import EmptyState, {TYPES} from '../../Components/EmptyState/EmptyState';
// import {ExceptionPdfDetails} from './ExceptionPdfDetails/ExceptionPdfDetails';
import {FieldControlBlock} from './FieldControlBlock';
import {Actions} from './Actions/Actions';
import {ManualEntrySubmit} from './ManualEntrySubmit/ManualEntrySubmit';

import {getExceptionZoneList} from '../../Http/ExceptionZone';

import {ROUTE} from '../../Routes.constants';
import {EXCEPTION_BREADCRUMB} from './ExceptionDetails.constants';
import {Card} from '../../Components/Card/Card';
import cn from './ExceptionDetails.module.scss';

export const ExceptionDetails = () => {
  const navigate = useNavigate();
  const {configId} = useParams();

  const [loading, seLoading] = useState(true);
  const [error, setError] = useState();
  const [exceptionPdfDetails, setExceptionPdfDetails] = useState([]);
  const [filePath, setFilePath] = useState();
  const [selectedAction, setSelectedAction] = useState([]);
  const [manualEntryValue, setManualEntryValue] = useState({});
  const [dataQualityValue, setDataQualityValue] = useState({});

  const handleBredCrumbClick = (value) => {
    if (value === 'Exception Zone') {
      navigate(ROUTE.EXCEPTION_ZONE);
    }
  };

  const getExceptionPdfDetails = async () => {
    try {
      seLoading(true);
      const response = await getExceptionZoneList(configId);
      setExceptionPdfDetails(response?.data?.list_failed_docs ?? {});
      setFilePath(response?.data?.list_failed_docs?.s3_url);
      seLoading(false);
    } catch (error) {
      setError(error);
      seLoading(false);
    }
  };

  const updateManualEntryValue = (data) => {
    setManualEntryValue((prev) => ({...prev, ...data}));
  };

  useEffect(() => {
    getExceptionPdfDetails();
  }, []);

  useEffect(() => {
    if (selectedAction === 'updateTemplate') {
      const configId = exceptionPdfDetails?.config_id;
      navigate({
        pathname: `${ROUTE.CAPTURE_STUDIO}/${exceptionPdfDetails?.applied_template}`,
        search: createSearchParams(
          qs.stringify({filePath, configId})
        ).toString(),
      });
    }
  }, [selectedAction]);

  return (
    <PageContent>
      <Container>
        <div className={cn.exceptionDetails}>
          <PageHeading text='Exception Details'>
            <Actions
              exceptionPdfDetails={exceptionPdfDetails}
              onChange={setSelectedAction}
            />
          </PageHeading>
          <BreadCrumbs
            data={EXCEPTION_BREADCRUMB}
            onClick={handleBredCrumbClick}
          />
          {loading ? (
            <Loader visible />
          ) : error ? (
            <EmptyState
              title={error ? 'Something went wrong' : 'No data found'}
              description={''}
              type={TYPES.RESULTS}
            />
          ) : (
            <>
              {/* <ExceptionPdfDetails exceptionPdfDetails={exceptionPdfDetails} /> */}
              <Card>
                <Card.Body>
                  <div className={cn.exceptionBody}>
                    <div className={cn.exceptionSidebar}>
                      <div className={cn.exceptionSidebar__header}>
                        <h5>Extracted Fields</h5>
                      </div>
                      <div className={cn.exceptionSidebar__body}>
                        <FieldControlBlock
                          exceptionPdfDetails={exceptionPdfDetails}
                          selectedAction={selectedAction}
                          updateManualEntryValue={updateManualEntryValue}
                          manualEntryValue={manualEntryValue}
                          setDataQualityValue={setDataQualityValue}
                        />
                      </div>
                    </div>
                    <div className={cn.exceptionContent}>
                      <div className={cn.exceptionContent__header}>
                        <h5>{exceptionPdfDetails?.file_name}</h5>
                      </div>
                      <div className={cn.exceptionContent__body}>
                        <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                          <Viewer fileUrl={filePath} />
                        </Worker>
                      </div>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className={cn.submitBlock}>
                    {selectedAction === 'manualEntry' && (
                      <ManualEntrySubmit
                        manualEntryValue={manualEntryValue}
                        exceptionPdfDetails={exceptionPdfDetails}
                        dataQualityValue={dataQualityValue}
                      />
                    )}
                  </div>
                </Card.Footer>
              </Card>
            </>
          )}
        </div>
      </Container>
    </PageContent>
  );
};
