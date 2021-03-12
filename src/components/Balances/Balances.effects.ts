import { createStore, createEvent, createEffect } from 'effector';
import { Balance } from '../../models/Balance';
import AccountService from '../../services/AccountService';
import { addLog } from '../LogsDisplay/LogsDisplay.effect';

const defaultStore: Balance[] = [];

export const $Balances = createStore<Balance[]>(defaultStore);
export const resetBalances = createEvent();
export const getBalanceFx = createEffect({
  handler: async (): Promise<Balance[]> => {
    addLog('Getting balances');
    const result = await AccountService.getAccountInformation();

    return result.data.balances;
  },
});

$Balances.on(getBalanceFx.done, (state, { result }) => result).on(resetBalances, () => []);
