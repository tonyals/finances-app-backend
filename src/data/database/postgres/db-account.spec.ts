import { DbAccount } from './db-account'
import { AccountRepository } from '../usecases/account-repository'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { AccountMondel } from '../../../domain/models/account-model'
import { Encrypter } from '../usecases/encrypter'

const makeAccountPostgresStub = (): AccountRepository => {
  class AccountPostgresRepositoryStub implements AccountRepository {
    async addAccountRepository (accountData: AddAccountModel): Promise<AccountMondel> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new AccountPostgresRepositoryStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

interface SutTypes {
  encrypterStub: Encrypter
  sut: DbAccount
  addAccountRepositorStub: AccountRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositorStub = makeAccountPostgresStub()
  const sut = new DbAccount(addAccountRepositorStub, encrypterStub)
  return { addAccountRepositorStub, sut, encrypterStub }
}

describe('DbAddAccount', () => {
  test('should call addAccountRepository with correct values', async () => {
    const { addAccountRepositorStub, sut } = makeSut()
    const addAccountRepositorSpy = jest.spyOn(addAccountRepositorStub, 'addAccountRepository')
    await sut.addAccount({ name: 'any_name', email: 'any_mail', password: 'any_password' })
    expect(addAccountRepositorSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_mail',
      password: 'any_password'
    })
  })

  test('should call encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.addAccount({ name: 'any_name', email: 'any_mail', password: 'any_password' })
    expect(encryptSpy).toHaveBeenCalledWith('any_password')
  })
})
