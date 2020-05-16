import { AddAccount, AddAccountModel } from '../../../../domain/usecases/account/add-account'
import { AccountModel } from '../../../../domain/models/account/account-model'
import { AccountRepository } from '../../usecases/account/account-repository'
import { Encrypter } from '../../usecases/account/encrypter'

export class DbAccount implements AddAccount {
  constructor (
    private readonly accountRepository: AccountRepository,
    private readonly encrypt: Encrypter
  ) {}

  async addAccount (accountData: AddAccountModel): Promise<AccountModel> {
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
