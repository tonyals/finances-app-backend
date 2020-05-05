import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

//  Estamos mocando o isEmail da biblioteca validator pois o teste não deve
//  depender da implementação da biblioteca. Sempre devemos mocar todas as
//  dependências da classe.
jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('should call validator with correct email', () => {
    const sut = makeSut()
    const emailValidatorSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com')
    expect(emailValidatorSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  test('should true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })
})
