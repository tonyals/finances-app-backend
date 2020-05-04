import { SignUpController } from './sign-up'
import { badRequest } from '../helpers/http-helper'
import { MissingParamError } from '../errors/missing-param'
import { InvalidParamError } from '../errors/invalid-param'
import { EmailValidator } from '../protocols/email-validator'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new SignUpController(emailValidatorStub)
  return { emailValidatorStub, sut }
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
})
