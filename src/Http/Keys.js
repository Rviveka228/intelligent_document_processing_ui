/* eslint-disable no-console */
import {axiosClient} from '.';
import {API_URL} from './Http.constant';

export const fetchKeys = () => {
  return axiosClient.get(API_URL.KEYS);
};
