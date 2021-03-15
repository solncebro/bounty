import { createEffect, createEvent, createStore } from 'effector';
import { SymbolPriceTicker } from '../../models/Tickers';
import MarketDataService from '../../services/MarketDataService';
import { addLog } from '../LogsDisplay/LogsDisplay.effect';

const defaultStore: SymbolPriceTicker[] = [];

export const $SymbolsTickers = createStore<SymbolPriceTicker[]>(defaultStore);
export const resetSymbolsTickers = createEvent();
export const getSymbolsTickersFx = createEffect({
  handler: async () => {
    addLog('Get symbols tickers: start');
    const result = await MarketDataService.getSymbolPriceTicker();
    addLog('Get symbols tickers: end');

    return result.data;
  },
});

$SymbolsTickers.on(getSymbolsTickersFx.done, (state, { result }) => result).on(resetSymbolsTickers, () => defaultStore);
