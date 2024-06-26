import React from 'react';
import PropTypes from 'prop-types';
import {Tag} from 'antd';

export function Tags(props) {
  return (
    <Tag color={props.color} closable={props.closable}>
      {props.children}
    </Tag>
  );
}

Tags.propTypes = {
  /**
   * Chilren of the tag
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
  ]),
  /**
   * Color of the tag
   */
  color: PropTypes.string,
  /**
   * Whether the Tag can be closed
   */
  closable: PropTypes.bool,
  /**
   * Callback executed when tag is closed
   */
  onClose: PropTypes.func,
};
