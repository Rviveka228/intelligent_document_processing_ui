import PropTypes from 'prop-types';

import {VIEW_TYPE} from '../../Utils/constants';
import {useMediaType} from '../../MediaType.provider';

/**
 * Tablet
 *  - Components renders its children only
 *    VIEW_TYPE === TAB
 */
export function Tablet({children}) {
  const mediaType = useMediaType();
  if (mediaType === VIEW_TYPE.TAB) return children;
  else return null;
}

Tablet.propTypes = {
  /**
   * Children
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
  ]),
};
