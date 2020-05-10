import { SumAllOperation } from '../../../domain/usecases/sum-all'
import { SumPeriodOperation, Period } from '../../../domain/usecases/sum-period'
import { OperationType } from '../../../domain/models/operation-enum'
import { SumModel } from '../../../domain/models/sum-model'
import { SumAllOperationRepository } from '../usecases/sum-debits-repository'
import { FinancialResultOperation } from '../../../domain/usecases/financial-result'
import { FinancialResultModel } from '../../../domain/models/financial-result-model'
import { FinancialResultRepository } from '../usecases/financial-result-repository'
import { SumPeriodOperationRepository } from '../usecases/sum-period-repository'

export class DbFinancialReportsOperation implements SumAllOperation, FinancialResultOperation,
SumPeriodOperation {
  constructor (
    private readonly sumAllOpRepository: SumAllOperationRepository,
    private readonly financialResultOpRepository: FinancialResultRepository,
    private readonly sumPeriodOpRepository: SumPeriodOperationRepository
  ) {}

  async sumAllOperation (type: OperationType): Promise<SumModel> {
    const operation = await this.sumAllOpRepository.sumAllOperationRepository(type)
    return operation
  }

  async sumPeriodOperation (type: OperationType, period: Period): Promise<SumModel> {
    const sumPeriod = await this.sumPeriodOpRepository.sumPeriodOperationRepository(type, {
      initialDate: period.initialDate,
      finalDate: period.finalDate
    })
    return sumPeriod
  }

  async financialResult (): Promise<FinancialResultModel> {
    const financialResult = await this.financialResultOpRepository.financialResultRepository()
    return financialResult
  }
}
