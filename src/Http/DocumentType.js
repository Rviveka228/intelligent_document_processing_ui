/* eslint-disable no-console */
import {axiosClient} from '.';
import {API_URL} from './Http.constant';

export const createDocumentType = (payload) => {
  return axiosClient.post(API_URL.DOCUMENT_TYPE, payload);
};

export const getDocumentTypes = async (id) => {
  const response = await axiosClient.get(
    API_URL.DOCUMENT_TYPE + (id ? `/${id}` : '')
  );
  return response;
};

export const deleteDocument = async (id) => {
  const response = await axiosClient.delete(API_URL.DOCUMENT_TYPE + `/${id}`);
  return response;
};

export const getDocumentList = () => {
  const requestedUrl = API_URL.DOCUMENT_TYPES;
  return axiosClient.get(requestedUrl);
};
