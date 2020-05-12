import { SumAllOperation } from '../../../domain/usecases/sum-all-by-type'
import { OperationType } from '../../../domain/models/operation-enum'
import { SumModel } from '../../../domain/models/sum-model'
import { SumAllOperationRepository } from '../usecases/sum-operations-by-type-repository'
import { FinancialResultOperation } from '../../../domain/usecases/financial-result'
import { FinancialResultModel } from '../../../domain/models/financial-result-model'
import { FinancialResultRepository } from '../usecases/financial-result-repository'

export class DbFinancialReportsOperation implements SumAllOperation, FinancialResultOperation {
  constructor (
    private readonly sumAllOpRepository: SumAllOperationRepository,
    private readonly financialResultOpRepository: FinancialResultRepository
  ) {}

  async sumAllOperation (type: OperationType): Promise<SumModel> {
    const operation = await this.sumAllOpRepository.sumAllOperationRepository(type)
    return operation
  }

  async financialResult (): Promise<FinancialResultModel> {
    const financialResult = await this.financialResultOpRepository.financialResultRepository()
    return financialResult
  }
}
