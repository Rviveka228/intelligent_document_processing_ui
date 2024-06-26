import React from 'react';
import PropTypes from 'prop-types';

export function Description(props) {
  return <p>{props.description}</p>;
}

Description.propTypes = {
  /**
   * Description to be shown under the Title
   */
  description: PropTypes.string,
};
