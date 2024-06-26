/* eslint-disable no-console */
import {axiosClient} from '.';
import {API_URL} from './Http.constant';

export const uploadPdf = (payload) => {
  return axiosClient.post(API_URL.SPEC_VERIFIER_ZIP_UPLOAD, payload);
};
