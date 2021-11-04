import { RateLimitersEnum, RateLimitIntervalsEnum } from '../constants/Binance/RateEnums';
import { Symbol } from './Symbol';

interface RateLimiter {
  rateLimitType: RateLimitersEnum;
  interval: RateLimitIntervalsEnum;
  intervalNum: number;
  limit: number;
}

export interface ExchangeInformation {
  timezone: string;
  serverTime: number;
  rateLimits: RateLimiter[];
  exchangeFilters: [
    //These are the defined filters in the `Filters` section.
  //All filters are optional.
  ];
  symbols: Symbol[];
}
