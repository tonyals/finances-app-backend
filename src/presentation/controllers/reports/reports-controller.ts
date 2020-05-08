import { Controller } from '../../protocols/controller'
import { HttpResponse, HttpRequest } from '../../protocols/http'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'

export class ReportsController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { type } = httpRequest.body
    if (!type) {
      return badRequest(new MissingParamError('type'))
    }
    return new Promise(resolve => resolve(null))
  }
}
