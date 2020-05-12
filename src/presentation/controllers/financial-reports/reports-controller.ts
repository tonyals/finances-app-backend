import { Controller } from '../../protocols/controller'
import { HttpResponse, HttpRequest } from '../../protocols/http'
import { badRequest, success, serverError } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'
import { OperationType } from '../../../domain/models/reports-models/operation-enum'
import { SumAllOperation } from '../../../domain/usecases/reports-all/sum-all-by-type'
import { InvalidParamError } from '../../errors/invalid-param'
import { FinancialResultOperation } from '../../../domain/usecases/reports-all/financial-result'
import { GetAllOperation } from '../../../domain/usecases/reports-all/get-all-operations'

export class FinancialReportsController implements Controller {
  constructor (
    private readonly sumAll: SumAllOperation,
    private readonly financialResult: FinancialResultOperation,
    private readonly getAll: GetAllOperation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { type } = httpRequest.body
      if (!type) {
        return badRequest(new MissingParamError('type'))
      }
      switch (type) {
        case OperationType.DEBIT: {
          const debitOperation = await this.sumAll
            .sumAllOperation(OperationType.DEBIT)
          return success(debitOperation)
        }
        case OperationType.CREDIT: {
          const creditOperation = await this.sumAll
            .sumAllOperation(OperationType.CREDIT)
          return success(creditOperation)
        }
        case OperationType.GETALLOPERATIONS: {
          const allOperation = await this.getAll.getAllOperation()
          return success(allOperation)
        }
        case OperationType.FINANCIALRESULT: {
          const financialResult = await this.financialResult
            .financialResult()
          return success(financialResult)
        }
        default:
          return badRequest(new InvalidParamError('operation-type'))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
