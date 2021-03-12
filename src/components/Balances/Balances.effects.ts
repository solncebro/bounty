import { createStore, createEvent, createEffect } from 'effector';
import { MINIMAL_BALANCE_VISIBLE } from '../../constants/common';
import { BalanceWithSummary } from '../../models/Balance';
import AccountService from '../../services/AccountService';
import { addLog } from '../LogsDisplay/LogsDisplay.effect';
import { cutEpsilon } from '../utils';

const defaultStore: BalanceWithSummary[] = [];

export const $Balances = createStore<BalanceWithSummary[]>(defaultStore);
export const resetBalances = createEvent();
export const getBalanceFx = createEffect({
  handler: async (): Promise<BalanceWithSummary[]> => {
    addLog('Getting balances');
    const result = await AccountService.getAccountInformation();

    const filteredResult = result.data.balances.reduce((acc, { asset, free, locked }) => {
      const freeAsNumber = parseFloat(free);
      const lockedAsNumber = parseFloat(locked);
      const summary = cutEpsilon(freeAsNumber + lockedAsNumber);

      if (summary < MINIMAL_BALANCE_VISIBLE) {
        return acc;
      }

      const balance = {
        asset,
        free: freeAsNumber,
        locked: lockedAsNumber,
        summary: summary,
      };

      const [first] = acc;

      if (asset === 'BTC' || (asset === 'USDT' && first.asset !== 'BTC')) {
        return [balance, ...acc];
      }

      if (asset === 'USDT') {
        return [first, balance, ...acc.slice(1)];
      }

      return [...acc, balance];
    }, defaultStore);

    const [BTC, USDT] = filteredResult;
    const sortedOtherAssets = filteredResult.slice(2).sort((a, b) => (a.summary > b.summary ? -1 : 1));

    return [BTC, USDT, ...sortedOtherAssets];
  },
});

$Balances.on(getBalanceFx.done, (state, { result }) => result).on(resetBalances, () => []);
