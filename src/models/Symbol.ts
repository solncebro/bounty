import { FilterTypesEnum } from '../constants/Binance/FilterTypesEnum';
import { OrderTypesEnum } from '../constants/Binance/OrderEnums';
import { SymbolStatusEnum } from '../constants/Binance/SymbolEmums';
import { TradePermissonEnum } from '../constants/Binance/TradePermissonEnum';

export interface SymbolBase {
  symbol: string;
}

export interface SymbolFilter {
  filterType: FilterTypesEnum;
  minPrice?: string;
  maxPrice?: string;
  tickSize?: string;
  avgPriceMins?: number;
  multiplierDown?: string;
  multiplierUp?: string;
  maxQty?: string;
  minQty?: string;
  stepSize?: string;
  applyToMarket?: boolean;
  minNotional?: string;
  limit?: number;
  maxNumOrders?: number;
  maxNumAlgoOrders?: number;
}

export interface Symbol extends SymbolBase {
  status: SymbolStatusEnum;
  baseAsset: string;
  baseAssetPrecision: 8;
  quoteAsset: string;
  quotePrecision: 8;
  quoteAssetPrecision: 8;
  orderTypes: OrderTypesEnum[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: SymbolFilter[];
  permissions: TradePermissonEnum[];
}
