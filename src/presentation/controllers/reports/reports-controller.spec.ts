import { FinancialReportsController } from './reports-controller'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'
import { SumAllOperation } from '../../../domain/usecases/sum-debits'
import { SumAllModel } from '../../../domain/models/sum-debits-model'
import { OperationType } from '../../../domain/models/operation-enum'
import { InvalidParamError } from '../../errors/invalid-param'

interface SutTypes {
  sut: FinancialReportsController
  sumAllStub: SumAllOperation
}

const makeSumAllOperation = (): SumAllOperation => {
  class SumAllOperationStub implements SumAllOperation {
    async sumAllOperation (type: OperationType.DEBIT): Promise<SumAllModel> {
      return new Promise(resolve => resolve({
        operation: [
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
        sum: 5
      }))
    }
  }
  return new SumAllOperationStub()
}

const makeSut = (): SutTypes => {
  const sumAllStub = makeSumAllOperation()
  const sut = new FinancialReportsController(sumAllStub)
  return { sut, sumAllStub }
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

  test('should call sumAllOperation with DEBIT value', async () => {
    const { sut, sumAllStub } = makeSut()
    const sumAllOperationSpy = jest.spyOn(sumAllStub, 'sumAllOperation')
    await sut.handle({
      body: {
        type: OperationType.DEBIT
      }
    })
    expect(sumAllOperationSpy).toHaveBeenCalledWith(OperationType.DEBIT)
  })

  test('should call sumAllOperation with CREDIT value', async () => {
    const { sut, sumAllStub } = makeSut()
    const sumAllOperationSpy = jest.spyOn(sumAllStub, 'sumAllOperation')
    await sut.handle({
      body: {
        type: OperationType.CREDIT
      }
    })
    expect(sumAllOperationSpy).toHaveBeenCalledWith(OperationType.CREDIT)
  })

  test('should return 500 if sumAllDebitsOperation throws', async () => {
    const { sut, sumAllStub } = makeSut()
    jest.spyOn(sumAllStub, 'sumAllOperation').mockImplementationOnce(() => {
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
      operation: [
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
      sum: 5
    }))
  })
})
