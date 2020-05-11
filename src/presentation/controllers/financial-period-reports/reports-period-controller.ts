import { Controller } from '../../protocols/controller'
import { HttpResponse, HttpRequest } from '../../protocols/http'
import { badRequest, success, serverError } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'
import { ReportsPeriod } from '../../../domain/models/operation-enum'
import { InvalidParamError } from '../../errors/invalid-param'
import { SumPeriodOperation } from '../../../domain/usecases/sum-period'

export class FinancialPeriodReportsController implements Controller {
  constructor (
    private readonly sumPeriod: SumPeriodOperation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { typeReport, operation, initialDate, finalDate } = httpRequest.body
      if (!typeReport) {
        return badRequest(new MissingParamError('type-report'))
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
          return badRequest(new InvalidParamError('operation-type'))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
