import { DbFinancialPeriodReportsOperation } from './db-financial-period-reports'
import { OperationType } from '../../../../domain/models/reports-models/operation-enum'
import { SumModel } from '../../../../domain/models/reports-models/sum-model'
import { SumPeriodOperationRepository } from '../../usecases/reports-period/sum-by-type-period-repository'
import { Period } from '../../../../domain/usecases/reports-period/sum-all-by-type-and-period'

interface SutTypes {
  sut: DbFinancialPeriodReportsOperation
  sumPeriodOpRepositoryStub: SumPeriodOperationRepository
}

const makeSumPeriodOperationRepository = (): SumPeriodOperationRepository => {
  class SumPeriodOperationRepositoryStub implements SumPeriodOperationRepository {
    async sumPeriodOperationRepository (operationType: OperationType, period: Period): Promise<SumModel> {
      return new Promise(resolve => resolve({
        operation: [
          {
            id: 1,
            type: operationType,
            date: new Date('2020-05-10'),
            period: {
              initialDate: period.initialDate,
              finalDate: period.finalDate
            },
            description: 'any_description',
            amount: 2
          }
        ],
        sum: 2
      }))
    }
  }
  return new SumPeriodOperationRepositoryStub()
}

const makeSut = (): SutTypes => {
  const sumPeriodOpRepositoryStub = makeSumPeriodOperationRepository()
  const sut = new DbFinancialPeriodReportsOperation(sumPeriodOpRepositoryStub)
  return {
    sut,
    sumPeriodOpRepositoryStub
  }
}

describe('DbFinancialPeriodReports', () => {
  describe('Financial Results By Period', () => {
    test('should call sumPeriodOpRepository with correct values', async () => {
      const { sut, sumPeriodOpRepositoryStub } = makeSut()
      const financialResultSpy = jest.spyOn(sumPeriodOpRepositoryStub, 'sumPeriodOperationRepository')
      await sut.sumPeriodOperation(OperationType.CREDIT,
        {
          initialDate: new Date('2020-05-05'),
          finalDate: new Date('2020-05-10')
        }
      )
      expect(financialResultSpy).toHaveBeenCalledWith(OperationType.CREDIT,
        {
          initialDate: new Date('2020-05-05'),
          finalDate: new Date('2020-05-10')
        })
    })

    test('should sumPeriodOpRepository returns sumPeriodOperations', async () => {
      const { sut } = makeSut()
      const sumPeriod = await sut.sumPeriodOperation(OperationType.CREDIT,
        {
          initialDate: new Date('2020-05-05'),
          finalDate: new Date('2020-05-10')
        }
      )
      expect(sumPeriod).toEqual({
        operation: [
          {
            id: 1,
            type: 'CREDIT',
            date: new Date('2020-05-10'),
            period: {
              initialDate: new Date('2020-05-05'),
              finalDate: new Date('2020-05-10')
            },
            description: 'any_description',
            amount: 2
          }
        ],
        sum: 2
      })
    })
  })
})
