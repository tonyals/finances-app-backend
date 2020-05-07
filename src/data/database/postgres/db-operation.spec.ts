import { DbOperation } from './db-operation'
import { CreditOperationRepository } from '../usecases/operation-repository'
import { AddCreditOperationModel } from '../../../domain/usecases/add-operation'
import { OperationType, OperationCreditModel } from '../../../domain/models/operation-model'
import MockDate from 'mockdate'

const makeOperationRepository = (): CreditOperationRepository => {
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

interface SutTypes {
  sut: DbOperation
  operationRepositoryStub: CreditOperationRepository
}

const makeSut = (): SutTypes => {
  const operationRepositoryStub = makeOperationRepository()
  const sut = new DbOperation(operationRepositoryStub)
  return { operationRepositoryStub, sut }
}

describe('DbOperation', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call addOperationRepository with correct values', async () => {
    const { sut, operationRepositoryStub } = makeSut()
    const addOperationSpy = jest.spyOn(operationRepositoryStub, 'addCreditOperationRepository')
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
})
