/* eslint-disable no-console */
import {axiosClient} from '.';
import {API_URL} from './Http.constant';

export const fetchCaptureInfo = (payload) => {
  return axiosClient.post(API_URL.CAPTURE_INFO, payload);
};
