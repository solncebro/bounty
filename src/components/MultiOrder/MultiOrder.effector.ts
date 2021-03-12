import { createEvent, createStore } from 'effector';
import { Order } from '../../models/Order';

interface OrdersProps {
  orders: Order[];
  totalCount: number;
  totalVolume: number;
}

interface OrdersStoreProps extends OrdersProps {
  isPriceZerosVisible: boolean;
  isVolumeLess: boolean;
}

const defaultState: OrdersStoreProps = {
  orders: [],
  totalCount: 0,
  totalVolume: 0,
  isPriceZerosVisible: true,
  isVolumeLess: false,
};

export const $Orders = createStore<OrdersStoreProps>(defaultState);
export const setOrders = createEvent<OrdersProps>();
export const setIsPriceZerosVisible = createEvent<boolean>();
export const setIsVolumeLess = createEvent<boolean>();
export const resetOrders = createEvent();

$Orders
  .on(setOrders, (state, params) => ({ ...state, ...params }))
  .on(setIsPriceZerosVisible, (state, isPriceZerosVisible) => ({ ...state, isPriceZerosVisible }))
  .on(setIsVolumeLess, (state, isVolumeLess) => ({ ...state, isVolumeLess }))
  .on(resetOrders, (state) => ({ ...defaultState, isPriceZerosVisible: state.isPriceZerosVisible }));
