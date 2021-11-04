import { TEST_NET_KEYS, CORS_ADDRESS } from '../constants/common';
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import queryString from 'querystring';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import { createTimestamp } from '../components/utils';
import { addLogCritical } from '../components/LogsDisplay/LogsDisplay.effect';
import { ServerUrlsEnum } from '../constants/Binance/ServerUrlsEnum';
import { KEYS } from '../keys';

const { apiKey, secretKey } = KEYS ?? TEST_NET_KEYS;

const signQueryText = (queryText: string) => hmacSHA256(queryText, secretKey).toString();

const getQueryParams = (data?: Nullable<object>) => {
  const timestamp = createTimestamp();
  const dataWithTimestamp = data ? { ...data, timestamp } : { timestamp };
  const queryText = queryString.stringify(dataWithTimestamp);
  const signature = signQueryText(queryText);

  return { ...dataWithTimestamp, signature };
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${CORS_ADDRESS}${KEYS ? ServerUrlsEnum.base : ServerUrlsEnum.baseTest}v3/`,
  timeout: 300 * 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-MBX-APIKEY': apiKey,
  },
});

axiosInstance.interceptors.response.use(
  (response): AxiosPromise<any> => {
    return Promise.resolve(response);
  },
  (error): AxiosPromise<any> => {
    const errorLog = error.response.data || { code: error.response.status, msg: error.response.statusText };
    addLogCritical(errorLog);

    return Promise.reject(error);
  }
);

export abstract class RequestService {
  protected static serviceApi = axiosInstance;

  protected static get<T>(url: string, data?: Nullable<object>, options?: AxiosRequestConfig): AxiosPromise<T> {
    if (url.match(/exchangeInfo/)) {
      return this.serviceApi.get(url, options);
    }

    const allQueryParams = getQueryParams(data);
    const fullUrl = `${url}?${queryString.stringify(allQueryParams)}`;

    return this.serviceApi.get(fullUrl, options);
  }

  protected static post<T>(url: string, data?: Nullable<object>, options?: AxiosRequestConfig): AxiosPromise<T> {
    const allQueryParams = getQueryParams(data);

    return this.serviceApi.post(url, queryString.stringify(allQueryParams), options);
  }

  protected static put<T>(url: string, data?: Nullable<object>, options?: AxiosRequestConfig): AxiosPromise<T> {
    return this.serviceApi.put(url, data, options);
  }

  protected static patch<T>(url: string, data?: Nullable<object>, options?: AxiosRequestConfig): AxiosPromise<T> {
    return this.serviceApi.patch(url, data, options);
  }

  protected static delete<T>(url: string, data?: Nullable<object>, options?: AxiosRequestConfig): AxiosPromise<T> {
    const allQueryParams = getQueryParams(data);
    const fullUrl = `${url}?${queryString.stringify(allQueryParams)}`;

    return this.serviceApi.delete(fullUrl, options);
  }
}
