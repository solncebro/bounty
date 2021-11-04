import { ExchangeInformation } from '../models/ExchangeInformation';
import { RequestService } from './RequestService';

export default class MarketDataService extends RequestService {
  public static getExchangeInformation() {
    return this.get<ExchangeInformation>('exchangeInfo');
  }
}
