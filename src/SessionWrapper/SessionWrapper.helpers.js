import {jwtDecode} from 'jwt-decode';
import {LOCAL_STORAGE} from '../Utils/constants';
import {LocalStorage} from '../Utils/localStorageUtil';

export const processSessionDetails = () => {
  const sessionToken = LocalStorage.getItem(LOCAL_STORAGE.SESSION_TOKEN);
  if (sessionToken) {
    const decodedDetails = jwtDecode(sessionToken);
    const valid = decodedDetails.exp * 1e3 > +new Date();
    return {
      valid,
      isAdmin: decodedDetails.admin === 'True',
    };
  }
  return {
    valid: false,
    isAdmin: false,
  };
};
