import { OperationType } from '../../../domain/models/operation-enum'
import { SumAllModel } from '../../../domain/models/sum-all-model'

export interface SumAllOperationRepository {
  sumAllOperationRepository(operationType: OperationType): Promise<SumAllModel>
}
