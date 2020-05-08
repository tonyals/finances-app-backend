import { SumAllOperation } from '../../../domain/usecases/sum-debits'
import { OperationType } from '../../../domain/models/operation-enum'
import { SumAllModel } from '../../../domain/models/sum-debits-model'
import { SumAllOperationRepository } from '../usecases/sum-debits-repository'

export class DbFinancialReportsOperation implements SumAllOperation {
  constructor (
    private readonly sumAllOpRepository: SumAllOperationRepository
  ) {}

  async sumAllOperation (type: OperationType): Promise<SumAllModel> {
    const operation = await this.sumAllOpRepository.sumAllOperationRepository(type)
    return operation
  }
}
