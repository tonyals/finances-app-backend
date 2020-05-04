import { AddAccountModel } from '../../../domain/usecases/add-account'
import { AccountMondel } from '../../../domain/models/account-model'

export interface AccountRepository {
  addAccountRepository (accountData: AddAccountModel): Promise<AccountMondel>
}
