const throttleKeys = {};

/**
 * @param {string} key
 */
export function getThrottle(key) {
  /**
   * @param {fucntion} callback
   * @param {number} interval
   * @returns {void}
   */
  return (callback, interval = 500) => {
    if (throttleKeys[key]) {
      clearTimeout(throttleKeys[key]);
    }
    throttleKeys[key] = setTimeout(callback, interval);
  };
}
