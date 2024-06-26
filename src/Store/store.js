import {configureStore} from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import {IS_DEV} from '../Utils/constants';
import floorDataReducer from './Reducers/floorData';
import fileExtractReducer from './Reducers/fileExtract';
import sessionDetailsReducer from './Reducers/sessionDetails';

const reducer = {
  floordata: floorDataReducer,
  fileExtract: fileExtractReducer,
  session: sessionDetailsReducer,
};

// const getMiddleware = (getDefaultMiddleware) =>
//   getDefaultMiddleware().concat(logger);

function getStore(isDevMode) {
  if (isDevMode) {
    return configureStore({
      reducer,
      // middleware: getMiddleware,
    });
  } else {
    return configureStore({
      reducer,
    });
  }
}

export const store = getStore(IS_DEV);
