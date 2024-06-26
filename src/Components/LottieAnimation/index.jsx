import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import lottie from 'lottie-web';
import aiLoader from './LottieJson/aiLoader.json';
import aiEmptyState from './LottieJson/aiEmptyState.json';
import aiDashboardLoader from './LottieJson/aiDashboardLoader.json';
import cn from './style.module.scss';

const LottieAnimation = (props) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize Lottie animation
    const animation = lottie.loadAnimation({
      container: containerRef?.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: JSONS[props.type],
    });

    // Clean up on component unmount
    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div className={cn.animateLoader}>
      <div className={cn.animateLoader__icon} ref={containerRef} />
      {props.message && <p>{props.message}</p>}
    </div>
  );
};
export const ANIMATION_TYPES = {
  AI_LOADER: 'aiLoader',
  AI_EMPTY: 'aiEmpty',
  AI_DASHBOARD_LOADER: 'aiDashboardLoader',
};

const JSONS = {
  [ANIMATION_TYPES.AI_EMPTY]: aiEmptyState,
  [ANIMATION_TYPES.AI_LOADER]: aiLoader,
  [ANIMATION_TYPES.AI_DASHBOARD_LOADER]: aiDashboardLoader,
};

LottieAnimation.propTypes = {
  message: PropTypes.string,
  type: PropTypes.any,
};

export default LottieAnimation;
