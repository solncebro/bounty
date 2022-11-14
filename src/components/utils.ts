interface GetCalcPriceFunctionArgs { 
  initialPrice: number;
  changePriceStep: number;
  increment: number;
}

export const getDecimalQuantity = (symbol: string) => (Boolean(symbol.match(/USDT/)) ? 2 : 8);

export const cutEpsilon = (value: number | string, decimal: number = 8) => parseFloat((+value).toFixed(decimal));

export const getCalcPriceFunction = (isPriceIncrease: boolean) => ({
  initialPrice: price,
  changePriceStep: step,
  increment,
}: GetCalcPriceFunctionArgs) =>
  isPriceIncrease ? cutEpsilon(price + step * increment) : cutEpsilon(price - step * increment);

export const createTimestamp = () => Date.now();

export const timeFormatter = (date: Date): string =>
  date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  export const shortNumberFormatter = (value: number) => {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "Q" },
    ];
  
    const item = lookup
      .slice()
      .reverse()
      .find((x) => value >= x.value);
  
    return item
      ? (value / item.value).toLocaleString("en-US") + item.symbol
      : "0";
  };