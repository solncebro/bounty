import { createEvent, createStore } from 'effector';

interface ApplicationStore {
  currentSymbol: Nullable<string>;
}

const defaultStore = {
  currentSymbol: null,
};

export const $Application = createStore<ApplicationStore>(defaultStore);
export const resetApplication = createEvent();
export const setCurrentSymbol = createEvent<string>();

$Application
  .on(resetApplication, () => defaultStore)
  .on(setCurrentSymbol, (state, currentSymbol) => ({ ...state, currentSymbol }));
