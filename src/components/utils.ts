interface GetCalcPriceFunctionArgs {
  initialPrice: number;
  changePriceStep: number;
  increment: number;
}

export const getDecimalQuantity = (symbol: string) => (Boolean(symbol.match(/USDT/)) ? 2 : 8);

export const cutEpsilon = (value: number, decimal: number = 8) => parseFloat(value.toFixed(decimal));

export const getCalcPriceFunction = (isPriceIncrease: boolean) => ({
  initialPrice: price,
  changePriceStep: step,
  increment,
}: GetCalcPriceFunctionArgs) =>
  isPriceIncrease ? cutEpsilon(price + step * increment) : cutEpsilon(price - step * increment);

export const createTimestamp = () => Date.now();

export const timeFormatter = (date: Date): string =>
  date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
