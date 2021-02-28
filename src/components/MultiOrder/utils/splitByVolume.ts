import { ChangePriceDirectionEnum } from '../../../constants/enums';
import { calcOrders } from './calcOrders';

export interface SplitByVolumeArgs {
  initialPrice: number;
  changePriceStep: number;
  orderSize: number;
  volumeLimit: number;
  changePriceDirection: ChangePriceDirectionEnum;
}

const getDecrementAndncrementOrderQuantity = (
  changePriceDirection: ChangePriceDirectionEnum,
  quantityOrdersForCalculate: number
) => {
  switch (changePriceDirection) {
    case ChangePriceDirectionEnum.up: {
      return { decrementPricesQuantity: 0, incrementPricesQuantity: quantityOrdersForCalculate };
    }
    case ChangePriceDirectionEnum.down: {
      return { decrementPricesQuantity: quantityOrdersForCalculate, incrementPricesQuantity: 0 };
    }
    default: {
      const decrementPricesQuantity = Math.ceil(quantityOrdersForCalculate / 2);
      const incrementPricesQuantity = quantityOrdersForCalculate - decrementPricesQuantity;
      return { decrementPricesQuantity, incrementPricesQuantity };
    }
  }
};

export const splitByVolume = ({
  orderSize,
  initialPrice,
  changePriceStep,
  volumeLimit,
  changePriceDirection,
}: SplitByVolumeArgs) => {
  const initialOrder = [{ price: initialPrice, volume: orderSize }];
  const quantityOrdersForCalculate = Math.ceil(volumeLimit / orderSize) - 1;

  if (quantityOrdersForCalculate === 0) {
    return initialOrder;
  }

  const { decrementPricesQuantity, incrementPricesQuantity } = getDecrementAndncrementOrderQuantity(
    changePriceDirection,
    quantityOrdersForCalculate
  );

  const ordersWithDecrementPrice = calcOrders({
    orders: initialOrder,
    currentQuantity: decrementPricesQuantity,
    orderSize,
    initialPrice,
    changePriceStep,
    volumeLimit,
    isPriceIncrease: false,
  });

  const allOrders = calcOrders({
    orders: ordersWithDecrementPrice,
    currentQuantity: incrementPricesQuantity,
    orderSize,
    initialPrice,
    changePriceStep,
    volumeLimit,
    isPriceIncrease: true,
  });

  allOrders.sort((first, second) => (first.price > second.price ? -1 : 1));

  return allOrders;
};
