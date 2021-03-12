import { createEvent, createStore } from 'effector';
import { ErrorRequest } from '../../models/Errors';
import { createTimestamp, timeFormatter } from '../utils';

interface Log {
  time: string;
  message: string;
  isCritical: boolean;
}

export const $Logs = createStore<Log[]>([]);
export const addLog = createEvent<string>();
export const addLogCritical = createEvent<ErrorRequest>();
export const resetLogs = createEvent();

$Logs
  .on(addLog, (state, payload) => [
    { time: timeFormatter(new Date(createTimestamp())), message: payload, isCritical: false },
    ...state,
  ])
  .on(addLogCritical, (state, payload) => [
    { time: timeFormatter(new Date(createTimestamp())), message: `${payload.code}: ${payload.msg}`, isCritical: true },
    ...state,
  ])
  .on(resetLogs, () => []);
