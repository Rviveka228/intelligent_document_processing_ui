import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
// import CustomScrollbar from '../../../Components/CustomScrollbar';
import {ControlItem} from './ControlItem/ControlItem';
import cn from './FieldControlBlock.module.scss';
import EmptyState, {TYPES} from '../../../Components/EmptyState/EmptyState';
import {fetchCaptureInfo} from '../../../Http/CaptureInfo';
import {removeDuplicatesByKey} from '../../../Utils/commonUtils';
import {Collapse} from '../../../Components/Collapse';

export const FieldControlBlock = (props) => {
  const [manualEntryOptionList, setManualEntryOptionList] = useState([]);
  const [manualEntryOptionLoading, setManualEntryOptionLoading] =
    useState(false);

  const getExceptionManualEntryOptionList = async () => {
    try {
      setManualEntryOptionLoading(true);
      const response = await fetchCaptureInfo({
        s3_url: props.exceptionPdfDetails?.s3_url,
      });
      const captureBlocks = response?.data?.captured_blocks;
      const captureLines = response?.data?.captured_lines;
      const mergedData = captureBlocks.concat(captureLines);
      setManualEntryOptionList(
        removeDuplicatesByKey(
          mergedData.map((item) => {
            return {
              value: item.text,
              label: item.text,
            };
          }),
          'value'
        )
      );
      setManualEntryOptionLoading(false);
    } catch (error) {
      setManualEntryOptionLoading(false);
      error;
    }
  };

  useEffect(() => {
    if (props.selectedAction === 'manualEntry') {
      getExceptionManualEntryOptionList();
    }
  }, [props.selectedAction]);

  useEffect(() => {
    props.setDataQualityValue(
      props.exceptionPdfDetails?.extracted_data?.reduce((accumulator, item) => {
        item.forEach((eItem) => {
          accumulator[eItem.field_id] = eItem.data_quality_score;
        });
        return accumulator;
      }, {})
    );
  }, [props.exceptionPdfDetails?.extracted_data]);

  const items = props.exceptionPdfDetails?.extracted_data?.map(
    (eachData, index) => {
      const isPoor = eachData?.some(
        (item) => item.data_quality_score === 'POOR'
      );
      return {
        key: `${index}-child-pane`,
        label: (
          <div className={cn.feedTitle}>
            <span>Feed {index + 1}</span>
            {props.selectedAction !== 'manualEntry' &&
              (isPoor ? (
                <span className={cn.feedTitle__failedStatus}>Failed</span>
              ) : (
                <span className={cn.feedTitle__successStatus}>Success</span>
              ))}
          </div>
        ),
        children: eachData?.map((fieldData) => {
          return (
            <ControlItem
              key={fieldData?.id}
              updateManualEntryValue={props.updateManualEntryValue}
              fieldData={fieldData}
              selectedAction={props.selectedAction}
              exceptionPdfDetails={props.exceptionPdfDetails}
              manualEntryOptionList={manualEntryOptionList}
              loading={manualEntryOptionLoading}
              setDataQualityValue={props.setDataQualityValue}
            />
          );
        }),
      };
    }
  );

  return (
    <div className={cn.controlWrapper}>
      {/* <CustomScrollbar className={cn.controlScroll}> */}
      <div className={cn.controlBody}>
        {props.exceptionPdfDetails?.extracted_data?.length ||
        props.exceptionPdfDetails?.applied_template ? (
          <Collapse items={items} accordion={true} />
        ) : (
          <EmptyState
            title={'No data found (Probably no template got detected)'}
            description={''}
            type={TYPES.RESULTS}
          />
        )}
      </div>
      {/* </CustomScrollbar> */}
    </div>
  );
};
FieldControlBlock.propTypes = {
  selectedAction: PropTypes.string,
  exceptionPdfDetails: PropTypes.object,
  updateManualEntryValue: PropTypes.func,
  manualEntryValue: PropTypes.any,
  setDataQualityValue: PropTypes.func,
};
