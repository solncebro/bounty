import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { addLog } from '../components/LogsDisplay/LogsDisplay.effect';
import { API, corsAnywhereAddress } from '../constants/common';

const { url, apiKey } = API.TEST_NET;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${corsAnywhereAddress}${url}`,
  timeout: 300 * 1000,
  headers: {
    'X-MBX-APIKEY': apiKey,
  },
});

axiosInstance.interceptors.response.use(
  (response): AxiosPromise<any> => {
    return Promise.resolve(response);
  },
  (error): AxiosPromise<any> => {
    switch (error.response.status) {
      case 403: {
        addLog('WAF Limit (Web Application Firewall) has been violated');
        break;
      }
      case 429: {
        addLog('Break a request rate limit');
        break;
      }
      case 418: {
        addLog('IP has been auto-banned for continuing to send requests after receiving 429 codes');
        break;
      }
      case 418: {
        addLog('IP has been auto-banned for continuing to send requests after receiving 429 codes');
        break;
      }
    }

    if (error.response.status >= 500) {
      addLog(`Internal errors; the issue is on Binance's side`);
    }

    return Promise.reject(error);
  }
);
