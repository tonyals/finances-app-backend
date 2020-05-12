import { AddAccountModel } from '../../../../domain/usecases/account/add-account'
import { AccountMondel } from '../../../../domain/models/account/account-model'

export interface AccountRepository {
  addAccountRepository (accountData: AddAccountModel): Promise<AccountMondel>
}
