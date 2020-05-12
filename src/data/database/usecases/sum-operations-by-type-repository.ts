import { OperationType } from '../../../domain/models/operation-enum'
import { SumModel } from '../../../domain/models/sum-model'

export interface SumAllOperationRepository {
  sumAllOperationRepository(operationType: OperationType): Promise<SumModel>
}
