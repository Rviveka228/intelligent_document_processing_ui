import PropTypes from 'prop-types';

import {
  PlaceHolders,
  PLANFILES,
  GeneralMessages,
} from '../../../../Utils/constants';

import FileUpload from '../../../../Components/FileUpload';
import Button from '../../../../Components/Button';
import {Card} from '../../../../Components/Card/Card';

import cn from './UploadFile.module.scss';
import Container from '../../../../Components/Container/Container';
import {SelectElement} from '../../../../Components/SelectElement/SelectElement';

export const UploadCaptureStudioFile = ({
  currentFiles,
  onBeforeUpload,
  onUpload,
  onRemoveFile,
  isUploading,
  getDocumentType,
  onDocumentIdSelect,
  // eslint-disable-next-line no-unused-vars
  getDocumentTypeId,
}) => {
  return (
    <>
      <section className={cn.infoCapture}>
        <Container>
          <div className={cn.captureBlock}>
            <div className={cn.captureHeader}>
              <h3>Process Document</h3>
              <p>
                Upload your Document here and start configuring your templates
                visually
              </p>
            </div>
            <div className={cn.blockUpload}>
              <Card className={cn.blockElement}>
                <ul className={cn.blockList}>
                  <li>
                    <div className={cn.captureForms}>
                      <div className={cn.captureForms__item}>
                        <SelectElement
                          placeholder='Document Type'
                          onSelect={(value) => {
                            onDocumentIdSelect(value);
                          }}
                          options={getDocumentType?.documents.map((item) => {
                            return {
                              value: item.document_id,
                              label: item.document_name,
                            };
                          })}
                        />
                      </div>
                      <div className={cn.captureForms__item}>
                        <FileUpload
                          name={PLANFILES.CAPTURE_STUDIO_FILE}
                          isMultiple={false}
                          beforeUpload={onBeforeUpload}
                          onRemove={onRemoveFile}
                          uploadButtonName={PlaceHolders.SELECT_EDO}
                          getDocumentTypeId={getDocumentTypeId}
                          fileList={
                            currentFiles[PLANFILES.CAPTURE_STUDIO_FILE]
                              ? [currentFiles[PLANFILES.CAPTURE_STUDIO_FILE]]
                              : []
                          }
                          isButtonDisabled={!getDocumentTypeId}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={cn.uploadfileFooter}>
                      <Button
                        type='primary'
                        disabled={!currentFiles[PLANFILES.CAPTURE_STUDIO_FILE]}
                        onClick={onUpload}
                        loading={isUploading}>
                        {isUploading
                          ? GeneralMessages.PROCESSING_EDO
                          : GeneralMessages.PROCESS_EDO}
                      </Button>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

UploadCaptureStudioFile.propTypes = {
  /**
   * Callback function to call when after uploading
   */
  renderTableContent: PropTypes.func,
  /**
   * Function to reset the exsisting state values
   */
  onBeforeUpload: PropTypes.func,
  onUpload: PropTypes.func,
  onRemoveFile: PropTypes.func,
  currentFiles: PropTypes.object,
  isUploading: PropTypes.bool,
  getDocumentType: PropTypes.any,
  onDocumentIdSelect: PropTypes.func,
  getDocumentTypeId: PropTypes.string,
};
