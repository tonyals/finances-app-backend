import { FinancialPeriodReportsController } from './reports-period-controller'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'
import { SumModel } from '../../../domain/models/sum-model'
import { OperationType } from '../../../domain/models/operation-enum'
import { SumPeriodOperation, Period } from '../../../domain/usecases/sum-period'
import { InvalidParamError } from '../../errors/invalid-param'
import { DateValidator } from '../../protocols/date-validator'

const makeDateValidator = (): DateValidator => {
  class DateValidatorStub implements DateValidator {
    isValid (date: string): boolean {
      return true
    }
  }
  return new DateValidatorStub()
}

interface SutTypes {
  sut: FinancialPeriodReportsController
  sumPeriodStub: SumPeriodOperation
  dateValidatorStub: DateValidator
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
  const dateValidatorStub = makeDateValidator()
  const sut = new FinancialPeriodReportsController(sumPeriodStub, dateValidatorStub)
  return { sut, sumPeriodStub, dateValidatorStub }
}

describe('ReportsController', () => {
  test('should return 400 if no type report is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        operation: 'any-operation',
        initialDate: 'CREDIT',
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
        initialDate: 'CREDIT',
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
        operation: 'CREDIT',
        finalDate: 'any-date'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('initialDate')))
  })

  test('should return 400 if no finalDate is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        typeReport: 'type-report',
        operation: 'CREDIT',
        initialDate: 'any-date'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('finalDate')))
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

  test('should return 400 if invalid initialDate is provided', async () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = await sut.handle({
      body: {
        typeReport: 'type-report',
        operation: 'CREDIT',
        initialDate: 'invalid-date',
        finalDate: 'any-date'
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('initialDate')))
  })
})
