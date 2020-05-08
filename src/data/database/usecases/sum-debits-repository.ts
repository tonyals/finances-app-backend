import { OperationType } from '../../../domain/models/operation-enum'
import { SumAllModel } from '../../../domain/models/sum-debits-model'

export interface SumAllOperationRepository {
  sumAllOperationRepository(operationType: OperationType): Promise<SumAllModel>
}
