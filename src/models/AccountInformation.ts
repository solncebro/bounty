import { AccountTypeEnum } from '../constants/Binance/AccountTypeEnum';
import { Balance } from './Balance';

export interface AccountInformation {
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  sellerCommission: number;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  updateTime: Date;
  accountType: AccountTypeEnum;
  balances: Balance<string>[];
  permissions: AccountTypeEnum[];
}
