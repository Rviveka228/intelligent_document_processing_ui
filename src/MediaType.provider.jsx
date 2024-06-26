import React from 'react';
import PropTypes from 'prop-types';
import {EVENT, VIEW_TYPE} from './Utils/constants';
import {getThrottle} from './Utils/throttle';

const QUERY_WEB = 'only screen and (min-width: 1024px)';
const QUERY_TAB = 'only screen and (min-width: 768px) and (max-width: 1023px)';
const QUERY_MOB = 'only screen and (min-width: 320px) and (max-width: 767px)';

const MEDIA_WEB = window.matchMedia(QUERY_WEB);
const MEDIA_TAB = window.matchMedia(QUERY_TAB);
const MEIDA_MOB = window.matchMedia(QUERY_MOB);

const DELAY = 100;

const MediaTypeContext = React.createContext(VIEW_TYPE.WEB);

/**
 * MediaTypeProvider:
 *  - Provides a React.Context Wrapper
 *    The component listen to MediaQueryUpdates and return VIEW_TYPE [ 'WEB', 'MOB' 'TAB']
 */
export function MediaTypeProvider(props) {
  const throttle = getThrottle('MediaTypeResizeThrottle');

  const [type, setType] = React.useState(VIEW_TYPE.WEB);

  const matchWeb = React.useCallback(() => MEDIA_WEB.matches, []);

  const matchTab = React.useCallback(() => MEDIA_TAB.matches, []);

  const matchMob = React.useCallback(() => MEIDA_MOB.matches, []);

  const setNewType = React.useCallback(() => {
    switch (true) {
      case matchMob(): {
        setType(VIEW_TYPE.MOB);
        break;
      }
      case matchTab(): {
        setType(VIEW_TYPE.TAB);
        break;
      }
      case matchWeb():
      default:
        setType(VIEW_TYPE.WEB);
    }
  }, [setType, matchWeb, matchTab, matchMob]);

  const onResize = React.useCallback(() => {
    throttle(setNewType, DELAY);
  }, [setNewType]);

  React.useEffect(() => {
    window.addEventListener(EVENT.RESIZE, onResize);
    return () => window.removeEventListener(EVENT.RESIZE, onResize);
  }, [onResize]);

  React.useEffect(() => {
    setNewType();
  }, [setNewType]);

  return (
    <MediaTypeContext.Provider value={type}>
      {props.children}
    </MediaTypeContext.Provider>
  );
}

MediaTypeProvider.propTypes = {
  /**
   * Root node for all child components that need to use MediaType Context
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

/**
 * useMediaType: Hook to get the current VIEW_TYPE
 */
export function useMediaType() {
  const mediaType = React.useContext(MediaTypeContext);
  return mediaType;
}
