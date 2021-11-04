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
    addLog('Get Account Information: start');
    const result = await AccountService.getAccountInformation();
    addLog('Get Account Information: end');

    const filteredResult = result.data.balances.reduce((acc, { asset, free, locked }) => {
      const freeAsNumber = parseFloat(free);
      const lockedAsNumber = parseFloat(locked);
      const isUsdAsset = asset === 'USDT' || asset === 'BUSD' || asset === 'TUSD';
      const precisionCryptoAsset = asset === 'BTC' || asset === 'ETH' ? 8 : 2;
      const precision = isUsdAsset ? 0 : precisionCryptoAsset;
      const summary = cutEpsilon(freeAsNumber + lockedAsNumber, precision);
      if (summary < MINIMAL_BALANCE_VISIBLE) {
        return acc;
      }

      const balance = {
        asset,
        free: cutEpsilon(freeAsNumber, precision),
        locked: cutEpsilon(lockedAsNumber, precision),
        summary,
      };

      const [first] = acc;

      if (asset === 'BTC' || (asset === 'USDT' && first?.asset !== 'BTC')) {
        return [balance, ...acc];
      }

      if (asset === 'USDT') {
        return [first, balance, ...acc.slice(1)];
      }

      return [...acc, balance];
    }, defaultStore);
    console.log({ result, filteredResult });

    const [BTC, USDT] = filteredResult;
    const sortedOtherAssets = filteredResult.slice(2).sort((a, b) => (a.summary > b.summary ? -1 : 1));

    return [BTC, USDT, ...sortedOtherAssets];
  },
});

$Balances.on(getBalanceFx.done, (state, { result }) => result).on(resetBalances, () => []);
