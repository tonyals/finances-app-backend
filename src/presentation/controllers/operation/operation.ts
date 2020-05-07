import { Controller } from '../../protocols/controller'
import { HttpResponse, HttpRequest } from '../../protocols/http'
import { MissingParamError } from '../../errors/missing-param'
import { badRequest } from '../../helpers/http-helper'

export class OperationController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['type', 'amount', 'date']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return new Promise(resolve => resolve(null))
  }
}
