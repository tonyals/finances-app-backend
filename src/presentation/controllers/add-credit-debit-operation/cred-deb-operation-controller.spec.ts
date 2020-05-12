import { OperationController } from './cred-deb-operation-controller'
import { badRequest, success, serverError } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param'
import { OperationCreditModel, OperationDebitModel } from '../../../domain/models/credit-debit-operation/operation-model'
import { AddCreditOperation, AddCreditOperationModel } from '../../../domain/usecases/credit-debit-operations/add-credit-operation'
import MockDate from 'mockdate'
import { AddDebitOperation, AddDebitOperationModel } from '../../../domain/usecases/credit-debit-operations/add-debit-operation'
import { InvalidParamError } from '../../errors/invalid-param'
import { OperationType } from '../../../domain/models/reports-models/operation-enum'

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

const makeAddDebitOperation = (): AddDebitOperation => {
  class AddDebitOperationStub implements AddDebitOperation {
    async addDebitOperation (operationData: AddDebitOperationModel): Promise<OperationDebitModel> {
      return new Promise(resolve => resolve({
        id: 1,
        type: OperationType.DEBIT,
        amount: 1,
        date: new Date(),
        description: 'any_description'
      }))
    }
  }
  return new AddDebitOperationStub()
}

interface SutTypes {
  sut: OperationController
  addCreditOperationStub: AddCreditOperation
  addDebitOperationStub: AddDebitOperation
}

const makeSut = (): SutTypes => {
  const addCreditOperationStub = makeAddCreditOperation()
  const addDebitOperationStub = makeAddDebitOperation()
  const sut = new OperationController(addCreditOperationStub, addDebitOperationStub)
  return { sut, addCreditOperationStub, addDebitOperationStub }
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

  test('should return 400 if type operation invalid is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        type: 'any_type',
        amount: 1,
        date: new Date(),
        description: 'any_description'
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('operation-type')))
  })

  describe('Operation Credit', () => {
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

    test('should return an creditOperation if addCreditOperation success', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle({
        body: {
          type: OperationType.CREDIT,
          amount: 1,
          date: new Date(),
          description: 'any_description'
        }
      })
      expect(httpResponse).toEqual(success({
        id: 1,
        type: OperationType.CREDIT,
        amount: 1,
        date: new Date(),
        description: 'any_description'
      }))
    })

    test('should return 500 if addCreditOperation throws', async () => {
      const { sut, addCreditOperationStub } = makeSut()
      jest.spyOn(addCreditOperationStub, 'addCreditOperation').mockImplementationOnce(() => {
        throw new Error()
      })
      const httpResponse = await sut.handle({
        body: {
          type: OperationType.CREDIT,
          amount: 1,
          date: new Date(),
          description: 'any_description'
        }
      })
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })

  describe('Operation Debit', () => {
    test('should call AddDebitOperation with correct values', async () => {
      const { sut, addDebitOperationStub } = makeSut()
      const addDebitOperationSpy = jest.spyOn(addDebitOperationStub, 'addDebitOperation')
      await sut.handle({
        body: {
          type: OperationType.DEBIT,
          amount: 1,
          date: new Date(),
          description: 'any_description'
        }
      })
      expect(addDebitOperationSpy).toHaveBeenCalledWith({
        type: OperationType.DEBIT,
        amount: 1,
        date: new Date(),
        description: 'any_description'
      })
    })

    test('should return 500 if addDebitOperation throws', async () => {
      const { sut, addDebitOperationStub } = makeSut()
      jest.spyOn(addDebitOperationStub, 'addDebitOperation').mockImplementationOnce(() => {
        throw new Error()
      })
      const httpResponse = await sut.handle({
        body: {
          type: OperationType.DEBIT,
          amount: 1,
          date: new Date(),
          description: 'any_description'
        }
      })
      expect(httpResponse).toEqual(serverError(new Error()))
    })
  })
})
