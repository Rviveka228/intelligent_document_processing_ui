import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from 'react-query';

import {App} from './App';
// import { SwitchThemeButton } from './Components/SwitchThemeButton';
import {ThemeProvider} from './Theme.provider';
import {ReduxProvider} from './Redux.provider';

import './main.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2000,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReduxProvider>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* <SwitchThemeButton /> */}
      </QueryClientProvider>
    </ThemeProvider>
  </ReduxProvider>
);
