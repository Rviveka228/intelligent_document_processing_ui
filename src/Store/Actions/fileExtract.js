import {fileExtractActions} from '../Reducers/fileExtract';

export const setFileExtractData = (data) => {
  return (dispatch) => {
    dispatch(fileExtractActions.setPdfExtractInfo(data));
  };
};
