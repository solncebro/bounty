import { createStore, createEvent, createEffect } from 'effector';
import { AccountInformation } from '../../models/AccountInformation';
import { Balance } from '../../models/Balance';
import { binance } from '../../services/RequestService';

export const $Balances = createStore<Balance[]>([]);
export const resetBalances = createEvent();
export const getBalanceFx = createEffect({
  handler: async (): Promise<AccountInformation> => {
    const response = await binance.balance((error: any, balances: any) => {
      if (error) return console.error(error);
      console.info('balances()', balances);
      console.info('ETH balance: ', balances.ETH.available);
    });

    return response.data;
  },
});

$Balances.on(getBalanceFx.done, (state, { result }) => result?.balances).on(resetBalances, () => []);
