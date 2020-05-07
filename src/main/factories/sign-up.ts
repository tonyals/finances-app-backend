import { Controller } from '../../presentation/protocols/controller'
import { SignUpController } from '../../presentation/controllers/login/sign-up'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { AccountPostgresRepository } from '../../infra/db/postgres/account/account-repository'
import { DbAccount } from '../../data/database/postgres/db-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const encrypt = new BcryptAdapter(salt)
  const accountPostgresRepository = new AccountPostgresRepository()
  const dbAccount = new DbAccount(accountPostgresRepository, encrypt)
  const emailValidator = new EmailValidatorAdapter()
  return new SignUpController(emailValidator, dbAccount)
}
