import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest, success, serverError } from '../helpers/http-helper'
import { MissingParamError } from '../errors/missing-param'
import { InvalidParamError } from '../errors/invalid-param'
import { EmailValidator } from '../protocols/email-validator'
import { AddAccount } from '../../domain/usecases/add-account'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, password, passwordConfirmation, email } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this.addAccount.addAccount({ name, email, password })
      return success(account)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
