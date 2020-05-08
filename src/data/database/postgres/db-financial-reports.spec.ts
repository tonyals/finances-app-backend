import { DbFinancialReportsOperation } from './db-financial-reports'
import { SumAllDebitsOperationRepository } from '../usecases/sum-debits-repository'
import { OperationType } from '../../../domain/models/operation-enum'
import { SumAllDebitsModel } from '../../../domain/models/sum-debits-model'

interface SutTypes {
  sut: DbFinancialReportsOperation
  sumAllDebitsOpRepositoryStub: SumAllDebitsOperationRepository
}

const makeSumAllDebitsOperationRepository = (): SumAllDebitsOperationRepository => {
  class SumAllDebitsOperationRepositoryStub implements SumAllDebitsOperationRepository {
    async sumAllDebitsOperationRepository (operationType: OperationType.DEBIT): Promise<SumAllDebitsModel> {
      return new Promise(resolve => resolve({
        type: OperationType.DEBIT,
        description: 'any_description',
        amount: 1,
        sum: 2
      }))
    }
  }
  return new SumAllDebitsOperationRepositoryStub()
}

const makeSut = (): SutTypes => {
  const sumAllDebitsOpRepositoryStub = makeSumAllDebitsOperationRepository()
  const sut = new DbFinancialReportsOperation(sumAllDebitsOpRepositoryStub)
  return { sut, sumAllDebitsOpRepositoryStub }
}

describe('DbFinancialReports', () => {
  test('should call sumAllDebitsOpRepository with correct values', async () => {
    const { sut, sumAllDebitsOpRepositoryStub } = makeSut()
    const sumSpy = jest.spyOn(sumAllDebitsOpRepositoryStub, 'sumAllDebitsOperationRepository')
    await sut.sumAllDebitsOperation(OperationType.DEBIT)
    expect(sumSpy).toHaveBeenCalledWith('DEBIT')
  })
})
