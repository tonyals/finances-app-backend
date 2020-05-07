import { OperationController } from './operation'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'

interface SutTypes {
  sut: OperationController
}

const makeSut = (): SutTypes => {
  const sut = new OperationController()
  return { sut }
}

describe('OperationController', () => {
  test('should return 400 if no type operation is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        amount: 0,
        date: new Date(),
        description: 'any_description'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('type')))
  })
})
