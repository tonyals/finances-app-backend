import { SumAllOperation } from '../../../../domain/usecases/reports-all/sum-all-by-type'
import { OperationType } from '../../../../domain/models/reports-models/operation-enum'
import { SumModel } from '../../../../domain/models/reports-models/sum-model'
import { SumAllOperationRepository } from '../../usecases/reports-all/sum-operations-by-type-repository'
import { FinancialResultOperation } from '../../../../domain/usecases/reports-all/financial-result'
import { FinancialResultModel } from '../../../../domain/models/reports-models/financial-result-model'
import { FinancialResultRepository } from '../../usecases/reports-all/financial-result-repository'

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
