import PropTypes from 'prop-types';

import {VIEW_TYPE} from '../../Utils/constants';
import {useMediaType} from '../../MediaType.provider';

/**
 * Desktop
 *  - Components renders its children only
 *    VIEW_TYPE === WEB
 */
export function Desktop({children}) {
  const mediaType = useMediaType();
  if (mediaType === VIEW_TYPE.WEB) return children;
  else return null;
}

Desktop.propTypes = {
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
