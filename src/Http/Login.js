import {axiosClient} from '.';
import {API_URL} from './Http.constant';

export const userLogin = async (payload) => {
  const response = await axiosClient.post(API_URL.LOGIN, payload);
  return response?.data ?? {};
};
