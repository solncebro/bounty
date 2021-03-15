import { SymbolPriceTicker } from '../models/Tickers';
import { RequestService } from './RequestService';

export default class MarketDataService extends RequestService {
  public static getSymbolPriceTicker() {
    return this.get<SymbolPriceTicker[]>('ticker/price');
  }
}
