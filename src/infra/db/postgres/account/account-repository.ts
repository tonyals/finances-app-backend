import { AccountRepository } from '../../../../data/database/usecases/account/account-repository'
import { AddAccountModel } from '../../../../domain/usecases/account/add-account'
import { AccountModel } from '../../../../domain/models/account/account-model'
import { User } from '../entities/User'

export class AccountPostgresRepository implements AccountRepository {
  async addAccountRepository (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await User.create(accountData).save()
    return account
  }
}
