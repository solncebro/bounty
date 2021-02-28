interface GetCalcPriceFunctionArgs {
  initialPrice: number;
  changePriceStep: number;
  increment: number;
}

export const cutEpsilon = (value: number) => parseFloat(value.toFixed(8));

export const getCalcPriceFunction = (isPriceIncrease: boolean) => ({
  initialPrice: price,
  changePriceStep: step,
  increment,
}: GetCalcPriceFunctionArgs) =>
  isPriceIncrease ? cutEpsilon(price + step * increment) : cutEpsilon(price - step * increment);
