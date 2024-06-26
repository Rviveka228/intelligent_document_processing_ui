import {HttpRequest} from './Http';
import {API_URL} from './Http.constant';

export const getUser = () => {
  const api = new HttpRequest({route: API_URL.USER});
  return api.get();
};

export const addNewUser = (payload) => {
  const api = new HttpRequest({});
  return api.post(API_URL.USER, payload);
};

export const deleteUser = (payload) => {
  const api = new HttpRequest({});
  return api.delete(API_URL.USER + '/' + payload.id);
};

export const forgotPassword = (payload) => {
  const api = new HttpRequest({});
  return api.post(API_URL.FORGOT, payload);
};

export const logoutUser = () => {
  const api = new HttpRequest({});
  return api.delete(API_URL.LOGOUT);
};
