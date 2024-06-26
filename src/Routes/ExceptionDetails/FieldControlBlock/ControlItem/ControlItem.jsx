import React, {useState} from 'react';
import PropTypes from 'prop-types';
import cn from './ControlItem.module.scss';
import {Input} from 'antd';
import {getDataQualityScore} from '../../../../Http/ExceptionZone';

export const ControlItem = (props) => {
  const [value, setValue] = useState('');
  const [dataQualityLoading, setDataQualityLoading] = useState(false);
  const [dataQualityScore, setDataQualityScore] = useState(
    props.fieldData?.data_quality_score
  );

  // const filterOption = (input, option) => {
  //   return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  // };

  const onBlur = () => {
    getDataQuality();
  };

  const getDataQuality = async () => {
    try {
      setDataQualityLoading(true);
      const response = await getDataQualityScore({
        document_id: props.exceptionPdfDetails?.document_id,
        data: {
          field: props.fieldData?.field,
          value,
          field_id: props.fieldData?.field_id,
        },
      });
      setDataQualityScore(response.message?.DQS);
      props.setDataQualityValue((current) => {
        return {
          ...current,
          [props.fieldData?.field_id]: response.message?.DQS,
        };
      });
      setDataQualityLoading(false);
    } catch {
      setDataQualityLoading(false);
    }
  };

  const onChange = (event) => {
    setValue(event.target?.value);
    props.updateManualEntryValue({
      [props.fieldData?.field]: event.target?.value,
    });
  };

  return (
    <div className={cn.controlItem}>
      <div className={cn.controlErrorStatus}>
        {props.selectedAction !== 'manualEntry' &&
          (props.fieldData?.reason_for_failure !== 'N/A' ? (
            <span className={cn.controlFailure}>Failed</span>
          ) : (
            <span className={cn.controlSuccess}>Success</span>
          ))}
      </div>
      <div className={cn.controlElement}>
        <label>Field</label>
        <span>{props.fieldData?.field}</span>
      </div>
      {props.selectedAction !== 'manualEntry' ? (
        <div className={cn.controlElement}>
          <label>Value</label>
          <span>{props.fieldData?.value}</span>
        </div>
      ) : (
        <div className={cn.controlElement}>
          <label>Value</label>
          {/* <SelectElement
              value={value[props.fieldData.field]}
              allowClear
              options={props.manualEntryOptionList}
              showSearch
              filterOption={filterOption}
              searchValue={searchValue}
              onSearch={setSearchValue}
              onKeyDown={onEnter}
              onChange={onChange}
              loading={props.loading}
            /> */}
          <Input value={value} onChange={onChange} onBlur={onBlur} />
        </div>
      )}

      <div className={cn.controlElement}>
        <label>Data Quality Score</label>
        <span loading={dataQualityLoading}>{dataQualityScore}</span>
      </div>
      {props.selectedAction !== 'manualEntry' &&
        props.fieldData?.reason_for_failure !== 'N/A' && (
          <div className={cn.controlElement}>
            <label>Reason For Failure</label>
            <span>{props.fieldData?.reason_for_failure}</span>
          </div>
        )}
    </div>
  );
};
ControlItem.propTypes = {
  selectedAction: PropTypes.string,
  fieldData: PropTypes.any,
  updateManualEntryValue: PropTypes.func,
  manualEntryOptionList: PropTypes.array,
  loading: PropTypes.bool,
  exceptionPdfDetails: PropTypes.object,
  setDataQualityValue: PropTypes.func,
};
