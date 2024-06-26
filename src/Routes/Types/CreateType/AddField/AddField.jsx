/* eslint-disable max-lines */
import React from 'react';
import PropType from 'prop-types';
import {SVGIcons} from '../../../../Components/SVGIcons';
import {InputBox} from '../../../../Components/InputBox/InputBox';
import {SelectElement} from '../../../../Components/SelectElement/SelectElement';
import {Checkbox} from 'antd';
import {Card} from '../../../../Components/Card/Card';
import cn from './AddField.module.scss';
import {DATE_FORMATS, FIELD_TYPES} from './AddField.constant';

export const AddField = (props) => {
  return (
    <li className={cn.fieldsBlock}>
      <Card className={cn.fieldsCard}>
        {!props.disableClose && (
          <div
            className={cn.fieldsNew}
            onClick={() => props.handleCloseField(props.index)}>
            <span>
              <SVGIcons type='SVG-cross-mark' />
            </span>
          </div>
        )}
        <div className={cn.fieldsElements}>
          <label>Field Name</label>
          <InputBox
            status={
              props.index === 0 && !props.fieldData.name && props.showError
                ? 'error'
                : ''
            }
            placeholderLabel={'Field name'}
            value={props.fieldData.name}
            onChange={(event) =>
              props.setFieldData({
                value: event.target.value,
                index: props.index,
                key: 'name',
              })
            }
          />
        </div>
        {props.fieldData.type === 'date' && (
          <>
            <div className={cn.fieldsElements}>
              <div className={cn.fieldSide}>
                <div className={cn.fieldSide__item}>
                  <label>Min</label>
                  <InputBox
                    status={
                      props.index === 0 &&
                      !props.fieldData.min &&
                      props.showError
                        ? 'error'
                        : ''
                    }
                    placeholderLabel={'Min date'}
                    value={props.fieldData.min}
                    onChange={(event) =>
                      props.setFieldData({
                        value: event.target.value,
                        index: props.index,
                        key: 'min',
                      })
                    }
                  />
                </div>
                <div className={cn.fieldSide__item}>
                  <label>Max</label>
                  <InputBox
                    status={
                      props.index === 0 &&
                      !props.fieldData.max &&
                      props.showError
                        ? 'error'
                        : ''
                    }
                    placeholderLabel={'Max date'}
                    value={props.fieldData.max}
                    onChange={(event) =>
                      props.setFieldData({
                        value: event.target.value,
                        index: props.index,
                        key: 'max',
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className={cn.fieldsElements}>
              <label>Date Format</label>
              <SelectElement
                placeholder='Select date formats'
                options={DATE_FORMATS}
                onChange={(value) => {
                  props.setFieldData({
                    value: value,
                    index: props.index,
                    key: 'dateFormat',
                  });
                }}
                value={props.fieldData.dateFormat}
              />
            </div>
          </>
        )}
        {props.fieldData.type === 'number' && (
          <>
            <div className={cn.fieldsElements}>
              <div className={cn.fieldSide}>
                <div className={cn.fieldSide__item}>
                  <label>Min</label>
                  <InputBox
                    status={
                      props.index === 0 &&
                      !props.fieldData.min &&
                      props.showError
                        ? 'error'
                        : ''
                    }
                    placeholderLabel={'Min length'}
                    value={props.fieldData.min}
                    onChange={(event) =>
                      props.setFieldData({
                        value: event.target.value,
                        index: props.index,
                        key: 'min',
                      })
                    }
                  />
                </div>
                <div className={cn.fieldSide__item}>
                  <label>Max</label>
                  <InputBox
                    status={
                      props.index === 0 &&
                      !props.fieldData.max &&
                      props.showError
                        ? 'error'
                        : ''
                    }
                    placeholderLabel={'Max length '}
                    value={props.fieldData.max}
                    onChange={(event) =>
                      props.setFieldData({
                        value: event.target.value,
                        index: props.index,
                        key: 'max',
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {props.fieldData.type === 'string' && (
          <>
            <div className={cn.fieldsElements}>
              <div className={cn.fieldSide}>
                <div className={cn.fieldSide__item}>
                  <label>Min</label>
                  <InputBox
                    status={
                      props.index === 0 &&
                      !props.fieldData.name &&
                      props.showError
                        ? 'error'
                        : ''
                    }
                    placeholderLabel={'Min length'}
                    value={props.fieldData.min}
                    onChange={(event) =>
                      props.setFieldData({
                        value: event.target.value,
                        index: props.index,
                        key: 'min',
                      })
                    }
                  />
                </div>
                <div className={cn.fieldSide__item}>
                  <label>Max</label>
                  <InputBox
                    status={
                      props.index === 0 &&
                      !props.fieldData.max &&
                      props.showError
                        ? 'error'
                        : ''
                    }
                    placeholderLabel={'Max length '}
                    value={props.fieldData.max}
                    onChange={(event) =>
                      props.setFieldData({
                        value: event.target.value,
                        index: props.index,
                        key: 'max',
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className={cn.fieldsElements}>
              <label>Regex</label>
              <InputBox
                status={
                  props.index === 0 && !props.fieldData.regex && props.showError
                    ? 'error'
                    : ''
                }
                placeholderLabel={'Regex (Optional)'}
                value={props.fieldData.regex}
                onChange={(event) =>
                  props.setFieldData({
                    value: event.target.value,
                    index: props.index,
                    key: 'regex',
                  })
                }
              />
            </div>
          </>
        )}
        <div className={cn.fieldsElements}>
          <label>Select Types</label>
          <SelectElement
            placeholder='Select Types'
            options={FIELD_TYPES}
            onChange={(value) =>
              props.setFieldData({
                value: value,
                index: props.index,
                key: 'type',
              })
            }
            value={props.fieldData.type ? props.fieldData.type : null}
            status={
              (!props.fieldData.type &&
                props.fieldData.name &&
                props.showError) ||
              (!props.fieldData.type && props.index === 0 && props.showError)
                ? 'error'
                : ''
            }
          />
        </div>
        <div className={cn.fieldIsRequired}>
          <Checkbox
            checked={props.fieldData.required}
            onChange={(event) => {
              props.setFieldData({
                value: event.target.checked,
                index: props.index,
                key: 'required',
              });
            }}>
            Required
          </Checkbox>
        </div>
      </Card>
    </li>
  );
};

AddField.propTypes = {
  fieldData: PropType.any,
  index: PropType.number,
  setFieldData: PropType.func,
  handleCloseField: PropType.func,
  disableClose: PropType.bool,
  showError: PropType.bool,
};
