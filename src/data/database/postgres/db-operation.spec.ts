import { DbOperation } from './db-operation'
import { OperationRepository } from '../usecases/operation-repository'
import { AddOperationModel } from '../../../domain/usecases/add-operation'
import { OperationModel, OperationType } from '../../../domain/models/operation-model'
import MockDate from 'mockdate'

const makeOperationRepository = (): OperationRepository => {
  class OperationRepositoryStub implements OperationRepository {
    async addOperationRepository (operationData: AddOperationModel): Promise<OperationModel> {
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
  operationRepositoryStub: OperationRepository
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
    const addOperationSpy = jest.spyOn(operationRepositoryStub, 'addOperationRepository')
    await sut.addOperation({
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
    const operation = await sut.addOperation({
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
