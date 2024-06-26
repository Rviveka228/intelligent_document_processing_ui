import React from 'react';
import PropTypes from 'prop-types';
import {SVGIcons} from '../SVGIcons';
import cn from './TableAction.module.scss';

export const TableAction = ({
  data,
  onDeleteClick,
  onEditClick,
  hideEdit = false,
}) => (
  <ul className={cn.actionsBlock}>
    {!hideEdit && (
      <li onClick={() => onEditClick(data)}>
        <span>
          <SVGIcons type={'SVG-edit'} />
        </span>
      </li>
    )}
    <li onClick={() => onDeleteClick(data)}>
      <span>
        <SVGIcons type={'SVG-delete'} />
      </span>
    </li>
  </ul>
);

TableAction.propTypes = {
  data: PropTypes.object.isRequired, // Adjust the type based on the actual data structure
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  hideEdit: PropTypes.bool,
};
