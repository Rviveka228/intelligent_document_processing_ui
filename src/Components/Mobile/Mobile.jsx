import PropTypes from 'prop-types';

import { VIEW_TYPE } from '../../Utils/constants';
import { useMediaType } from '../../MediaType.provider';

/**
 * Mobile
 *  - Components renders its children only
 *    VIEW_TYPE === MOB
 */
export function Mobile({ children }) {
  const mediaType = useMediaType();
  if (mediaType === VIEW_TYPE.MOB) return children;
  else return null;
}

Mobile.propTypes = {
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
