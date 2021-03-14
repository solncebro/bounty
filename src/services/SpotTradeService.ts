import { Order } from '../models/Order';
import { RequestService } from './RequestService';
import { CancelOrderParams, CancelOrderProps, SymbolParams } from './SpotTradeService.models';

export default class SpotTradeService extends RequestService {
  public static getOpenOrders() {
    return this.get<Order<string>[]>('openOrders');
  }

  public static cancelOrder(params: CancelOrderParams) {
    return this.delete<CancelOrderProps>('order', params);
  }

  public static cancelAllOrders(params: SymbolParams) {
    return this.delete<CancelOrderProps[]>('openOrders', params);
  }
}
