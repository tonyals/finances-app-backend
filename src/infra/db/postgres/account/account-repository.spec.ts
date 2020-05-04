import { CreateConnectionPostgres } from '../helpers/postgres-connect-helper'
import { AccountPostgresRepository } from './account-repository'

describe('AccountPostgresRepository', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })

  test('should return an account on addAccountRepository success', async () => {
    const sut = new AccountPostgresRepository()
    const account = await sut.addAccountRepository({
      name: 'any_name',
      email: 'valid_mail@mail.com',
      password: 'hashed_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('valid_mail@mail.com')
    expect(account.password).toBe('hashed_password')
  })
})
