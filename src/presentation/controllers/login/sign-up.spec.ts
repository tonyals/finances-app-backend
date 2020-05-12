import { SignUpController } from './sign-up'
import { badRequest, success, serverError } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'
import { InvalidParamError } from '../../errors/invalid-param'
import { EmailValidator } from '../../protocols/email-validator'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/account/add-account'
import { AccountMondel } from '../../../domain/models/account/account-model'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async addAccount (accountData: AddAccountModel): Promise<AccountMondel> {
      const fakeAccount = {
        id: 1,
        name: 'any_name',
        email: 'valid_email',
        password: 'any_password'
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

interface SutTypes {
  addAccountStub: AddAccount
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const emailValidatorStub = makeEmailValidator()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return { emailValidatorStub, sut, addAccountStub }
}

describe('SignUpController', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })

  test('should return 400 if no password and passwordConfirmation not match', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'other_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation')))
  })

  test('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle({
      body: {
        name: 'any_name',
        email: 'valid_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(isValidSpy).toHaveBeenCalledWith('valid_mail@mail.com')
  })

  test('should return 400 if invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid')
      .mockReturnValueOnce(false)
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        email: 'invalid_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        email: 'valid_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'addAccount').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        email: 'valid_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call addAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addAccountSpy = jest.spyOn(addAccountStub, 'addAccount')
    await sut.handle({
      body: {
        name: 'any_name',
        email: 'valid_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'valid_mail@mail.com',
      password: 'any_password'
    })
  })

  test('should return an account if addAccount success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        email: 'valid_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse).toEqual(success({
      id: 1,
      name: 'any_name',
      email: 'valid_email',
      password: 'any_password'
    }))
  })
})
