import {axiosClient} from '.';
import {API_URL} from './Http.constant';

export const getSplitFieldValues = () => {
  return axiosClient.get(API_URL.SPLIT_FIELD);
};

export const getSplitFields = (payload) => {
  return axiosClient.post(API_URL.SPLIT_FIELD, payload);
};
