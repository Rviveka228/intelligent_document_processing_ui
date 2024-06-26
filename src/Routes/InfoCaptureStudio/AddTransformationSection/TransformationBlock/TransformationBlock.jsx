/* eslint-disable max-lines */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import cn from './TransformationBlock.module.scss';
import {Button, Dropdown, Space} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {SVGIcons} from '../../../../Components/SVGIcons';
import {InputBox} from '../../../../Components/InputBox/InputBox';
import {appliedTransformationFormatter} from './TransformationBlock.helpers';

export const TransformationBlock = (props) => {
  const [transformations, setTransformations] = useState({});
  const [inputs, setInputs] = useState({});
  const [currentId, setCurrentId] = useState(null);
  const [isMount, setIsMount] = useState(true);

  useEffect(() => {
    if (
      currentId !== props.selectedValue?.id &&
      Object.keys(transformations).length
    ) {
      if (isMount) {
        setIsMount(false);
        props.handlechangeTransformation(transformations);
      }
      setCurrentId(props.selectedValue?.id);
      const tempValue = transformations[props.selectedValue.id];
      let inputValue = {};
      tempValue.forEach((item) => {
        if (item?.input_fields) {
          inputValue = {...inputValue, ...item?.input_fields};
        }
      });
      setInputs(inputValue);
    }
  }, [props.selectedValue?.id, Object.keys(transformations).length]);

  const onChange = (event) => {
    setTransformations((currentTransformations) => {
      const newTransformations = [
        ...currentTransformations[props.selectedValue?.id],
        {
          name: event.key,
        },
      ];
      const updatedTransformations = {
        ...currentTransformations,
        [props.selectedValue?.id]: newTransformations,
      };

      props.handlechangeTransformation(updatedTransformations);
      return updatedTransformations;
    });
  };

  const onRemove = (key) => () => {
    setTransformations((currentTransformations) => {
      const newTransformations = currentTransformations[
        props.selectedValue?.id
      ].filter((item) => item.name !== key);
      if (key === 'replaceValue') {
        setInputs({});
      }
      const updatedTransformations = {
        ...currentTransformations,
        [props.selectedValue?.id]: newTransformations,
      };
      props.handlechangeTransformation(updatedTransformations);

      return updatedTransformations;
    });
  };

  const handleInputChange = (fieldName, value) => {
    setInputs({...inputs, [fieldName]: value});
    setTransformations((currentTransformations) => {
      let existingArray = currentTransformations[props.selectedValue?.id];
      existingArray = existingArray.map((item) => {
        if (item.name === 'replaceValue') {
          return {
            ...item,
            input_fields: {
              ...item.input_fields,
              replace_with: item.input_fields?.replace_with
                ? item.input_fields?.replace_with
                : '',
              [fieldName]: value,
            },
          };
        }
        return item;
      });
      const updatedTransformations = {
        ...currentTransformations,
        [props.selectedValue?.id]: existingArray,
      };
      props.handlechangeTransformation(updatedTransformations);
      return updatedTransformations;
    });
  };

  let menuProps = {items: [], onClick: onChange};
  if (transformations[props.selectedValue?.id]) {
    menuProps = {
      ...menuProps,
      items: props.transformationOptionList.filter((item) => {
        return !transformations[props.selectedValue?.id].some(
          (sItem) => sItem.name === item.key
        );
      }),
    };
  }

  useEffect(() => {
    if (
      props.templateValues &&
      props.templateValues.length &&
      !Object.keys(transformations).length
    ) {
      let templatesValues = {};
      if (props.templateDetails.length) {
        props.templateValues.forEach((item) => {
          const templateValue = appliedTransformationFormatter(
            props.templateDetails
          ).find(
            (fItem) =>
              fItem?.field === item.field &&
              fItem.key === item.key &&
              fItem?.type === item.type
          );
          templatesValues = {
            ...templatesValues,
            [item.id]: templateValue?.transformation ?? [],
          };
        });
      } else {
        props.templateValues.forEach((item) => {
          templatesValues = {...templatesValues, [item.id]: []};
        });
      }
      setTransformations(templatesValues);
    }
  }, [props.templateValues]);
  // const replaceValueIndex = transformations[props.selectedValue.id].findIndex(
  //   (item) => item.name === 'replaceValue'
  // );
  let replaceValueIndex;
  if (transformations[props.selectedValue?.id]) {
    replaceValueIndex = transformations[props.selectedValue?.id].findIndex(
      (item) => item.name === 'replaceValue'
    );
  }

  return (
    <div className={cn.transformationBlock}>
      {replaceValueIndex >= 0 ? (
        <div>
          {props.transformationData?.data?.transformations
            .filter((item) => item.input_fields)
            .map((transformation, index) => (
              <div key={index} className={cn.transformationBlock__forms}>
                <label>{transformation.name}</label>
                <div className={cn.transformElement}>
                  {transformation.input_fields.map((field, fieldIndex) => {
                    return (
                      <div
                        key={fieldIndex}
                        className={cn.transformElement__block}>
                        <InputBox
                          type='text'
                          value={inputs[field] || ''}
                          onChange={(e) =>
                            handleInputChange(field, e.target.value)
                          }
                          placeholderLabel={field}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      ) : null}
      <h4> Selected Transformations</h4>
      <ul className={cn.transformationBlock__list}>
        {Object.keys(transformations).map((item) => {
          if (item === props.selectedValue?.id) {
            return transformations[item].map((item, key) => (
              <li key={`${item.name}-${key}`}>
                <div className={cn.appliedTransform}>
                  <span className={cn.appliedTransform__label}>
                    {item.name}
                  </span>
                  <span
                    onClick={onRemove(item.name)}
                    className={cn.appliedTransform__close}>
                    <SVGIcons type='SVG-cross-mark' />
                  </span>
                </div>
              </li>
            ));
          }
          return null;
        })}
      </ul>
      {!!menuProps.items?.length && (
        <div className={cn.transformationBlock__button}>
          <Dropdown trigger={'click'} menu={menuProps}>
            <Button>
              <PlusOutlined /> Add Transformation
            </Button>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

TransformationBlock.propTypes = {
  transformationOptionList: PropTypes.array,
  handlechangeTransformation: PropTypes.func,
  templateValues: PropTypes.array,
  selectedValue: PropTypes.string,
  transformationData: PropTypes.array,
  templateDetails: PropTypes.array,
};
