import { KeyString } from '../models/common';

export const SATOSHI = 0.00000001;
export const corsAnywhereAddress = 'https://mysterious-depths-90933.herokuapp.com/';
export const binanceUrls: KeyString<string> = {
  base: 'https://api.binance.com/api/',
  wapi: 'https://api.binance.com/wapi/',
  sapi: 'https://api.binance.com/sapi/',
  fapi: 'https://fapi.binance.com/fapi/',
  dapi: 'https://dapi.binance.com/dapi/',
  fapiTest: 'https://testnet.binancefuture.com/fapi/',
  dapiTest: 'https://testnet.binancefuture.com/dapi/',
};

export const API = {
  MAIN_NET: {
    url: 'https://api.binance.com/api/',
    apiKey: 'iBHButAQTdUpHErwzdBHoduGaGpQt6CgCPPkk5TC1XhXNokH4w4trXvw3sDsjzkN',
    secretKey: 'l0B1FEqUhet8nDjZWNMdmOTjfvVNVjozP6duEF2oNH9VYwJSwWHEAV4Ea3INB7CD',
  },
  TEST_NET: {
    url: 'https://testnet.binance.vision/api/v3/',
    apiKey: 'xMJk41FVuinX538rGB0oi6aH5PZGFkfynXEb3AfRbJMLVCm6SobGgngqom3cIaEg',
    secretKey: '2HxKgn0cVd58i1617gCxVJyUc740auQfL3NOGuv3BC1XZRxvRFyg1Wn1uwQrAW6y',
  },
};
