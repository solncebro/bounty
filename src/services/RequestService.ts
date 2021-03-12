import Binance from 'node-binance-api';
import { KeyString } from '../models/common';
import { API, binanceUrls, corsAnywhereAddress } from '../constants/common';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import queryString, { ParsedUrlQueryInput } from 'querystring';
import { axiosInstance } from './Axios';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import { createTimestamp } from '../components/utils';

const { url, apiKey, secretKey } = API.TEST_NET;

const proxyBinanceUrls = (): KeyString<string> => {
  return Boolean(url.match(/test/)?.length)
    ? { base: `${corsAnywhereAddress}${url}` }
    : Object.keys(binanceUrls).reduce(
        (acc, key) => ({ ...acc, [key]: `${corsAnywhereAddress}${binanceUrls[key]}` }),
        {}
      );
};

export const binance = new Binance().options({
  APIKEY: apiKey,
  APISECRET: secretKey,
  urls: proxyBinanceUrls(),
});

const signQueryText = (queryText: string) => hmacSHA256(queryText, secretKey).toString();

export abstract class RequestService {
  protected static serviceApi = axiosInstance;

  protected static get<T>(
    url: string,
    data?: Nullable<ParsedUrlQueryInput>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    const timestamp = createTimestamp();
    const dataWithTimestamp = data ? { ...data, timestamp } : { timestamp };
    const queryText = queryString.stringify(dataWithTimestamp);
    const signature = signQueryText(queryText);
    const fullUrl = `${url}?${queryString.stringify({ ...dataWithTimestamp, signature })}`;

    return this.serviceApi.get(fullUrl, options);
  }

  protected static post<T>(url: string, data?: Nullable<object>, options?: AxiosRequestConfig): AxiosPromise<T> {
    return this.serviceApi.post(url, data, options);
  }

  protected static put<T>(url: string, data?: Nullable<object>, options?: AxiosRequestConfig): AxiosPromise<T> {
    return this.serviceApi.put(url, data, options);
  }

  protected static patch<T>(url: string, data?: Nullable<object>, options?: AxiosRequestConfig): AxiosPromise<T> {
    return this.serviceApi.patch(url, data, options);
  }

  protected static delete<T>(
    url: string,
    data?: Nullable<ParsedUrlQueryInput>,
    options?: AxiosRequestConfig,
    disableURLExtends?: boolean
  ): AxiosPromise<T> {
    let newUrl: string = url;

    if (data && !disableURLExtends) {
      newUrl = `${newUrl}?${queryString.stringify(data)}`;
      return this.serviceApi.delete(url, options);
    }

    return this.serviceApi.delete(url, { ...options, data });
  }
}
