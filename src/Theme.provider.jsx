import React from 'react';
import PropTypes from 'prop-types';


const ContextDefault = {
  isDarkMode: false,
  toggleMode: () => {},
};

const ThemeContext = React.createContext(ContextDefault);

/**
 * ThemeProvider: Component for setting/tracking DarkMode
 */
export function ThemeProvider({children}) {
  const [isDarkMode, setIsDarkMode] = React.useState(ContextDefault.isDarkMode);

  const toggleDarkMode = () => setIsDarkMode((mode) => !mode);


  return (
    <ThemeContext.Provider value={{isDarkMode, toggleDarkMode}}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  /**
   * Child Eleemnts
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

/**
 * @typedef {Object} ThemeContext
 * @property {boolean} isDarkMode
 * @propTypes {function} toggleDarkMode
 */

/**
 * useThemeProvider: React Hook to listen to current theme
 * @returns {ThemeContext}
 */
export function useThemeProvider() {
  const {toggleDarkMode, isDarkMode} = React.useContext(ThemeContext);
  return {toggleDarkMode, isDarkMode};
}
