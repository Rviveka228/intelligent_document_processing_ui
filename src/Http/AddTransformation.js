/* eslint-disable no-console */
import { axiosClient } from '.';
import { API_URL } from './Http.constant';

export const getTransfromationList = () => {
  return axiosClient.get(API_URL.TRANSFORMATIONS);
};

export const getTransfromedValue = (payload) => {
  return axiosClient.post(API_URL.TRANSFORM, payload);
};
