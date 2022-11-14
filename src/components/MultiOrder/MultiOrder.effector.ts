import { createEvent, createStore } from 'effector';
import { OrderSideEnum } from '../../constants/Binance/OrderEnums';
import { PreOrder } from '../../models/order';

interface MultiOrdersProps {
  preOrders: PreOrder[];
  side: OrderSideEnum;
  totalCount: number;
  totalVolume: number;
}

interface MultiOrdersStoreProps extends MultiOrdersProps {
  isPriceZerosVisible: boolean;
  isVolumeLess: boolean;
}

const defaultState: MultiOrdersStoreProps = {
  preOrders: [],
  side: OrderSideEnum.BUY,
  totalCount: 0,
  totalVolume: 0,
  isPriceZerosVisible: true,
  isVolumeLess: false,
};

export const $MultiOrders = createStore<MultiOrdersStoreProps>(defaultState);
export const setMultiOrders = createEvent<MultiOrdersProps>();
export const setIsPriceZerosVisible = createEvent<boolean>();
export const setIsVolumeLess = createEvent<boolean>();
export const resetMultiOrders = createEvent();

$MultiOrders
  .on(setMultiOrders, (state, params) => ({ ...state, ...params }))
  .on(setIsPriceZerosVisible, (state, isPriceZerosVisible) => ({ ...state, isPriceZerosVisible }))
  .on(setIsVolumeLess, (state, isVolumeLess) => ({ ...state, isVolumeLess }))
  .on(resetMultiOrders, (state) => ({ ...defaultState, isPriceZerosVisible: state.isPriceZerosVisible }));
