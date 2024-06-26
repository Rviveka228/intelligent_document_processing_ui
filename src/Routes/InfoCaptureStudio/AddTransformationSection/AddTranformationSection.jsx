/* eslint-disable max-lines */
import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useMutation, useQuery} from 'react-query';

import {AddTransformationTab} from './AddTransformationTab';
import {TRANSFORMATION_OPTIONS} from './AddTransformationSection.constants';
import CustomScrollbar from '../../../Components/CustomScrollbar';
import {Loader} from '../../../Components/Loader';

import cn from './AddTransformationSection.module.scss';
import {
  getTransfromationList,
  getTransfromedValue,
} from '../../../Http/AddTransformation';
import {Notification} from '../../../Components/Notification';
import {TransformationBlock} from './TransformationBlock';
import Button from '../../../Components/Button';
import EmptyState, {TYPES} from '../../../Components/EmptyState/EmptyState';

export const AddTranformationSection = (props) => {
  const [transformedData, setTransformedData] = useState({});

  const {
    transformations,
    setTransformations,
    selectedOptions,
    setSelectedOption,
    reviewFieldMapMutation,
  } = props;

  const keyvaultData = props.keyValueFields.find(
    (item) => item?.id === selectedOptions?.id
  );

  const getExtractedValue = () => {
    let extractedValue = {};

    props?.reviewedData?.forEach((item) => {
      if (item) {
        const keys = Object?.keys(item);

        keys?.forEach((key) => {
          if (item[key]) {
            extractedValue = {
              ...extractedValue,
              [key]:
                item[key] +
                ` ${extractedValue[key] ? ', ' + extractedValue[key] : ''}`,
            };
          }
        });
      }
    });

    return extractedValue;
  };
  // const getValue = () => {
  //   return selectedOptions?.type === 'LLM'
  //     ? getExtractedValue()?.[selectedOptions?.field] || 'N/A'
  //     : keyvaultData?.quote || 'N/A';
  // };

  const getValue = () => {
    switch (selectedOptions?.type) {
      case 'LLM':
      case 'FIELD_KEY':
      case 'REPEATED_ENTITY':
      case 'TABLE_ENTITY':
        return getExtractedValue()?.[selectedOptions?.field] || 'N/A';
      default:
        return keyvaultData?.quote || 'N/A';
    }
  };

  useEffect(() => {
    if (selectedOptions.id) {
      const selectedData = props.templateValues.find(
        (item) => item?.id === selectedOptions?.id
      );
      setSelectedOption(selectedData);
    }
  }, [props.templateValues]);

  const {data: transformationData, isError} = useQuery({
    queryKey: 'getTransfromationList',
    queryFn: () => getTransfromationList(),
    retry: 0,
    refetchOnWindowFocus: false,
  });
  const transformationOptionList = useMemo(
    () =>
      transformationData?.data?.transformations.map((item) => ({
        label: item.name,
        key: item.name,
      })) || TRANSFORMATION_OPTIONS,
    [transformationData?.data]
  );
  const extractedValue = getValue();
  props.setExtractedResult(extractedValue);
  const {mutate: getTransformedData, isLoading} = useMutation(
    (data) => getTransfromedValue(data),
    {
      onSuccess: (data) => {
        setTransformedData({
          ...transformedData,
          [selectedOptions.id]: {
            value: data?.data?.transformed_data?.value?.join(', '),
            qc_check: data?.data?.transformed_data?.qc_check,
          },
        });
      },
      onError: () => {
        Notification({
          type: 'error',
          message: 'Failed to transform value',
        });
      },
    }
  );
  const handlechangeTransformation = (value) => {
    setTransformations(value);
  };
  const applyTransformation = () => {
    props.handleTranformationData({
      value: transformations[selectedOptions.id],
      key: 'transformation',
      id: selectedOptions?.id,
    });
    const payload = {
      values: extractedValue.split(','),
      // values: [extractedValue],
      transformation: transformations[selectedOptions.id],
      config_id: props.getDocumentTypeId,
      field: selectedOptions?.field,
    };
    getTransformedData(payload);
  };

  return (
    <>
      <div className={cn.tranformationAside}>
        <ul className={cn.keyvaultList}>
          <CustomScrollbar className={'pdf-aside-scroll'}>
            {props.templateValues.map((item, index) => (
              <AddTransformationTab
                key={index}
                indexKey={index}
                data={item}
                templateValues={props.templateValues}
                selectedValue={selectedOptions}
                onClick={(value) => setSelectedOption(value)}
              />
            ))}
          </CustomScrollbar>
        </ul>
      </div>
      <div className={cn.tranformationBody}>
        {props.loading ||
        (reviewFieldMapMutation?.isLoading && !props.isPreviewModalOpen) ? (
          <Loader customHeight={'150px'} visible />
        ) : isError ? (
          <EmptyState
            type={isError ? TYPES.SEARCH : TYPES.RESULTS}
            title={isError ? 'Something went wrong' : ''}
          />
        ) : (
          <>
            <div className={cn.tranformationBody__values}>
              {isLoading ? (
                <div className={cn.tranformationLoader}>
                  <Loader visible />
                </div>
              ) : (
                <ul className={cn.valuesList}>
                  <li>
                    <span>Extracted value :</span> <h5>{extractedValue}</h5>
                  </li>
                  <li>
                    <span> Transformed value :</span>
                    <h5>
                      {transformedData[selectedOptions?.id]?.value ??
                        'No Transformation Applied'}
                    </h5>
                    <Button size={'small'} onClick={applyTransformation}>
                      Try Transformation
                    </Button>
                  </li>
                  <li>
                    <span>Data quality:</span>
                    <h5>
                      {transformedData[selectedOptions?.id]?.qc_check ?? ''}
                    </h5>
                  </li>
                </ul>
              )}
            </div>
            <TransformationBlock
              transformationOptionList={transformationOptionList}
              handlechangeTransformation={handlechangeTransformation}
              templateValues={props.templateValues}
              selectedValue={selectedOptions}
              transformationData={transformationData}
              templateDetails={props.templateDetails}
            />
            {/* {!!selectedOptions?.transformation?.length && (
              <div className={cn.tranformationBody__selectedList}>
                <h5>Selected Transformations</h5>
                <ul>
                  {selectedOptions?.transformation.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )} */}
          </>
        )}
      </div>
    </>
  );
};

AddTranformationSection.propTypes = {
  templateValues: PropTypes.any,
  keyValueFields: PropTypes.any,
  loading: PropTypes.bool,
  reviewedData: PropTypes.any,
  handleTranformationData: PropTypes.func,
  getDocumentTypeId: PropTypes.string,
  transformations: PropTypes.object,
  setTransformations: PropTypes.func,
  selectedOptions: PropTypes.object,
  setSelectedOption: PropTypes.func,
  setExtractedResult: PropTypes.func,
  reviewFieldMapMutation: PropTypes.object,
  templateDetails: PropTypes.array,
  isPreviewModalOpen: PropTypes.bool,
};
