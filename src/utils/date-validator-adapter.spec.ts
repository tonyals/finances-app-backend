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
})
