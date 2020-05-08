import { OperationType } from '../../../domain/models/operation-enum'
import { SumAllDebitsModel } from '../../../domain/models/sum-debits-model'

export interface SumAllDebitsOperationRepository {
  sumAllDebitsOperationRepository(operationType: OperationType.DEBIT): Promise<SumAllDebitsModel>
}
