export interface Balance<T> {
  asset: string;
  free: T;
  locked: T;
}

export interface BalanceWithSummary extends Balance<number> {
  summary: number;
}
