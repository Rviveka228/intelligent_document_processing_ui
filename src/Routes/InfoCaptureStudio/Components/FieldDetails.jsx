import React from 'react';
import PropType from 'prop-types';
import {SVGIcons} from '../../../Components/SVGIcons';
import Button from '../../../Components/Button';
import cn from './Helpers.module.scss';
const FieldDetails = ({
  keyValue,
  templateValues,
  onMapNewField,
  onRevertFieldName,
}) => {
  return (
    <div className={cn.fieldDetails}>
      {(() => {
        const templateValue = templateValues.find(
          (template) => template.id === keyValue.id
        );

        if (templateValue.isNewlyMapped) {
          return (
            <>
              <div className={cn.detailsBlock}>
                <div className={cn.detailsHeading}>
                  <div className={cn.headingText}>
                    <h4>{keyValue.content}</h4>
                    <span>➔</span>
                    <h5>{templateValue.value}</h5>
                  </div>
                </div>
                <p>{keyValue.quote}</p>
                <div className={cn.detailsFooter}>
                  <Button
                    type='link'
                    onClick={() => onMapNewField(keyValue)}
                    icon={<SVGIcons type={'SVG-change'} />}>
                    Change Mapping
                  </Button>
                  <Button
                    type='link'
                    onClick={() =>
                      onRevertFieldName(keyValue.id, keyValue.content)
                    }
                    icon={<SVGIcons type={'SVG-delete'} />}>
                    Remove Mapping
                  </Button>
                </div>
              </div>
            </>
          );
        }
        return (
          <div className={cn.detailsBlock}>
            <div className={cn.detailsHeading}>
              <div className={cn.headingText}>
                <h4>{keyValue.content}</h4>
              </div>
              <div className={cn.headingControls}>
                <Button

                  type='link'
                  onClick={() => onMapNewField(keyValue)}>
                  Add Mapping
                </Button>
              </div>
            </div>
            <p>{keyValue.quote}</p>
          </div>
        );
      })()}
    </div>
  );
};

FieldDetails.propTypes = {
  keyValue: PropType.any,
  templateValues: PropType.any,
  onRevertFieldName: PropType.func,
  onMapNewField: PropType.func,
};

export default FieldDetails;
