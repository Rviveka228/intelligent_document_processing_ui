import {axiosClient} from '.';
import {API_URL} from './Http.constant';

export const getExceptionZoneList = (configId) => {
  return axiosClient.get(
    API_URL.PROCESS_FAILED_DOCS + (configId ? `/${configId}` : '')
  );
};

export const reProcessingUpload = (payload) => {
  return axiosClient.post(API_URL.RE_PROCESS, payload);
};

export const discardDocument = async (payload) => {
  return axiosClient.post(API_URL.DISCARD_DOCUMENT, payload);
};

export const manualEntry = async (payload) => {
  return axiosClient.post(API_URL.MANUAL_ENTRY, payload);
};

export const getDataQualityScore = async (payload) => {
  const response = await axiosClient.post(API_URL.DATA_QUALITY_SCORE, payload);
  return response?.data ?? {};
};
