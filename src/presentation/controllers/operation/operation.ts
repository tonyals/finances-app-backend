import { Controller } from '../../protocols/controller'
import { HttpResponse, HttpRequest } from '../../protocols/http'
import { MissingParamError } from '../../errors/missing-param'
import { badRequest, success, serverError } from '../../helpers/http-helper'
import { AddCreditOperation } from '../../../domain/usecases/add-operation'
import { AddDebitOperation } from '../../../domain/usecases/add-debit-operation'
import { OperationType } from '../../../domain/models/operation-model'

export class OperationController implements Controller {
  constructor (
    private readonly addCreditOp: AddCreditOperation,
    private readonly addDebitOp: AddDebitOperation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['type', 'amount', 'date', 'description']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { type, amount, description, date } = httpRequest.body
      if (type === OperationType.CREDIT) {
        const creditOperation = await this.addCreditOp.addCreditOperation({ type, amount, description, date })
        return success(creditOperation)
      }
      if (type === OperationType.DEBIT) {
        const debitOperation = await this.addDebitOp.addDebitOperation({ type, amount, description, date })
        return success(debitOperation)
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
