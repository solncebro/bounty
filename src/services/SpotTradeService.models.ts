import { OrderSideEnum, OrderStatusEnum, OrderTypesEnum, TimeInForceEnum } from '../constants/Binance/OrderEnums';

export interface SymbolParams {
  symbol: string;
}

export interface CancelOrderParams extends SymbolParams {
  orderId?: string;
  origClientOrderId?: string;
}

export interface CancelOrderProps {
  symbol: string;
  origClientOrderId: string;
  orderId: number;
  orderListId: number; //Unless part of an OCO, the value will always be -1.
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: OrderStatusEnum;
  timeInForce: TimeInForceEnum;
  type: OrderTypesEnum;
  side: OrderSideEnum;
}
