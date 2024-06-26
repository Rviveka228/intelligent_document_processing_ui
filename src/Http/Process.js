/* eslint-disable no-console */
import {axiosClient} from '.';
import {API_URL} from './Http.constant';

export const processPdf = (payload) => {
  return axiosClient.post(API_URL.SPEC_VERIFY, payload);
};
