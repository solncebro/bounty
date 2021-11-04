import { createEffect, createEvent, createStore } from 'effector';
import { ExchangeInformation } from '../../models/ExchangeInformation';
import MarketDataService from '../../services/MarketDataService';
import { addLog } from '../LogsDisplay/LogsDisplay.effect';

const defaultStore: Nullable<ExchangeInformation> = null;

export const $ExchangeInformation = createStore<Nullable<ExchangeInformation>>(defaultStore);
export const resetExchangeInformation = createEvent();
export const getExchangeInformationFx = createEffect({
  handler: async () => {
    addLog('Get symbols tickers: start');
    const result = await MarketDataService.getExchangeInformation();
    addLog('Get symbols tickers: end');

    return result.data;
  },
});

$ExchangeInformation
  .on(getExchangeInformationFx.done, (state, { result }) => result)
  .on(resetExchangeInformation, () => defaultStore);
