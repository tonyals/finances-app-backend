import { SumAllOperation } from '../../../../domain/usecases/reports-all/sum-all-by-type'
import { OperationType } from '../../../../domain/models/reports-models/operation-enum'
import { SumModel } from '../../../../domain/models/reports-models/sum-model'
import { SumAllOperationRepository } from '../../usecases/reports-all/sum-operations-by-type-repository'
import { FinancialResultOperation } from '../../../../domain/usecases/reports-all/financial-result'
import { FinancialResultModel } from '../../../../domain/models/reports-models/financial-result-model'
import { FinancialResultRepository } from '../../usecases/reports-all/financial-result-repository'
import { GetAllOperation } from '../../../../domain/usecases/reports-all/get-all-operations'
import { GetAllModel } from '../../../../domain/models/reports-models/get-all-model'
import { GetAllOperationRepository } from '../../usecases/reports-all/get-all-operations-repository'

export class DbFinancialReportsOperation implements SumAllOperation, FinancialResultOperation,
GetAllOperation {
  constructor (
    private readonly sumAllOpRepository: SumAllOperationRepository,
    private readonly financialResultOpRepository: FinancialResultRepository,
    private readonly getAllOpRepository: GetAllOperationRepository
  ) {}

  async sumAllOperation (type: OperationType): Promise<SumModel> {
    const operation = await this.sumAllOpRepository.sumAllOperationRepository(type)
    return operation
  }

  async getAllOperation (): Promise<GetAllModel> {
    await this.getAllOpRepository.getAllOperationRepository()
    return Promise.resolve(null)
  }

  async financialResult (): Promise<FinancialResultModel> {
    const financialResult = await this.financialResultOpRepository.financialResultRepository()
    return financialResult
  }
}
