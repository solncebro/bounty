import { AccountInformation } from '../models/AccountInformation';
import { RequestService } from './RequestService';

export default class AccountService extends RequestService {
  public static getAccountInformation() {
    return this.get<AccountInformation>('account');
  }
}
