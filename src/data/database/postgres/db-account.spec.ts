import { DbAccount } from './db-account'
import { AccountRepository } from '../usecases/account-repository'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { AccountMondel } from '../../../domain/models/account-model'

class AccountPostgresRepositoryStub implements AccountRepository {
  async addAccountRepository (accountData: AddAccountModel): Promise<AccountMondel> {
    return new Promise(resolve => resolve(null))
  }
}

describe('DbAddAccount', () => {
  test('should call addAccountRepository with correct values', async () => {
    const addAccountRepositorStub = new AccountPostgresRepositoryStub()
    const sut = new DbAccount(addAccountRepositorStub)
    const addAccountRepositorSpy = jest.spyOn(addAccountRepositorStub, 'addAccountRepository')
    await sut.addAccount({ name: 'any_name', email: 'any_mail', password: 'any_password' })
    expect(addAccountRepositorSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_mail',
      password: 'any_password'
    })
  })
})
