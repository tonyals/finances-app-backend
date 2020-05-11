import { Controller } from '../../protocols/controller'
import { HttpResponse, HttpRequest } from '../../protocols/http'
import { badRequest, success, serverError } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'
import { ReportsPeriod, OperationType } from '../../../domain/models/operation-enum'
import { InvalidParamError } from '../../errors/invalid-param'
import { SumPeriodOperation } from '../../../domain/usecases/sum-period'
import { DateValidator } from '../../protocols/date-validator'

export class FinancialPeriodReportsController implements Controller {
  constructor (
    private readonly sumPeriod: SumPeriodOperation,
    private readonly dateValidator: DateValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['typeReport', 'operation', 'initialDate', 'finalDate']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { typeReport, operation, initialDate, finalDate } = httpRequest.body
      if (operation !== (OperationType.CREDIT || OperationType.DEBIT)) {
        return badRequest(new InvalidParamError('type-operation'))
      }

      if (!this.dateValidator.isValid(initialDate)) {
        return badRequest(new InvalidParamError('initialDate'))
      }

      switch (typeReport) {
        case ReportsPeriod.SUMPERIOD: {
          const sumPeriod = await this.sumPeriod
            .sumPeriodOperation(operation, {
              initialDate,
              finalDate
            })
          return success(sumPeriod)
        }
        default:
          return badRequest(new InvalidParamError('report-type'))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
