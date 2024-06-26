/* eslint-disable no-console */
import {axiosClient} from '.';
import {API_URL} from './Http.constant';

export const getTemplates = (payloadParams) => {
  const requestedUrl = API_URL.TEMPLATES;
  return axiosClient.get(requestedUrl, {params: payloadParams});
};

export const getTemplatesDetails = (payloadParams) => {
  const requestedUrl = API_URL.TEMPLATE_DETAILS;
  return axiosClient.get(requestedUrl, {params: payloadParams});
};

// eslint-disable-next-line camelcase
export const getTemplateById = (id, s3_url = '') => {
  const baseUrl = API_URL.TEMPLATES;
  const requestedUrl = `${baseUrl}/${id}`;
  // eslint-disable-next-line camelcase
  return axiosClient.get(requestedUrl, {params: {s3_url}});
};

export const setTemplates = (payload) => {
  return axiosClient.post(API_URL.TEMPLATES, payload);
};

export const deleteTemplate = (id) => {
  const requestedUrl = id ? API_URL.TEMPLATES + '/' + id : API_URL.TEMPLATES;
  return axiosClient.delete(requestedUrl);
};
