import { ReportsController } from './reports-controller'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'
import { SumAllDebitsOperation } from '../../../domain/usecases/sum-debits'
import { SumAllDebitsModel } from '../../../domain/models/sum-debits-model'
import { OperationType } from '../../../domain/models/operation-enum'
import { InvalidParamError } from '../../errors/invalid-param'

interface SutTypes {
  sut: ReportsController
  sumAllDebitsStub: SumAllDebitsOperation
}

const makeSumAllDebitsOperation = (): SumAllDebitsOperation => {
  class SumAllDebitsOperationStub implements SumAllDebitsOperation {
    async sumAllDebitsOperation (type: OperationType.DEBIT): Promise<SumAllDebitsModel> {
      return new Promise(resolve => resolve({
        debits: [
          {
            id: 1,
            type: OperationType.DEBIT,
            description: 'any_description',
            amount: 2
          },
          {
            id: 2,
            type: OperationType.DEBIT,
            description: 'any_description',
            amount: 3
          }
        ],
        sumDebits: 5
      }))
    }
  }
  return new SumAllDebitsOperationStub()
}

const makeSut = (): SutTypes => {
  const sumAllDebitsStub = makeSumAllDebitsOperation()
  const sut = new ReportsController(sumAllDebitsStub)
  return { sut, sumAllDebitsStub }
}

describe('ReportsController', () => {
  test('should return 400 if no type operation is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {}
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('type')))
  })

  test('should return 400 if invalid type operation is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        type: 'any_operation'
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('operation-type')))
  })

  test('should call sumAllDebitsOperation with correct value', async () => {
    const { sut, sumAllDebitsStub } = makeSut()
    const sumAllDebitsOperationSpy = jest.spyOn(sumAllDebitsStub, 'sumAllDebitsOperation')
    await sut.handle({
      body: {
        type: OperationType.DEBIT
      }
    })
    expect(sumAllDebitsOperationSpy).toHaveBeenCalledWith(OperationType.DEBIT)
  })

  test('should return 500 if sumAllDebitsOperation throws', async () => {
    const { sut, sumAllDebitsStub } = makeSut()
    jest.spyOn(sumAllDebitsStub, 'sumAllDebitsOperation').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({
      body: {
        type: OperationType.DEBIT
      }
    })
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return an sumAllDebitsOperation if success', async () => {
    const { sut } = makeSut()
    const sumAllDebits = await sut.handle({
      body: {
        type: OperationType.DEBIT
      }
    })
    expect(sumAllDebits).toEqual(success({
      debits: [
        {
          id: 1,
          type: OperationType.DEBIT,
          description: 'any_description',
          amount: 2
        },
        {
          id: 2,
          type: OperationType.DEBIT,
          description: 'any_description',
          amount: 3
        }
      ],
      sumDebits: 5
    }))
  })
})
