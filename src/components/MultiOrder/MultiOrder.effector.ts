import { createEvent, createStore } from 'effector';
import { PreOrder } from '../../models/Order';

interface PreOrdersProps {
  orders: PreOrder[];
  totalCount: number;
  totalVolume: number;
}

interface PreOrdersStoreProps extends PreOrdersProps {
  isPriceZerosVisible: boolean;
  isVolumeLess: boolean;
}

const defaultState: PreOrdersStoreProps = {
  orders: [],
  totalCount: 0,
  totalVolume: 0,
  isPriceZerosVisible: true,
  isVolumeLess: false,
};

export const $PreOrders = createStore<PreOrdersStoreProps>(defaultState);
export const setPreOrders = createEvent<PreOrdersProps>();
export const setIsPriceZerosVisible = createEvent<boolean>();
export const setIsVolumeLess = createEvent<boolean>();
export const resetPreOrders = createEvent();

$PreOrders
  .on(setPreOrders, (state, params) => ({ ...state, ...params }))
  .on(setIsPriceZerosVisible, (state, isPriceZerosVisible) => ({ ...state, isPriceZerosVisible }))
  .on(setIsVolumeLess, (state, isVolumeLess) => ({ ...state, isVolumeLess }))
  .on(resetPreOrders, (state) => ({ ...defaultState, isPriceZerosVisible: state.isPriceZerosVisible }));
