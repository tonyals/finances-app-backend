import { OperationType } from '../../../../domain/models/reports-models/operation-enum'
import { SumModel } from '../../../../domain/models/reports-models/sum-model'

export interface SumAllOperationRepository {
  sumAllOperationRepository(operationType: OperationType): Promise<SumModel>
}
