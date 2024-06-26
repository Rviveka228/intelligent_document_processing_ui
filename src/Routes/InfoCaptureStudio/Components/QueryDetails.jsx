import React from 'react';
import PropType from 'prop-types';
import {SVGIcons} from '../../../Components/SVGIcons';
import Button from '../../../Components/Button';
import cn from './Helpers.module.scss';
const QueryDetails = ({templateValue, onMapQueryField, onRevertQueryField}) => {
  return (
    <div className={cn.fieldDetails}>
      <div className={cn.detailsBlock}>
        <div className={cn.detailsHeading}>
          <div className={cn.headingText}>
            <h4>{templateValue.key}</h4>
            {templateValue.isNewlyMapped && (
              <>
                <span>➔</span>
                <h5>{templateValue.field}</h5>
              </>
            )}
          </div>
          {!templateValue.isNewlyMapped && (
            <div className={cn.headingControls}>
              <Button
                type='link'
                onClick={() => onMapQueryField(templateValue)}>
                Add Mapping
              </Button>
            </div>
          )}
        </div>
        {templateValue.isNewlyMapped && (
          <div className={cn.detailsFooter}>
            <Button
              type='link'
              onClick={() => onMapQueryField(templateValue)}
              icon={<SVGIcons type={'SVG-change'} />}>
              Change Mapping
            </Button>
            <Button
              type='link'
              onClick={() =>
                onRevertQueryField(templateValue.id, templateValue.key)
              }
              icon={<SVGIcons type={'SVG-delete'} />}>
              Remove Mapping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

QueryDetails.propTypes = {
  keyValue: PropType.any,
  templateValue: PropType.any,
  onRevertQueryField: PropType.func,
  onMapQueryField: PropType.func,
};

export default QueryDetails;
