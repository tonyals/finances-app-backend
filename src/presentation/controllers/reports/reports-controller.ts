import { Controller } from '../../protocols/controller'
import { HttpResponse, HttpRequest } from '../../protocols/http'
import { badRequest, success, serverError } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'
import { OperationType } from '../../../domain/models/operation-enum'
import { SumAllDebitsOperation } from '../../../domain/usecases/sum-debits'
import { InvalidParamError } from '../../errors/invalid-param'

export class FinancialReportsController implements Controller {
  constructor (
    private readonly sumAllDebits: SumAllDebitsOperation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { type } = httpRequest.body
      if (!type) {
        return badRequest(new MissingParamError('type'))
      }
      switch (type) {
        case OperationType.DEBIT: {
          const debitOperation = await this.sumAllDebits
            .sumAllDebitsOperation(OperationType.DEBIT)
          return success(debitOperation)
        }
        default:
          return badRequest(new InvalidParamError('operation-type'))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
