import { ReportsController } from './reports-controller'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'

interface SutTypes {
  sut: ReportsController
}

const makeSut = (): SutTypes => {
  const sut = new ReportsController()
  return { sut }
}

describe('ReportsController', () => {
  test('should return 400 if no type operation is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {}
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('type')))
  })
})
