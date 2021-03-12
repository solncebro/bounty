import { createEvent, createStore } from 'effector';
import { createTimestamp, timeFormatter } from '../utils';

interface Log {
  time: string;
  message: string;
}

export const $Logs = createStore<Log[]>([]);
export const addLog = createEvent<string>();
export const resetLogs = createEvent();

$Logs
  .on(addLog, (state, payload) => [{ time: timeFormatter(new Date(createTimestamp())), message: payload }, ...state])
  .on(resetLogs, () => []);
