import { NewOrderResponseTypeEnum } from '../constants/Binance/NewOrderResponseTypeEnum';
import { OrderSideEnum, OrderStatusEnum, OrderTypesEnum, TimeInForceEnum } from '../constants/Binance/OrderEnums';
import { SymbolBase } from '../models/Symbol';

export interface CancelOrderParams extends SymbolBase {
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

export interface CreateOrderParams {
  symbol: string;
  side: OrderSideEnum;
  type: OrderTypesEnum;
  timeInForce?: TimeInForceEnum;
  quantity?: number;
  quoteOrderQty?: number;
  price?: number;
  newClientOrderId?: string; // A unique id among open orders. Automatically generated if not sent.
  stopPrice?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
  icebergQty?: number; // Used with LIMIT, STOP_LOSS_LIMIT, and TAKE_PROFIT_LIMIT to create an iceberg order.
  newOrderRespType?: NewOrderResponseTypeEnum;
  recvWindow?: number;
}

export interface CreateOrderResultAck {
  symbol: string;
  orderId: number;
  orderListId: number; //Unless OCO, value will be -1
  clientOrderId: string;
  transactTime: number;
}
