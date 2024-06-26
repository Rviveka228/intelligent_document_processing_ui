// import {axiosClient} from '.';
import {HttpRequest} from './Http';
import {API_URL} from './Http.constant';

export const getAdminSettingsFields = () => {
  const api = new HttpRequest({route: API_URL.ADMIN_SETTINGS});
  return api.get();
};

export const getAdminSettingsFieldList = (payload) => {
  const api = new HttpRequest({});
  return api.post(API_URL.ADMIN_SETTINGS, payload);
};
