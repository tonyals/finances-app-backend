import { FinancialReportsController } from './reports-controller'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'
import { SumAllOperation } from '../../../domain/usecases/reports-all/sum-all-by-type'
import { SumModel } from '../../../domain/models/reports-models/sum-model'
import { OperationType } from '../../../domain/models/reports-models/operation-enum'
import { InvalidParamError } from '../../errors/invalid-param'
import { FinancialResultOperation } from '../../../domain/usecases/reports-all/financial-result'
import { FinancialResultModel } from '../../../domain/models/reports-models/financial-result-model'
import { GetAllOperation } from '../../../domain/usecases/reports-all/get-all-operations'
import { GetAllModel } from '../../../domain/models/reports-models/get-all-model'

interface SutTypes {
  sut: FinancialReportsController
  sumAllStub: SumAllOperation
  getAllStub: GetAllOperation
  financialResultStub: FinancialResultOperation
}

const makeGetlAllOperation = (): GetAllOperation => {
  class GetAllOperationStub implements GetAllOperation {
    async getAllOperation (): Promise<GetAllModel> {
      return new Promise(resolve => resolve({
        operation: [
          {
            id: 1,
            type: OperationType.CREDIT,
            description: 'any_description',
            amount: 2
          },
          {
            id: 2,
            type: OperationType.DEBIT,
            description: 'any_description',
            amount: 3
          }
        ]
      }))
    }
  }
  return new GetAllOperationStub()
}

const makeSumAllOperation = (): SumAllOperation => {
  class SumAllOperationStub implements SumAllOperation {
    async sumAllOperation (type: OperationType.DEBIT): Promise<SumModel> {
      return new Promise(resolve => resolve({
        operation: [
          {
            id: 1,
            type: type,
            description: 'any_description',
            amount: 2
          },
          {
            id: 2,
            type: type,
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

const makeFinancialResult = (): FinancialResultOperation => {
  class FinancialResultStub implements FinancialResultOperation {
    async financialResult (): Promise<FinancialResultModel> {
      return new Promise(resolve => resolve({
        sumCredits: 10,
        sumDebits: 5,
        result: 5
      }))
    }
  }
  return new FinancialResultStub()
}

const makeSut = (): SutTypes => {
  const sumAllStub = makeSumAllOperation()
  const getAllStub = makeGetlAllOperation()
  const financialResultStub = makeFinancialResult()
  const sut = new FinancialReportsController(sumAllStub, financialResultStub, getAllStub)
  return { sut, sumAllStub, financialResultStub, getAllStub }
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

  test('should return DEBIT operation if success', async () => {
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

  test('should return CREDIT operation if success', async () => {
    const { sut } = makeSut()
    const sumAllCredits = await sut.handle({
      body: {
        type: OperationType.CREDIT
      }
    })
    expect(sumAllCredits).toEqual(success({
      operation: [
        {
          id: 1,
          type: OperationType.CREDIT,
          description: 'any_description',
          amount: 2
        },
        {
          id: 2,
          type: OperationType.CREDIT,
          description: 'any_description',
          amount: 3
        }
      ],
      sum: 5
    }))
  })

  test('should return an financial result on success', async () => {
    const { sut, financialResultStub } = makeSut()
    const financialResultSpy = jest.spyOn(financialResultStub, 'financialResult')
    await sut.handle({
      body: {
        type: OperationType.FINANCIALRESULT
      }
    })
    expect(financialResultSpy).toHaveBeenCalled()
  })

  test('should return all operations if success', async () => {
    const { sut } = makeSut()
    const getAll = await sut.handle({
      body: {
        type: OperationType.GETALLOPERATIONS
      }
    })
    expect(getAll).toEqual(success({
      operation: [
        {
          id: 1,
          type: OperationType.CREDIT,
          description: 'any_description',
          amount: 2
        },
        {
          id: 2,
          type: OperationType.DEBIT,
          description: 'any_description',
          amount: 3
        }
      ]
    }))
  })
})
