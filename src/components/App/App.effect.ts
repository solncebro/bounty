import { createEvent, createStore } from 'effector';
import { Symbol } from '../../models/Symbol';

interface ApplicationStore {
  currentSymbol: Nullable<Symbol>;
}

const defaultStore = {
  currentSymbol: null,
};

export const $Application = createStore<ApplicationStore>(defaultStore);
export const resetApplication = createEvent();
export const setCurrentSymbol = createEvent<Nullable<Symbol>>();

$Application
  .on(resetApplication, () => defaultStore)
  .on(setCurrentSymbol, (state, currentSymbol) => ({ ...state, currentSymbol }));
