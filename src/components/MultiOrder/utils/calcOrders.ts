import { Order } from '../../../models/order';
import { cutEpsilon, getCalcPriceFunction } from '../../utils';
import { setIsVolumeLess } from '../MultiOrder.effector';
import { SplitByVolumeArgs } from './splitByVolume';

interface CalcOrdersArgs extends Omit<SplitByVolumeArgs, 'changePriceDirection'> {
  orders: Order[];
  currentQuantity: number;
  isPriceIncrease: boolean;
}

export const calcOrders = ({
  orders,
  currentQuantity,
  orderSize,
  initialPrice,
  changePriceStep,
  volumeLimit,
  isPriceIncrease,
}: CalcOrdersArgs) => {
  const newOrders = [...orders];
  const calcPrice = getCalcPriceFunction(isPriceIncrease);

  for (let i = 1; i <= currentQuantity; i++) {
    const newPrice = calcPrice({ initialPrice, changePriceStep, increment: i });

    if (newPrice <= 0) {
      setIsVolumeLess(true);
      return newOrders;
    }

    const availableVolume = cutEpsilon(volumeLimit - newOrders.length * orderSize);
    const newOrderSize = availableVolume >= orderSize ? orderSize : cutEpsilon(availableVolume);
    const newOrder: Order = { price: newPrice, volume: newOrderSize };
    newOrders.push(newOrder);
  }

  return newOrders;
};
