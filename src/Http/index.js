import axios from 'axios';
import {URL} from './Http.constant';

export const apiClient = async (path, options = {}) => {
  const mergedOptions = {
    ...options,
    headers: {
      ...options.headers,
    },
  };

  return fetch(`${URL.BASE_URL}/${path}`, mergedOptions)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw data;
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};
export const axiosClient = axios.create({
  baseURL: URL.BASE_URL,
});
