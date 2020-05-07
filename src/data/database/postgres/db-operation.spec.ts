import { DbOperation } from './db-operation'
import { CreditOperationRepository } from '../usecases/operation-repository'
import { AddCreditOperationModel } from '../../../domain/usecases/add-operation'
import { OperationType, OperationCreditModel, OperationDebitModel } from '../../../domain/models/operation-model'
import MockDate from 'mockdate'
import { DebitOperationRepository } from '../usecases/debit-operation-repository'
import { AddDebitOperationModel } from '../../../domain/usecases/add-debit-operation'

const makeCreditOperationRepository = (): CreditOperationRepository => {
  class OperationRepositoryStub implements CreditOperationRepository {
    async addCreditOperationRepository (operationData: AddCreditOperationModel): Promise<OperationCreditModel> {
      return new Promise(resolve => resolve({
        id: 0,
        type: OperationType.CREDIT,
        amount: 0,
        date: new Date(),
        description: 'any_description'
      }))
    }
  }
  return new OperationRepositoryStub()
}

const makeDebitOperationRepository = (): DebitOperationRepository => {
  class OperationRepositoryStub implements DebitOperationRepository {
    async addDebitOperationRepository (operationData: AddDebitOperationModel): Promise<OperationDebitModel> {
      return new Promise(resolve => resolve({
        id: 0,
        type: OperationType.DEBIT,
        amount: 0,
        date: new Date(),
        description: 'any_description'
      }))
    }
  }
  return new OperationRepositoryStub()
}

interface SutTypes {
  sut: DbOperation
  creditOperationRepositoryStub: CreditOperationRepository
  debitOperationRepositoryStub: DebitOperationRepository
}

const makeSut = (): SutTypes => {
  const creditOperationRepositoryStub = makeCreditOperationRepository()
  const debitOperationRepositoryStub = makeDebitOperationRepository()
  const sut = new DbOperation(creditOperationRepositoryStub, debitOperationRepositoryStub)
  return { creditOperationRepositoryStub, sut, debitOperationRepositoryStub }
}

describe('DbOperation', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call addCreditOperationRepository with correct values', async () => {
    const { sut, creditOperationRepositoryStub } = makeSut()
    const addOperationSpy = jest.spyOn(creditOperationRepositoryStub, 'addCreditOperationRepository')
    await sut.addCreditOperation({
      type: OperationType.CREDIT,
      amount: 0,
      date: new Date(),
      description: 'any_description'
    })
    expect(addOperationSpy).toHaveBeenCalledWith({
      type: OperationType.CREDIT,
      amount: 0,
      date: new Date(),
      description: 'any_description'
    })
  })

  test('should addOperationRepository returns an CREDIT operation if add success', async () => {
    const { sut } = makeSut()
    const operation = await sut.addCreditOperation({
      type: OperationType.CREDIT,
      amount: 0,
      date: new Date(),
      description: 'any_description'
    })
    expect(operation).toEqual({
      id: 0,
      type: OperationType.CREDIT,
      amount: 0,
      date: new Date(),
      description: 'any_description'
    })
  })

  test('should call addDebitOperationRepository with correct values', async () => {
    const { sut, debitOperationRepositoryStub } = makeSut()
    const addOperationSpy = jest.spyOn(debitOperationRepositoryStub, 'addDebitOperationRepository')
    await sut.addDebitOperation({
      type: OperationType.DEBIT,
      amount: 0,
      date: new Date(),
      description: 'any_description'
    })
    expect(addOperationSpy).toHaveBeenCalledWith({
      type: OperationType.DEBIT,
      amount: 0,
      date: new Date(),
      description: 'any_description'
    })
  })

  test('should addDebitOperationRepository returns an DEBIT operation if add success', async () => {
    const { sut } = makeSut()
    const operation = await sut.addDebitOperation({
      type: OperationType.DEBIT,
      amount: 0,
      date: new Date(),
      description: 'any_description'
    })
    expect(operation).toEqual({
      id: 0,
      type: OperationType.DEBIT,
      amount: 0,
      date: new Date(),
      description: 'any_description'
    })
  })
})
