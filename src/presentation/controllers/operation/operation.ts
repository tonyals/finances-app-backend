import { Controller } from '../../protocols/controller'
import { HttpResponse, HttpRequest } from '../../protocols/http'
import { MissingParamError } from '../../errors/missing-param'
import { badRequest, success } from '../../helpers/http-helper'
import { AddCreditOperation } from '../../../domain/usecases/add-operation'

export class OperationController implements Controller {
  constructor (private readonly addCreditOp: AddCreditOperation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['type', 'amount', 'date', 'description']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const { type, amount, description, date } = httpRequest.body
    const creditOperation = await this.addCreditOp.addCreditOperation({ type, amount, description, date })
    return success(creditOperation)
  }
}
