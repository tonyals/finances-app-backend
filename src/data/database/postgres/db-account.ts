import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { AccountMondel } from '../../../domain/models/account-model'
import { AccountRepository } from '../usecases/account-repository'
import { Encrypter } from '../usecases/encrypter'

export class DbAccount implements AddAccount {
  constructor (
    private readonly accountRepository: AccountRepository,
    private readonly encrypt: Encrypter
  ) {}

  async addAccount (accountData: AddAccountModel): Promise<AccountMondel> {
    await this.accountRepository.addAccountRepository(accountData)
    await this.encrypt.encrypt(accountData.password)
    return null
  }
}
