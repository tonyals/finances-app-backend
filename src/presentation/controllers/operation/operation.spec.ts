import { OperationController } from './operation'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'
import { OperationType } from '../../../domain/models/operation-model'

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
        amount: 1,
        date: new Date(),
        description: 'any_description'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('type')))
  })

  test('should return 400 if no amount is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        type: OperationType.CREDIT,
        date: new Date(),
        description: 'any_description'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('amount')))
  })

  test('should return 400 if no date is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        type: OperationType.CREDIT,
        amount: 1,
        description: 'any_description'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('date')))
  })

  test('should return 400 if no description is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        type: OperationType.CREDIT,
        amount: 1,
        date: new Date()
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('description')))
  })
})
