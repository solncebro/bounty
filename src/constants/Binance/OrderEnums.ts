export enum OrderStatusEnum {
  NEW = 'NEW',
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  FILLED = 'FILLED',
  CANCELED = 'CANCELED',
  PENDING_CANCEL = 'PENDING_CANCEL',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

export enum OrderTypesEnum {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
  STOP_LOSS = 'STOP_LOSS',
  STOP_LOSS_LIMIT = 'STOP_LOSS_LIMIT',
  TAKE_PROFIT = 'TAKE_PROFIT',
  TAKE_PROFIT_LIMIT = 'TAKE_PROFIT_LIMIT',
  LIMIT_MAKER = 'LIMIT_MAKER',
}

export enum OrderResponseTypesEnum {
  ACK = 'ACK',
  RESULT = 'RESULT',
  FULL = 'FULL',
}

export enum OrderSideEnum {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum TimeInForceEnum {
  GTC = 'GTC', // Good Til Canceled
  IOC = 'IOC', // Immediate Or Cancel
  FOK = 'FOK', // Fill or Kill
}
