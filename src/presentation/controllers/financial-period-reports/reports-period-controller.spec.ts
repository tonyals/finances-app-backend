import { FinancialPeriodReportsController } from './reports-period-controller'
import { badRequest, serverError } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'
import { SumModel } from '../../../domain/models/reports-models/sum-model'
import { OperationType, ReportsPeriod } from '../../../domain/models/reports-models/operation-enum'
import { SumPeriodOperation } from '../../../domain/usecases/reports-period/sum-all-by-type-and-period'
import { InvalidParamError } from '../../errors/invalid-param'
import { DateValidator } from '../../protocols/date-validator'
import { Period } from '../../../domain/models/reports-models/period-model'

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
        operation: 'any-operation',
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
        operation: 'any-operation',
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
        operation: 'any-operation',
        initialDate: 'invalid-date',
        finalDate: 'any-date'
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('periodDate')))
  })

  test('should return 400 if invalid finalDate is provided', async () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = await sut.handle({
      body: {
        typeReport: 'type-report',
        operation: 'any-operation',
        initialDate: 'any-date',
        finalDate: 'invalid-date'
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('periodDate')))
  })

  test('should return 400 if invalid type report is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        typeReport: 'invalid-type-report',
        operation: OperationType.CREDIT,
        initialDate: 'any-date',
        finalDate: 'any-date'
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('invalid-type-report')))
  })

  test('should return 500 if sumPeriodOperation throws', async () => {
    const { sut, sumPeriodStub } = makeSut()
    jest.spyOn(sumPeriodStub, 'sumPeriodOperation').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({
      body: {
        typeReport: ReportsPeriod.SUMPERIOD,
        operation: OperationType.CREDIT,
        initialDate: 'any-date',
        finalDate: 'any-date'
      }
    })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
