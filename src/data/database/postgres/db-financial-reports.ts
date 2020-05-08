import { SumAllDebitsOperation } from '../../../domain/usecases/sum-debits'
import { OperationType } from '../../../domain/models/operation-enum'
import { SumAllDebitsModel } from '../../../domain/models/sum-debits-model'
import { SumAllDebitsOperationRepository } from '../usecases/sum-debits-repository'

export class DbFinancialReportsOperation implements SumAllDebitsOperation {
  constructor (
    private readonly sumAllDebitsOpRepository: SumAllDebitsOperationRepository
  ) {}

  async sumAllDebitsOperation (type: OperationType.DEBIT): Promise<SumAllDebitsModel> {
    const debitOperation = await this.sumAllDebitsOpRepository.sumAllDebitsOperationRepository(type)
    return debitOperation
  }
}
