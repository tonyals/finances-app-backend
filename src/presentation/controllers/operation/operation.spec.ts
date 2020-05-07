import { OperationController } from './operation'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'
import { OperationType, OperationCreditModel } from '../../../domain/models/operation-model'
import { AddCreditOperation, AddCreditOperationModel } from '../../../domain/usecases/add-operation'
import MockDate from 'mockdate'

const makeAddCreditOperation = (): AddCreditOperation => {
  class AddCreditOperationStub implements AddCreditOperation {
    async addCreditOperation (operationData: AddCreditOperationModel): Promise<OperationCreditModel> {
      return new Promise(resolve => resolve({
        id: 1,
        type: OperationType.CREDIT,
        amount: 1,
        date: new Date(),
        description: 'any_description'
      }))
    }
  }
  return new AddCreditOperationStub()
}

interface SutTypes {
  sut: OperationController
  addCreditOperationStub: AddCreditOperation
}

const makeSut = (): SutTypes => {
  const addCreditOperationStub = makeAddCreditOperation()
  const sut = new OperationController(addCreditOperationStub)
  return { sut, addCreditOperationStub }
}

describe('OperationController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should return 400 if no type operation is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        amount: 1,
        date: new Date(),
        description: 'any_description'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('type')))
  })

  test('should return 400 if no amount is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        type: OperationType.CREDIT,
        date: new Date(),
        description: 'any_description'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('amount')))
  })

  test('should return 400 if no date is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        type: OperationType.CREDIT,
        amount: 1,
        description: 'any_description'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('date')))
  })

  test('should return 400 if no description is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        type: OperationType.CREDIT,
        amount: 1,
        date: new Date()
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('description')))
  })

  test('should call AddCreditOperation with correct values', async () => {
    const { sut, addCreditOperationStub } = makeSut()
    const addCreditOperationSpy = jest.spyOn(addCreditOperationStub, 'addCreditOperation')
    await sut.handle({
      body: {
        type: OperationType.CREDIT,
        amount: 1,
        date: new Date(),
        description: 'any_description'
      }
    })
    expect(addCreditOperationSpy).toHaveBeenCalledWith({
      type: OperationType.CREDIT,
      amount: 1,
      date: new Date(),
      description: 'any_description'
    })
  })
})
