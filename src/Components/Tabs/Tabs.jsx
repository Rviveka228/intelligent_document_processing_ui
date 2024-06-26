import React from 'react';
import PropTypes from 'prop-types';
import {Tabs} from 'antd';

export function TabsComponent(props) {
  return <Tabs {...props}>{props.children}</Tabs>;
}
TabsComponent.propTypes = {
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
};
