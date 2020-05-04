import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { AccountMondel } from '../../../domain/models/account-model'
import { AccountRepository } from '../usecases/account-repository'

export class DbAccount implements AddAccount {
  constructor (
    private readonly accountRepository: AccountRepository
  ) {}

  async addAccount (accountData: AddAccountModel): Promise<AccountMondel> {
    await this.accountRepository.addAccountRepository(accountData)
    return null
  }
}
