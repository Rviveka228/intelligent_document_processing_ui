import React from 'react';
import PropTypes from 'prop-types';

import {Provider} from 'react-redux';
import {store} from './Store';

/**
 * ReduxProvider
 *  - Wrapper that connect Redux to the Application
 */
export function ReduxProvider({children}) {
  return <Provider store={store}>{children}</Provider>;
}

ReduxProvider.propTypes = {
  /**
   * Child Components
   */
  children: PropTypes.element.isRequired,
};
