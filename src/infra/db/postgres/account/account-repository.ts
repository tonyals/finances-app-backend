import { AccountRepository } from '../../../../data/database/usecases/account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountMondel } from '../../../../domain/models/account-model'
import { User } from '../entities/User'

export class AccountPostgresRepository implements AccountRepository {
  async addAccountRepository (accountData: AddAccountModel): Promise<AccountMondel> {
    const account = await User.create(accountData).save()
    return account
  }
}
