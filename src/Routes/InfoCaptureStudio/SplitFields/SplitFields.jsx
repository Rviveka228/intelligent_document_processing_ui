/* eslint-disable max-lines */
import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {SelectElement} from '../../../Components/SelectElement/SelectElement';
import {Button, Checkbox} from 'antd';
import {getUniqueId} from '../../../Utils/commonUtils';
import {SVGIcons} from '../../../Components/SVGIcons';
import {getSplitFieldValues, getSplitFields} from '../../../Http/SplitFields';

import cn from './SplitFields.module.scss';
// eslint-disable-next-line max-len
import {appliedTransformationFormatter} from '../AddTransformationSection/TransformationBlock/TransformationBlock.helpers';

export const SplitFields = (props) => {
  const [showSplit, setShowSplit] = useState(false);
  const [splitFieldsValue, setSplitFieldsValue] = useState([]);
  const [splittedFields, setSplittedFields] = useState(props.splitFields ?? {});

  const selectedFieldId = props.selectedOptions?.id;

  const addField = () => {
    const newFields = [
      ...splittedFields[selectedFieldId],
      {id: getUniqueId(), field: null, value: null},
    ];
    setSplittedFields({...splittedFields, [selectedFieldId]: newFields});
  };

  const removeField = (id) => {
    const newFields = splittedFields[selectedFieldId].filter(
      (field) => field.id !== id
    );
    setSplittedFields({...splittedFields, [selectedFieldId]: newFields});
  };

  const handleFieldChange = ({id, type, value}) => {
    let newFields = [];
    if (
      splittedFields[selectedFieldId] &&
      splittedFields[selectedFieldId].length
    ) {
      newFields = (splittedFields[selectedFieldId] || []).map((field) =>
        field.id === id ? {...field, [type]: value} : field
      );
    } else {
      newFields.push({[type]: value});
    }

    // setFields(newFields);
    setSplittedFields({
      ...splittedFields,
      [selectedFieldId]: newFields,
    });
  };

  const onChange = (e) => {
    setShowSplit(e.target.checked);
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const loadSplitFieldsValueList = async () => {
    try {
      const response = await getSplitFieldValues();
      setSplitFieldsValue(
        response?.data?.split_methods.map((item) => {
          return {
            label: item?.label,
            value: item?.name,
          };
        })
      );
    } catch {
      // eslint-disable-next-line no-empty
    }
  };

  const splittedValuePayload = useMemo(() => {
    return (splittedFields[selectedFieldId] || [])
      .map((item) => {
        const fieldName = props.documentFields?.find(
          (fItem) => fItem.value === item.field
        )?.label;
        return {
          field_name: fieldName,
          split_method: item?.value,
        };
      })
      ?.filter((item) => item.split_method);
  }, [props.documentFields, splittedFields]);

  useEffect(() => {
    props.setSplitFields(splittedFields);
  }, [splittedValuePayload]);

  const onTrySplitClick = async () => {
    try {
      let payload = {
        value: props.extractedResult,
        field: splittedValuePayload,
      };
      const response = await getSplitFields(payload);
      const splitFields = response.data?.message ?? [];
      const newSplittedFields = splittedFields[selectedFieldId]?.map((item) => {
        const fieldName = props.documentFields?.find(
          (fItem) => fItem.value === item.field
        )?.label;
        const matchedSplitValue = splitFields.find(
          (fItem) => fItem.field === fieldName
        )?.value;
        return {
          ...item,
          splitValue: matchedSplitValue,
        };
      });
      setSplittedFields({
        ...splittedFields,
        [selectedFieldId]: newSplittedFields,
      });
      // eslint-disable-next-line no-empty
    } catch {}
  };

  useEffect(() => {
    loadSplitFieldsValueList();
  }, []);

  useEffect(() => {
    if (showSplit) {
      if (!splittedFields[selectedFieldId]) {
        setSplittedFields({
          ...splittedFields,
          [selectedFieldId]: [{id: getUniqueId(), field: null, value: null}],
        });
      }
    }
  }, [showSplit]);
  useEffect(() => {
    if (!splittedFields[selectedFieldId]) {
      setShowSplit(false);
    } else if (!showSplit) {
      setShowSplit(true);
    }
  }, [selectedFieldId]);

  useEffect(() => {
    if (props.templateDetails.length) {
      let splitFieldValues = {};
      appliedTransformationFormatter(props.templateDetails).forEach((item) => {
        const templateValue = props.templateValues.find(
          (fItem) =>
            fItem?.field === item.field &&
            fItem.key === item.key &&
            fItem?.type === item.type
        );
        if (item?.split_field_config?.length && templateValue?.id) {
          const fields = item?.split_field_config.map((fieldValues) => {
            const fieldId = props.documentFields?.find(
              (fItem) => fItem.label === fieldValues.field_name
            )?.value;
            return {
              id: getUniqueId(),
              field: fieldId,
              value: fieldValues?.split_method,
              splitValue: '',
            };
          });
          splitFieldValues = {...splitFieldValues, [templateValue?.id]: fields};
        }
      });
      setSplittedFields({...splitFieldValues, ...splittedFields});
      if (splitFieldValues[props.selectedOptions?.id]?.length) {
        setShowSplit(true);
      }
    }
  }, [props.templateDetails, props.selectedOptions]);

  return (
    <div className={cn.splitWrapper}>
      <div className={cn.splitHeader}>
        <div className={cn.splitHeader__item}>
          <Checkbox checked={showSplit} onChange={onChange}>
            Split Fields
          </Checkbox>
        </div>
      </div>
      <div className={cn.splitContent}>
        {showSplit &&
          (splittedFields[selectedFieldId] || []).map((item, index) => (
            <div key={item.id} className={cn.splitElements}>
              <div className={cn.splitElements__top}>
                <div className={cn.splitField}>
                  <SelectElement
                    filterOption={filterOption}
                    showSearch
                    placeholder='Field'
                    value={item.field}
                    options={props.documentFields}
                    onChange={(value) =>
                      handleFieldChange({id: item.id, type: 'field', value})
                    }
                  />
                </div>
                <div className={cn.splitField}>
                  <SelectElement
                    placeholder='Value'
                    value={item.value}
                    options={splitFieldsValue}
                    onChange={(value) =>
                      handleFieldChange({id: item.id, type: 'value', value})
                    }
                  />
                </div>
                <div className={cn.splitField}>
                  <div className={cn.splitControls}>
                    {splittedFields[selectedFieldId].length > 1 && (
                      <Button
                        className={cn.splitButton}
                        icon={<SVGIcons type='SVG-cross-mark' />}
                        onClick={() => removeField(item.id)}
                      />
                    )}
                    {splittedFields[selectedFieldId].length - 1 === index && (
                      <Button
                        className={cn.splitButton}
                        icon={<SVGIcons type='SVG-add' />}
                        type='primary'
                        onClick={addField}
                      />
                    )}
                  </div>
                </div>
              </div>
              {!!item.splitValue && (
                <div className={cn.splitElements__bottom}>
                  Splitted Value: {item.splitValue}
                </div>
              )}
            </div>
          ))}
      </div>
      {showSplit && (
        <div className={cn.splitSubmit}>
          <Button onClick={onTrySplitClick}>Try Split</Button>
        </div>
      )}
    </div>
  );
};
SplitFields.propTypes = {
  documentFields: PropTypes.array,
  extractedResult: PropTypes.string,
  setSplitFields: PropTypes.func,
  selectedOptions: PropTypes.object,
  templateDetails: PropTypes.array,
  templateValues: PropTypes.array,
  splitFields: PropTypes.array,
};
