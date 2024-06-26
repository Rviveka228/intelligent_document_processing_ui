/* eslint-disable no-prototype-builtins */
/* eslint-disable max-lines */
import axios from 'axios';
import {URL} from './Http.constant';
import {LocalStorage} from '../Utils/localStorageUtil';
import {LOCAL_STORAGE} from '../Utils/constants';

const pendingRequests = {};

export class HttpRequest {
  baseURL = undefined;
  abortController = undefined;
  route = undefined;
  instance = undefined;
  noAbort = undefined;
  withCredentials = undefined;

  constructor({
    baseURL = URL.BASE_URL,
    route = '',
    withCredentials = false,
    isExternalToken = false,
    noAbort = false,
  }) {
    this.route = route;
    this.baseURL = baseURL;
    this.withCredentials = withCredentials;
    this.abortController = new AbortController();
    this.instance = this.getInstance();
    this.isExternalToken = isExternalToken;
    this.noAbort = noAbort;
    this.addRequestInterceptor();
    this.addResponseInterceptor();
    return this.instance;
  }

  getInstance() {
    return axios.create({
      baseURL: `${this.baseURL}${this.route}`,
      signal: this.abortController.signal,
      withCredentials: this.withCredentials,
    });
  }

  abortRequest(abortController) {
    abortController.abort();
  }

  addToPendingRequests(config) {
    let requestKey = makeRequestKey(config);
    if (pendingRequests.hasOwnProperty(requestKey) && !this.noAbort) {
      this.abortRequest(pendingRequests[requestKey]);
    }
    pendingRequests[requestKey] = this.abortController;
  }

  removeFromPendingRequests(config) {
    let requestKey = makeRequestKey(config);
    if (pendingRequests.hasOwnProperty(requestKey)) {
      delete pendingRequests[requestKey];
    }
  }

  attachAuthorizationHeader(config) {
    const sessionToken = LocalStorage.getItem(LOCAL_STORAGE.SESSION_TOKEN);
    if (sessionToken) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }
  }

  addRequestInterceptor() {
    this.instance.interceptors.request.use(async (config) => {
      this.addToPendingRequests(config);
      this.attachAuthorizationHeader(config);
      return config;
    });
  }

  addResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response) => {
        this.removeFromPendingRequests(response);
        return response;
      },
      async (error) => {
        this.removeFromPendingRequests(error);
        throw error;
      }
    );
  }
}

function makeRequestKey(config) {
  return `${config.method}:${config.baseURL}${config.url}`;
}