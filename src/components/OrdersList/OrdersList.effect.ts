import { createStore, createEvent, createEffect } from 'effector';
import { OrderExtended } from '../../models/order';
import SpotTradeService from '../../services/SpotTradeService';
import { addLog } from '../LogsDisplay/LogsDisplay.effect';
import { cutEpsilon, getDecimalQuantity } from '../utils';

const defaultStore: OrderExtended[] = [];

export const $Orders = createStore<OrderExtended[]>(defaultStore);
export const resetOrders = createEvent();
export const getOrdersFx = createEffect({
  handler: async (): Promise<OrderExtended[]> => {
    addLog('Get Balances: start');
    const result = await SpotTradeService.getOpenOrders();
    addLog('Get Balances: end');

    return result.data.map((order) => {
      const priceAsNumber = parseFloat(order.price);
      const origQtyAsNumber = parseFloat(order.origQty);

      const normalizedOrder = {
        ...order,
        price: priceAsNumber,
        origQty: origQtyAsNumber,
        quoteAssetQty: cutEpsilon(priceAsNumber * origQtyAsNumber, getDecimalQuantity(order.symbol)),
        executedQty: parseFloat(order.executedQty),
        cummulativeQuoteQty: parseFloat(order.cummulativeQuoteQty),
        stopPrice: parseFloat(order.stopPrice),
        icebergQty: parseFloat(order.icebergQty),
        origQuoteOrderQty: parseFloat(order.origQuoteOrderQty),
      };

      return normalizedOrder;
    });
  },
});

$Orders.on(getOrdersFx.done, (_, { result }) => result).on(resetOrders, () => defaultStore);
