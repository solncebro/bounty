import Binance from 'node-binance-api';
import { KeyString } from '../models/common';
import { API, binanceUrls, corsAnywhereAddress } from '../constants/common';

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
