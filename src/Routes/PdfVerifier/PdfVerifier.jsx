/* eslint-disable no-console */
import React from 'react';
import PropType from 'prop-types';

import DocProcessor from './DocProcessor';

export function PdfVerifier() {
  return <DocProcessor />;
}
PdfVerifier.propTypes = {
  activeTabName: PropType.string,
};

PdfVerifier.defaultProps = {};
