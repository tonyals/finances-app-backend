import { FinancialPeriodReportsController } from './reports-period-controller'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'
import { SumModel } from '../../../domain/models/sum-model'
import { OperationType } from '../../../domain/models/operation-enum'
import { SumPeriodOperation, Period } from '../../../domain/usecases/sum-period'
import { InvalidParamError } from '../../errors/invalid-param'

interface SutTypes {
  sut: FinancialPeriodReportsController
  sumPeriodStub: SumPeriodOperation
}

const makeSumPeriodOperation = (): SumPeriodOperation => {
  class SumPeriodOperationStub implements SumPeriodOperation {
    async sumPeriodOperation (type: OperationType, period: Period): Promise<SumModel> {
      return new Promise(resolve => resolve({
        operation: [
          {
            id: 1,
            type: type,
            date: new Date('2020-05-10'),
            period: {
              initialDate: period.initialDate,
              finalDate: period.finalDate
            },
            description: 'any_description',
            amount: 2
          },
          {
            id: 2,
            type: type,
            date: new Date('2020-05-10'),
            period: {
              initialDate: period.initialDate,
              finalDate: period.finalDate
            },
            description: 'any_description',
            amount: 3
          }
        ],
        sum: 5
      }))
    }
  }
  return new SumPeriodOperationStub()
}

const makeSut = (): SutTypes => {
  const sumPeriodStub = makeSumPeriodOperation()
  const sut = new FinancialPeriodReportsController(sumPeriodStub)
  return { sut, sumPeriodStub }
}

describe('ReportsController', () => {
  test('should return 400 if no type report is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        operation: 'any-operation',
        initialDate: 'any-date',
        finalDate: 'any-date'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('typeReport')))
  })

  test('should return 400 if no type operation is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        typeReport: 'type-report',
        initialDate: 'any-date',
        finalDate: 'any-date'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('operation')))
  })

  test('should return 400 if no initialDate is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        typeReport: 'type-report',
        operation: 'any-type',
        finalDate: 'any-date'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('initialDate')))
  })

  test('should return 400 if invalid type operation is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        typeReport: 'type-report',
        operation: 'invalid-type',
        initialDate: 'any-date',
        finalDate: 'any-date'
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('type-operation')))
  })
})
