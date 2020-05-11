import { DateValidatorAdapter } from './date-validator-adapter'

const makeSut = (): DateValidatorAdapter => {
  return new DateValidatorAdapter()
}

describe('DateValidator Adapter', () => {
  test('should call validator with correct date', () => {
    const sut = makeSut()
    const dateValidatorSpy = jest.spyOn(sut, 'isValid')
    sut.isValid('2020-10-05')
    expect(dateValidatorSpy).toHaveBeenCalledWith('2020-10-05')
  })

  test('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(sut, 'isValid').mockReturnValueOnce(false)
    const validator = sut.isValid('2020-10-05')
    expect(validator).toBeFalsy()
  })

  test('should return true if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(sut, 'isValid').mockReturnValueOnce(true)
    const validator = sut.isValid('2020-10-05')
    expect(validator).toBeTruthy()
  })
})
