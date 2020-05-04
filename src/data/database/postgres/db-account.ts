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
    const hashedPassword = await this.encrypt.encrypt(accountData.password)
    const { name, email } = accountData
    const account = await this.accountRepository.addAccountRepository({
      name,
      email,
      password: hashedPassword
    })
    return account
  }
}
