import { Order } from '../models/order';
import { SymbolBase } from '../models/Symbol';
import { RequestService } from './RequestService';
import {
  CancelOrderParams,
  CancelOrderProps,
  CreateOrderParams,
  CreateOrderResultAck,
} from './SpotTradeService.models';

export default class SpotTradeService extends RequestService {
  public static getOpenOrders() {
    return this.get<Order<string>[]>('openOrders');
  }

  public static createOrder(params: CreateOrderParams) {
    return this.post<CreateOrderResultAck>('order', params);
  }

  public static cancelOrder(params: CancelOrderParams) {
    return this.delete<CancelOrderProps>('order', params);
  }

  public static cancelAllOrders(params: SymbolBase) {
    return this.delete<CancelOrderProps[]>('openOrders', params);
  }
}
