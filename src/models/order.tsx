import { OrderSideEnum, OrderStatusEnum, OrderTypesEnum, TimeInForceEnum } from '../constants/Binance/OrderEnums';

export interface Order<T> {
  symbol: string;
  orderId: number;
  orderListId: number; //Unless OCO, the value will always be -1
  clientOrderId: string;
  price: T;
  origQty: T;
  executedQty: T;
  cummulativeQuoteQty: T;
  status: OrderStatusEnum;
  timeInForce: TimeInForceEnum;
  type: OrderTypesEnum;
  side: OrderSideEnum;
  stopPrice: T;
  icebergQty: T;
  time: number;
  updateTime: number;
  isWorking: boolean;
  origQuoteOrderQty: T;
}

export interface OrderExtended extends Order<number> {
  quoteAssetQty: number;
}

export interface PreOrder {
  price: number;
  volume: number;
}
