import React from 'react';
import { useThemeProvider } from '../../Theme.provider';
import { INPUT } from '../../Utils/constants';

import cn from './SwitchThemeButton.module.scss';

export function SwitchThemeButton() {
  const { isDarkMode, toggleDarkMode } = useThemeProvider();

  return (
    <input
      className={cn.btn}
      type={INPUT.CHECKBOX}
      checked={isDarkMode}
      onChange={toggleDarkMode}
    />
  );
}
