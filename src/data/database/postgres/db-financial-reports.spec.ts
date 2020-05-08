import { DbFinancialReportsOperation } from './db-financial-reports'
import { SumAllOperationRepository } from '../usecases/sum-debits-repository'
import { OperationType } from '../../../domain/models/operation-enum'
import { SumAllModel } from '../../../domain/models/sum-debits-model'

interface SutTypes {
  sut: DbFinancialReportsOperation
  sumAllOpRepositoryStub: SumAllOperationRepository
}

const makeSumAllOperationRepository = (): SumAllOperationRepository => {
  class SumAllOperationRepositoryStub implements SumAllOperationRepository {
    async sumAllOperationRepository (operationType: OperationType): Promise<SumAllModel> {
      return new Promise(resolve => resolve({
        operation: [
          {
            id: 1,
            type: operationType,
            description: 'any_description',
            amount: 1
          }
        ],
        sum: 2
      }))
    }
  }
  return new SumAllOperationRepositoryStub()
}

const makeSut = (): SutTypes => {
  const sumAllOpRepositoryStub = makeSumAllOperationRepository()
  const sut = new DbFinancialReportsOperation(sumAllOpRepositoryStub)
  return { sut, sumAllOpRepositoryStub }
}

describe('DbFinancialReports', () => {
  test('should call sumAllOpRepository with correct value if DEBIT', async () => {
    const { sut, sumAllOpRepositoryStub } = makeSut()
    const sumSpy = jest.spyOn(sumAllOpRepositoryStub, 'sumAllOperationRepository')
    await sut.sumAllOperation(OperationType.DEBIT)
    expect(sumSpy).toHaveBeenCalledWith('DEBIT')
  })

  test('should call sumAllOpRepository with correct value if CREDIT', async () => {
    const { sut, sumAllOpRepositoryStub } = makeSut()
    const sumSpy = jest.spyOn(sumAllOpRepositoryStub, 'sumAllOperationRepository')
    await sut.sumAllOperation(OperationType.CREDIT)
    expect(sumSpy).toHaveBeenCalledWith('CREDIT')
  })

  test('should sumAllOpRepository returns DEBIT operations on success', async () => {
    const { sut } = makeSut()
    const debitOperation = await sut.sumAllOperation(OperationType.DEBIT)
    expect(debitOperation).toEqual({
      operation: [
        {
          id: 1,
          type: OperationType.DEBIT,
          description: 'any_description',
          amount: 1
        }
      ],
      sum: 2
    })
  })

  test('should sumAllOpRepository returns CREDIT operations on success', async () => {
    const { sut } = makeSut()
    const creditOperation = await sut.sumAllOperation(OperationType.CREDIT)
    expect(creditOperation).toEqual({
      operation: [
        {
          id: 1,
          type: OperationType.CREDIT,
          description: 'any_description',
          amount: 1
        }
      ],
      sum: 2
    })
  })
})
